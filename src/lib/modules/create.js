import gm from "gm";
import { resolve as path_resolve } from "path";
import { uuid } from "./fileUtils";

const getImageInfo = async path => {
  const { bitmap } = await Jimp.read(path);
  return bitmap;
};

const brandGif = async (gifpath, brandpath) => {
  const { width, height } = await getImageInfo(brandpath);

  return new Promise((resolve, reject) => {
    gm(gifpath)
      .draw([`image Over 350,50 ${width},${height} ${brandpath}`])
      .write(gifpath, err => {
        if (err) reject(err);
        resolve();
      });
  });
};

const createGif = (images, size, delay) => {
  return new Promise((resolve, reject) => {
    let gmi = gm();

    Promise.all(images.map(img => gmi.in(img)));

    let filename = `${uuid()}.gif`;
    let filepath = path_resolve(`tmp/${filename}`);

    gmi
      .delay(delay)
      .resizeExact(size.width, size.height)
      .gravity("Center")
      .write(filepath, async err => {
        if (err) reject(err);

        resolve(filepath);
      });
  });
};

const create = async data => {
  let defsize = { height: 1080, width: 1080 };
  let defdelay = 40;

  let {
    brandpath: brand,
    imagepaths: images,
    size = defsize,
    delay = defdelay
  } = data;

  let gifpath = await createGif(images, size, delay);

  if (brand) {
    await brandGif(gifpath, brand);
  }

  return gifpath;
};

export { create, brandGif };
