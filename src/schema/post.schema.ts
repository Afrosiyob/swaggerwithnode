import { object, string, ref } from "yup";

const payload = {
  body: object({
    title: string().required("title is required"),
    body: string().required("body is required").min(120, "body is too short"),
  }),
};

export const createPostSchema = object({
  ...payload,
});

export const updatePostSchema = object({
  params: object({
    postId: string().required("postId is required"),
  }),
  ...payload,
});
