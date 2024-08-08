import * as Yup from "yup";

export const profileScheme = Yup.object({
    fullname: Yup.string()
    .required('Full name is required')
    .min(3,"Full name must be at least 3 characters").max(40, "Fullname can be max 40 characters"),
    phone: Yup.string()
    .required('Phone is required')
    .min(10,"Phone number must be at least 10 characters"),
    email: Yup.string()
    .required("Email is required")
    .email('Email is invalid'),
});