import { ipcRenderer, type IpcRendererEvent } from 'electron';
import type {
  FullscreenController,
  FullscreenState,
} from '../../shared/fullscreen';
import { fullscreenChannels } from './channels';

export const fullscreen: FullscreenController = {
  getState: () => ipcRenderer.invoke(fullscreenChannels.getState),
  toggle: () => ipcRenderer.invoke(fullscreenChannels.toggle),
  subscribe(listener) {
    const handleChange = (_event: IpcRendererEvent, state: FullscreenState) =>
      listener(state);
    ipcRenderer.on(fullscreenChannels.changed, handleChange);
    return () => {
      ipcRenderer.removeListener(fullscreenChannels.changed, handleChange);
    };
  },
};
