import * as Yup from "yup";

export const loginScheme = Yup.object({
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .matches(/[A-Z]/, 'Password requires an uppercase letter'),
    email: Yup.string()
        .required("Email is required")
        .email('Email is invalid'),
});