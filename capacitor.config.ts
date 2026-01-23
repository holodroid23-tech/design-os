import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.compostos.app',
  appName: 'ComPOSt',
  webDir: 'dist',
  server: {
    url: 'https://beatris-unhating-emmaline.ngrok-free.dev',
    cleartext: true
  }
};

export default config;
