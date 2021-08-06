const sharp = require('sharp')
const exif = require('exif-reader')

async function metadata (file) {
  const data = await sharp(file).metadata()
  return exif(data.exif)
}

function convertWebp (file, dest) {
  return sharp(file)
    .withMetadata()
    .webp({
      quality: 100,
      lossless: true,
      force: true
    })
    .toFile(dest)
}

function convertJpeg (file, dest) {
  return sharp(file)
    .withMetadata()
    .jpeg({
      quality: 100,
      progressive: false,
      force: true
    })
    .toFile(dest)
}

(async () => {
  const jpeg1Metadata = await metadata('test-1.jpeg')
  await convertWebp('test-1.jpeg', 'converted-1.webp')
  const webp1Metada = await metadata('converted-1.webp')
  await convertJpeg('test-1.jpeg', 'converted-1.jpeg')
  const jpeg1Metada = await metadata('converted-1.jpeg')

  const jpeg2Metadata = await metadata('test-2.jpeg')
  await convertWebp('test-2.jpeg', 'converted-2.webp')
  const webp2Metada = await metadata('converted-2.webp')
  await convertJpeg('test-2.jpeg', 'converted-2.jpeg')
  const jpeg2Metada = await metadata('converted-2.jpeg')

  console.log('Fichier 1 [champ Software]')
  console.log(`Source : ${jpeg1Metadata.image.Software}`)
  console.log(`  webp : ${webp1Metada.image.Software}`)
  console.log(`  jpeg : ${jpeg1Metada.image.Software}`)
  console.log('')
  console.log('Fichier 1 [champ Copyright]')
  console.log(`Source : ${jpeg1Metadata.image.Copyright}`)
  console.log(`  webp : ${webp1Metada.image.Copyright}`)
  console.log(`  jpeg : ${jpeg1Metada.image.Copyright}`)
  console.log('')
  console.log('Fichier 2 [champ Software]')
  console.log(`Source : ${jpeg2Metadata.image.Software}`)
  console.log(`  webp : ${webp2Metada.image.Software}`)
  console.log(`  jpeg : ${jpeg2Metada.image.Software}`)
  console.log('')
  console.log('Fichier 2 [champ Copyright]')
  console.log(`Source : ${jpeg2Metadata.image.Copyright}`)
  console.log(`  webp : ${webp2Metada.image.Copyright}`)
  console.log(`  jpeg : ${jpeg2Metada.image.Copyright}`)
})()
