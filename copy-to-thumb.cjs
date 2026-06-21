const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Chemin absolu vers le dossier racine des images
const rootDir = path.join(__dirname, 'public/assets/images');

// Lister toutes les régions
const regions = fs.readdirSync(rootDir);

regions.forEach(async (region) => {
  const fullDir = path.join(rootDir, region, 'full');
  const thumbDir = path.join(rootDir, region, 'thumb');

  // Créer le dossier /thumb s'il n'existe pas
  if (!fs.existsSync(thumbDir)) {
    fs.mkdirSync(thumbDir, { recursive: true });
  }

  const files = fs.readdirSync(fullDir);

  for (const file of files) {
    const inputPath = path.join(fullDir, file);

    const basename = path.parse(file).name;

    const outputPath = path.join(
      thumbDir,
      `${basename}.webp`
    );

    await sharp(inputPath)
      .resize({ width: 600 }) // taille des miniatures
      .webp({ quality: 80 })
      .toFile(outputPath);

    console.log(` ${file} -> ${basename}.webp`);
  }
});