import { ipcRenderer, type IpcRendererEvent } from 'electron';
import {
  fullscreenChannels,
  type FullscreenController,
  type FullscreenState,
} from '../../shared/fullscreen';

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
