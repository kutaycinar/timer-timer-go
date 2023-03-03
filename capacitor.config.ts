import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.dailyfocus.app",
  appName: "Daily Focus",
  webDir: "dist",
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.178.213:3000",
    cleartext: true,
  },
};

export default config;
