const fs = require("fs");
const path = require("path");

const REGIONS = [
  "chiloe",
  "patagonie",
  "puertowilliams",
  "torresdelpaine",
];

const imagesRoot = path.join(
  __dirname,
  "../public/assets/images"
);

const outputRoot = path.join(
  __dirname,
  "../src/data/regions"
);

REGIONS.forEach((region) => {
  const thumbDir = path.join(
    imagesRoot,
    region,
    "thumb"
  );

  if (!fs.existsSync(thumbDir)) {
    console.log(`Dossier absent : ${thumbDir}`);
    return;
  }

  const files = fs
    .readdirSync(thumbDir)
    .filter((file) =>
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );

  const photos = files.map((file) => {
    const basename = file.replace(
      /\.(jpg|jpeg|png|webp)$/i,
      ""
    );

    return {
      id: basename,

      thumbnailSrc:
        `/assets/images/${region}/thumb/${file}`,

      previewSrc:
        `/assets/images/${region}/thumb/${file}`,

      fullSrc:
        `/assets/images/${region}/full/${file}`,

      title: basename
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) =>
          c.toUpperCase()
        ),

      alt: basename.replace(/-/g, " "),
    };
  });

  const content = `
const ${region} = {
  id: "${region}",
  name: "${region}",
  subtitle: "",
  description: "",

  photos: ${JSON.stringify(
    photos,
    null,
    2
  )}
};

export default ${region};
`;

  fs.writeFileSync(
    path.join(outputRoot, `${region}.js`),
    content
  );

  console.log(
    ` ${region}.js généré (${photos.length} photos)`
  );
});