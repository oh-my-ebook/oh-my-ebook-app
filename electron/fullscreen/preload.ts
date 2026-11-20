import { ipcRenderer, type IpcRendererEvent } from 'electron';
import type {
  FullscreenController,
  FullscreenState,
} from '../../shared/fullscreen';
import { fullscreenChannels } from './channels';

export class ElectronFullscreen implements FullscreenController {
  getState(): Promise<FullscreenState> {
    return ipcRenderer.invoke(fullscreenChannels.getState);
  }

  toggle(): Promise<void> {
    return ipcRenderer.invoke(fullscreenChannels.toggle);
  }

  subscribe(listener: (state: FullscreenState) => void): () => void {
    const handleChange = (_event: IpcRendererEvent, state: FullscreenState) =>
      listener(state);
    ipcRenderer.on(fullscreenChannels.changed, handleChange);
    return () => {
      ipcRenderer.removeListener(fullscreenChannels.changed, handleChange);
    };
  }
}

const fullscreenService = new ElectronFullscreen();

export const fullscreen: FullscreenController = {
  getState: () => fullscreenService.getState(),
  toggle: () => fullscreenService.toggle(),
  subscribe: (listener) => fullscreenService.subscribe(listener),
};
