import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = process.cwd();
const input = path.join(projectRoot, 'public', 'memoji.webp');
const outDir = path.join(projectRoot, 'public', 'memoji');

const sizes = [192, 256, 320, 384, 448, 512, 640];

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  const base = sharp(input, { animated: true }).rotate();

  await Promise.all(
    sizes.flatMap((size) => {
      const name = `memoji-${size}`;

      const avif = base
        .clone()
        .resize(size, size, { fit: 'inside', withoutEnlargement: true })
        .avif({ quality: 45, effort: 7 });

      const webp = base
        .clone()
        .resize(size, size, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 70, effort: 6 });

      return [
        avif.toFile(path.join(outDir, `${name}.avif`)),
        webp.toFile(path.join(outDir, `${name}.webp`)),
      ];
    })
  );

  console.log(`Generated ${sizes.length * 2} files in ${path.relative(projectRoot, outDir)}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
