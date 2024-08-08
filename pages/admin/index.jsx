import React from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import { adminSchema } from "../../components/schema/admin";
import { RxGithubLogo } from "react-icons/rx";
import Link from "next/link";

const Index = () => {
  const onSubmit = async (values, actions) => {
    debugger;
    await new Promise((resolve) => setTimeout(resolve, 4000));
    actions.resetForm();
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      onSubmit,
      validationSchema: adminSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Your username",
      value: values.username,
      errorMessage: errors.username,
      touched: touched.username,
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
      <form className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto" onSubmit={handleSubmit}>
        <Title classAdd="text-[40px] mb-6">Admin login</Title>
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
          <Link href="/">
            <span className="opacity-60 hover:opacity-100 hover:text-primary transition-all">Home Page</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Index;
