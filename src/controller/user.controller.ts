import { Request, Response } from "express";
import { omit } from "lodash";
import log from "../logger";
import { createUser, findUser } from "../service/user.service";

export async function createUserHandler(req: Request, res: Response) {
  try {
    // ? check user from database
    const user = await findUser({ email: req.body.email });
    if (user) {
      return res.status(400).send("please enter other email");
    }
    // TODO: create user
    const newUser = await createUser(req.body);
    return res.send(omit(newUser.toJSON(), "password"));
  } catch (e) {
    log.error(e);
    return res.status(409).send((e as Error).message);
  }
}
