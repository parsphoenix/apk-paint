import type { CapacitorConfig } from "@capacitor/cli";

declare const process:
  | { env?: Record<string, string | undefined> }
  | undefined;

const serverUrl =
  process?.env?.CAPACITOR_SERVER_URL || process?.env?.VITE_API_BASE_URL || undefined;

const config: CapacitorConfig = {
  appId: "ir.parsphoenix.guessthepainting",
  appName: "Guess the Painting",
  webDir: "dist",
  bundledWebRuntime: false,
  server: {
    androidScheme: "https",
    ...(serverUrl ? { url: serverUrl } : {}),
  },
  android: {
    allowMixedContent: true,
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
    },
  },
};

export default config;