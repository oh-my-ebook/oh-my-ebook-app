import { BrowserWindow, ipcMain, type IpcMainInvokeEvent } from 'electron';
import {
  fullscreenChannels,
  type FullscreenState,
} from '../../shared/fullscreen';

const registeredWindows = new WeakSet<BrowserWindow>();

function windowFor(event: IpcMainInvokeEvent): BrowserWindow {
  const window = BrowserWindow.fromWebContents(event.sender);
  if (
    !window ||
    !registeredWindows.has(window) ||
    event.senderFrame !== event.sender.mainFrame
  ) {
    throw new Error('유효한 앱 창의 요청이 아닙니다.');
  }
  return window;
}

function readState(window: BrowserWindow): FullscreenState {
  return {
    supported: window.isFullScreenable(),
    active: window.isFullScreen(),
  };
}

// 앱 시작 시 한 번 등록한다. 창마다 등록하면 macOS에서 창을 다시 열 때 충돌한다.
export function registerFullscreenHandlers() {
  ipcMain.handle(fullscreenChannels.getState, (event) =>
    readState(windowFor(event)),
  );
  ipcMain.handle(fullscreenChannels.toggle, (event) => {
    const window = windowFor(event);
    window.setFullScreen(!window.isFullScreen());
  });
}

export function observeFullscreen(window: BrowserWindow) {
  registeredWindows.add(window);
  const publish = () => {
    if (!window.webContents.isDestroyed()) {
      window.webContents.send(fullscreenChannels.changed, readState(window));
    }
  };
  window.on('enter-full-screen', publish);
  window.on('leave-full-screen', publish);
  window.once('closed', () => {
    registeredWindows.delete(window);
    window.removeListener('enter-full-screen', publish);
    window.removeListener('leave-full-screen', publish);
  });
}
