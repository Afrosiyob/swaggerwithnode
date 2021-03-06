import { updateSession, validatePassword } from "../service/user.service";
import { Request, Response } from "express";
import {
  createAccessToken,
  createSession,
  findSessions,
} from "../service/session.service";
import config from "config";
import { sign } from "../utils/jwt.utils";
import { get } from "lodash";

export async function createUserSessionHandler(req: Request, res: Response) {
  //TODO: validate the email and password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid username or password");
  }
  //TODO: create session
  const session = await createSession(user._id, req.get("user-agent") || "");
  //TODO: create access token
  const accessToken = createAccessToken({
    user,
    session,
  });
  //TODO: create refresh token
  const refreshToken = sign(session, {
    expiresIn: config.get("refreshTokenTtl"), // ? 1 year
  });
  //TODO: send refresh & access token back
  return res.send({ accessToken, refreshToken, user:"user data default" });
}

export async function invalidateUserSessionHandler(
  req: Request,
  res: Response
) {
  const sessionId = get(req, "user.session");
  await updateSession({ _id: sessionId }, { valid: false });
  return res.sendStatus(200);
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
}
