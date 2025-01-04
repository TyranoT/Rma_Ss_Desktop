import { ElectronAPI } from '@electron-toolkit/preload';

interface CustomElectronAPI extends ElectronAPI {
  login: (email: string, password: string) => Promise<any>;
  verificacao_token: (token: string) => Promise<any>;
}

declare global {
  interface Window {
    electron: CustomElectronAPI;
    context: {};
  }
}