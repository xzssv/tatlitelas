import * as Yup from "yup";

export const reservationScheme = Yup.object({
    fullName: Yup.string()
    .required('Full name is required')
    .min(3,"Full name must be at least 3 characters"),
    phoneNumber: Yup.string()
    .required('Phone is required')
    .min(10,"Phone number must be at least 10 characters"),
    email: Yup.string()
    .required("Email is required")
    .email('Email is invalid'),
    person: Yup.string()
    .required("Person is required"),
    date: Yup.string()
    .required("Date is required")
});