import { Express, Request, Response } from "express";
import { createPostHandler, getPostHandler, getPostsHandler, updatePostHandler } from "./controller/post.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  invalidateUserSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import { requiresUser, validateRequest } from "./middleware";
import { createPostSchema, updatePostSchema } from "./schema/post.schema";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";

export default function (app: Express) {
  //TODO: check route
  app.get("/check", (req: Request, res: Response) => res.sendStatus(200));

  // ? Session and User api

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

  // ? Posts api

  // Todo: Create

  app.post(
    "/api/posts",
    [requiresUser, validateRequest(createPostSchema)],
    createPostHandler
  );

  // Todo: Read  list
  app.get("/api/posts", getPostsHandler);

  // Todo: Read a single
  app.get("/api/posts/:postId", getPostHandler);

  // Todo: Update
  app.post(
    "/api/posts/:postId",
    [requiresUser, validateRequest(updatePostSchema)],
    updatePostHandler
  );

  // Todo: Delete
}
