import { object, string, ref } from "yup";

const payload = {
  body: object({
    title: string().required("title is required"),
    body: string().required("body is required").min(120, "body is too short"),
  }),
};

const params = {
  params: object({
    postId: string().required("postId is required"),
  }),
}

export const createPostSchema = object({
  ...payload,
});


export const updatePostSchema = object({
  ...params,
  ...payload,
});

export const deletePostShema = object({
  ...params
})