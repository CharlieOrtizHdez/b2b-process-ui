import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/b2b-process-ui/', // ← este debe coincidir con tu repo
  plugins: [react()],
});