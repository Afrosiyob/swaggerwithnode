import { LeanDocument } from "mongoose";
import config from "config";
import Session, { SessionDocument } from "../model/session.model";
import { UserDocument } from "../model/user.model";
import { get } from "lodash";
import { decode, sign } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export async function createSession(userId: any, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });
  return session.toJSON();
}

export function createAccessToken({
  user,
  session,
}: {
  user:
    | Omit<UserDocument, "password">
    | LeanDocument<Omit<UserDocument, "password">>
    | any;
  session:
    | Omit<SessionDocument, "password">
    | LeanDocument<Omit<SessionDocument, "password">>
    | any;
}) {
  //TODO:build and return the new access token

  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // ? 15 minutes
  );

  return accessToken;
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  // TODO: decode  refreshToken
  const { decoded } = decode(refreshToken);
  if (!decoded || !get(decoded, "_id")) {
    return false;
  }
  const session = await Session.findById(get(decoded, "_id"));
  if (!session || !session?.valid) {
    return false;
  }
  const user = await findUser({ id: session.user });
  if (!user) {
    return false;
  }
  const accessToken = createAccessToken({ user, session });
  return accessToken;
}
