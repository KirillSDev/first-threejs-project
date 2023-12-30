import { UserConfig, defineConfig } from 'vite';

const outDir = './dist'
const config: UserConfig = {
    build: {
        outDir,
        rollupOptions: {
            input: 'src/index.ts'
        }
    }
}

export default defineConfig(config);