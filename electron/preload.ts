import { contextBridge } from 'electron';
import { fullscreen } from './fullscreen/preload';

contextBridge.exposeInMainWorld('desktop', { fullscreen });
