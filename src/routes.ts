import { Express, Request, Response } from "express";
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import { requiresUser, validateRequest } from "./middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";

export default function (app: Express) {
  //TODO: check route
  app.get("/check", (req: Request, res: Response) => res.sendStatus(200));
  //TODO: Registration
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);
  //TODO: Login
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);
  //TODO: Logout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);
}
