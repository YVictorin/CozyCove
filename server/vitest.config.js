import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.js'],
    include: ['**/*.test.js'],
    exclude: ['**/node_modules/**', '**/cypress/**'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['**/node_modules/**', '**/tests/**', '**/cypress/**'],
    },
  },
});