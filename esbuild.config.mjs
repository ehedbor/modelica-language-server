import { build } from 'esbuild';
import { existsSync, mkdirSync, copyFileSync } from 'fs';
import process from 'process';

// Build client
build({
  entryPoints: [
    './client/src/extension.ts'
  ],
  bundle: true,
  outfile: './out/client.js',
  platform: 'node',
  external: [
    'vscode'
  ],
  format: 'cjs',
  tsconfig: './client/tsconfig.json',
}).catch(() => process.exit(1));

// Build server
build({
  entryPoints: [
    './server/src/server.ts'
  ],
  bundle: true,
  outfile: './out/server.js',
  platform: 'node',
  external: [
    'vscode',
  ],
  format: 'cjs',
  tsconfig: './server/tsconfig.json',
}).catch(() => process.exit(1));

// Copy tree-sitter.wasm and tree-sitter-modelica.wasm to the output directory
if (!existsSync('out')) {
  mkdirSync('out');
}
copyFileSync('./server/src/tree-sitter-modelica.wasm', './out/tree-sitter-modelica.wasm');
copyFileSync('./server/node_modules/web-tree-sitter/tree-sitter.wasm', './out/tree-sitter.wasm');
