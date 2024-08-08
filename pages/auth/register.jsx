import React from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import { registerScheme } from "../../components/schema/register";
import { RxGithubLogo } from "react-icons/rx";
import Link from "next/link";
import { string } from "yup/lib/locale";

const Register = () => {
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    actions.resetForm();
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      onSubmit,
      validationSchema: registerScheme,
    });
  const inputs = [
    {
        id: 1,
        name: "fullName",
        type: "text",
        placeholder: "Your Full Name",
        value: values.fullName,
        errorMessage: errors.fullName,
        touched: touched.fullName,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Your Email",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Your Confirm Password",
      value: values.confirmPassword,
      errorMessage: errors.confirmPassword,
      touched: touched.confirmPassword,
    },
  ];

  return (
    <div className="container mx-auto">
      <form className="flex flex-col items-center my-20 md:w-1/2 sm:w-full w-64  mx-auto" onSubmit={handleSubmit}>
        <Title classAdd="text-[40px] mb-6">Register</Title>
        <div className="flex flex-col gap-y-2 w-full">
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </div>
        <div className="flex flex-col w-full gap-y-3 mt-5 text-center">
          <button type="button" className="btn-primary my-2">Register</button>
          <button className="btn-primary !bg-secondary flex text-center justify-center hover:!bg-opacity-70 transition-all">
            <RxGithubLogo className="text-xl mr-2" />
            GitHub
          </button>
          <Link href="/auth/login">
            <span className="opacity-60 hover:opacity-100 hover:text-primary transition-all">Do you have an account?</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
