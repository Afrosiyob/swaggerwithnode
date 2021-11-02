import { object, string, ref } from "yup";

export const createUserSchema = object({
  body: object({
    name: string().required("name is required"),
    password: string()
      .required("password is required")
      .min(6, "password is too short - should be 6 chars minimum")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain latin letters"),
    passwordConfirmation: string().oneOf(
      [ref("password"), null],
      "password must match"
    ),
    email: string()
      .email("must be a valid email")
      .required("email is required"),
  }),
});
