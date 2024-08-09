import * as Yup from "yup";

export const registerScheme = Yup.object({
    fullName: Yup.string()
        .required('Full name is required')
        .min(3, "Full name must be at least 3 characters"),
    email: Yup.string()
        .required("Email is required")
        .email('Email is invalid'),
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .matches(/[A-Z]/, 'Password requires an uppercase letter'),
    confirmPassword: Yup.string()
        .required("Confirm password is required.")
        .oneOf([Yup.ref("password"), null], "Passwords must match."),
});