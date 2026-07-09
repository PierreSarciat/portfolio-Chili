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

if (!fs.existsSync(outputRoot)) {
  fs.mkdirSync(outputRoot, { recursive: true });
}

REGIONS.forEach((region) => {
  const thumbDir = path.join(
    imagesRoot,
    region,
    "thumb"
  );

  const fullDir = path.join(
    imagesRoot,
    region,
    "full"
  );

  if (!fs.existsSync(thumbDir)) {
    console.log(
      `❌ Dossier thumb absent : ${thumbDir}`
    );
    return;
  }

  if (!fs.existsSync(fullDir)) {
    console.log(
      `❌ Dossier full absent : ${fullDir}`
    );
    return;
  }

  const thumbFiles = fs
    .readdirSync(thumbDir)
    .filter((file) =>
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );

  const fullFiles = fs
    .readdirSync(fullDir)
    .filter((file) =>
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );

  const photos = thumbFiles.map((thumbFile) => {
    const basename = path.parse(
      thumbFile
    ).name;

    const fullFile = fullFiles.find(
      (file) =>
        path.parse(file).name === basename
    );

    if (!fullFile) {
      console.warn(
        `⚠️ Image HD introuvable pour : ${basename}`
      );
    }

    return {
      id: basename
        .toLowerCase()
        .replace(/\s+/g, "-"),

      thumbnailSrc:
        `/assets/images/${region}/thumb/${thumbFile}`,

      previewSrc:
        `/assets/images/${region}/thumb/${thumbFile}`,

      fullSrc: fullFile
        ? `/assets/images/${region}/full/${fullFile}`
        : "",

      title: basename
        .replace(/[-_]/g, " ")
        .replace(
          /\b\w/g,
          (char) => char.toUpperCase()
        ),

      alt: basename
        .replace(/[-_]/g, " "),
    };
  });

  const regionObject = `
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

  const outputFile = path.join(
    outputRoot,
    `${region}.js`
  );

  fs.writeFileSync(
    outputFile,
    regionObject,
    "utf8"
  );

 
});

