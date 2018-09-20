import { errorResponses } from "./operationResponses";

const validateRequest = (source, brand) => {
  if (!source) {
    throw new Error(errorResponses.invalidSourceError);
  }
  if (source.length < 1) {
    throw new Error(errorResponses.minLimitError);
  }
  if (source.length > 10) {
    throw new Error(errorResponses.maxLimitError);
  }

  return;
};

export default validateRequest;
