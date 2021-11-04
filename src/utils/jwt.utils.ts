import jwt from "jsonwebtoken";
import config from "config";
import log from "../logger";

const privateKey = config.get("privateKey") as string;
// ? jwt sign
export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, options);
}
// ? token decoded
export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    log.error(error);
    console.log(error);
    return {
      valid: false,
      expired: (error as Error).message === "jwt expired",
      decoded: null,
    };
  }
}
