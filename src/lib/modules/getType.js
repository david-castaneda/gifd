import { typeResponses } from "./operationResponses";

const sourceType = { BASE64: "base64", URL: "url" };

const getType = sources => {
  let types = new Array();
  for (let img of sources) {
    let isBase64 = img.indexOf("base64") >= 0;
    let isURL = img.indexOf("http") >= 0;

    if (isURL) {
      types.push({ type: sourceType.URL, img });
    } else if (isBase64) {
      types.push({ type: sourceType.BASE64, img });
    } else {
      throw new Error(typeResponses.invalidFileType);
    }
  }

  return types;
};

export { getType, sourceType };
