import uuid from "uuid/v1";

import https from "https";
import { writeFile, unlink } from "fs";
import { fileResponses } from "./operationResponses";
import { getType, sourceType } from "./getType";
import { resolve } from "path";

const fileExtensions = {
  JPG: "jpg",
  JPEG: "jpeg",
  PNG: "png"
};

const getFileExtension = data => {
  let isJPG = data.indexOf("jpg") >= 0;
  let isJPEG = data.indexOf("jpeg") >= 0;
  let isPNG = data.indexOf("png") >= 0;

  if (isJPG) {
    return fileExtensions.JPG;
  }
  if (isJPEG) {
    return fileExtensions.JPEG;
  }
  if (isPNG) {
    return fileExtensions.PNG;
  }

  throw new Error(fileResponses.invalidFileExtension);
};

const replaceEncoder = (data, ext) => {
  if (ext == fileExtensions.JPG) {
    return data.replace(/^data:image\/jpg;base64,/, "");
  }
  if (ext == fileExtensions.JPEG) {
    return data.replace(/^data:image\/jpeg;base64,/, "");
  }
  if (ext == fileExtensions.PNG) {
    return data.replace(/^data:image\/png;base64,/, "");
  }

  throw new Error("Error fault in encoder.");
};

const writeFileAsync = async (path, data, encoding) => {
  writeFile(path, data, encoding, err => {
    if (err) throw new Error(err);

    return;
  });
};

const saveURL = data => {
  return new Promise((resolve, reject) => {
    https
      .get(data, res => {
        res.setEncoding("base64");
        let payload = "data:" + res.headers["content-type"] + ";base64,";
        res.on("data", data => (payload += data));
        res.on("end", async () => {
          let file = getType([payload]);

          let filepath = await saveBASE64(file[0].img);
          resolve(filepath);
        });
      })
      .on("error", e => reject(e.message));
  });
};

const saveBASE64 = async data => {
  let ext = getFileExtension(data);
  let file = replaceEncoder(data, ext);
  let filename = `${uuid()}.${ext}`;
  let filepath = resolve(`tmp/${filename}`);

  await writeFileAsync(filepath, file, sourceType.BASE64);
  return filepath;
};

const save = async data => {
  let dest = new Array();
  for (let source of data) {
    if (source.type == sourceType.BASE64) {
      let path = await saveBASE64(source.img);
      dest.push(path);
    } else if (source.type == sourceType.URL) {
      let path = await saveURL(source.img);
      dest.push(path);
    }
  }

  return dest;
};

const cleanup = async filepaths => Promise.all(filepaths.map(remove));

const remove = path =>
  new Promise((resolve, reject) => {
    unlink(path, err => {
      if (err) reject(err);
      resolve();
    });
  });

export { save, cleanup };
