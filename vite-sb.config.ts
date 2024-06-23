import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// storybook専用のViteの構成ファイルを作成しないとエラーが発生したので、別で定義した
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env = { ...process.env, ...env }
  return {
    plugins: [tsconfigPaths()],
  }
})
