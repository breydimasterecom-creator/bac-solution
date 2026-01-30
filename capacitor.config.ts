
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ht.bacsolution.app',
  appName: 'Bac-Solution',
  webDir: 'dist', // Dossier où se trouve votre build final
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
