// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "node:url";

export default defineConfig(async ({ mode }) => {
  const isDev = mode !== "production";
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // 개발 모드에서만 Replit 전용 플러그인 로드
  const devPlugins: any[] = [];
  if (isDev) {
    try {
      const { default: runtimeErrorOverlay } = await import("@replit/vite-plugin-runtime-error-modal");
      devPlugins.push(runtimeErrorOverlay());
    } catch {
      // 플러그인 없으면 그냥 무시 (CI/프로덕션에서 안전)
    }
    if (process.env.REPL_ID) {
      try {
        const { cartographer } = await import("@replit/vite-plugin-cartographer");
        devPlugins.push(cartographer());
      } catch {
        // 동일하게 무시
      }
    }
  }

  return {
    plugins: [react(), ...devPlugins],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
