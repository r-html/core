
require('esbuild')
  .build({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    minify: true,
    platform: 'node',
    target: 'node14.4',
    outfile: './dist/index.js',
  })
  .then((data) => console.log('SUCCESS', data))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
