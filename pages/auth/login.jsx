import React from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import { loginScheme } from "../../components/schema/login";
import { RxGithubLogo } from "react-icons/rx";
import Link from "next/link";

const Login = () => {
  const onSubmit = async (values, actions) => {
    debugger;
    await new Promise((resolve) => setTimeout(resolve, 4000));
    actions.resetForm();
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit,
      validationSchema: loginScheme,
    });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Your Email",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];

  return (
    <div className="container mx-auto">
      <form className="flex flex-col items-center my-20 md:w-1/2 sm:w-full w-64 mx-auto" onSubmit={handleSubmit}>
        <Title classAdd="text-[40px] mb-6">login</Title>
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
          <button className="btn-primary my-2">Login</button>
          <button className="btn-primary !bg-secondary flex text-center justify-center hover:!bg-opacity-70 transition-all">
            <RxGithubLogo className="text-xl mr-2" />
            GitHub
          </button>
          <Link href="/auth/register">
            <span className="opacity-60 hover:opacity-100 hover:text-primary transition-all">Create a new account.</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
