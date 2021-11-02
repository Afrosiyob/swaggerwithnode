import { DocumentDefinition } from "mongoose";
import log from "../logger";
import User, { UserDocument } from "../model/user.model";

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (e) {
    log.error(e);
    throw new Error((e as Error).message);
  }
}

function findUser() {}
