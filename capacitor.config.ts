import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.compostos.app',
  appName: 'ComPOSt',
  webDir: 'dist',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
  server: {
    url: 'http://192.168.88.11:3000',
    cleartext: true
  }
};

export default config;
