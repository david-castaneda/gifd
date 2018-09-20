import validateRequest from "./lib/modules/validateRequest";
import { getType } from "./lib/modules/getType";
import { save, cleanup } from "./lib/modules/fileUtils";
import { create } from "./lib/modules/create";

const gf = async (source, brand = null, size, delay) => {
  validateRequest(source, brand);

  let images = getType(source);

  let brandimage = getType([brand]);

  let imagepaths = await save(images);

  let brandpath = await save(brandimage);

  let gifpath = await create({ brandpath, imagepaths, size, delay });

  await cleanup([...imagepaths, ...brandpath]);

  return gifpath;
};

export default gf;
