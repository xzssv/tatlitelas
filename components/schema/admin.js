import * as Yup from "yup";

export const adminSchema = Yup.object({
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .matches(/[A-Z]/, 'Password requires an uppercase letter'),
    username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters."),
});