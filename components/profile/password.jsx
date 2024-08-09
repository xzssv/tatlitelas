import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import React, { useState } from "react";
import { useFormik } from "formik";
import { passwordScheme } from "../../components/schema/password";

const Password = () => {
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    actions.resetForm();
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      onSubmit,
      validationSchema: passwordScheme,
    });

  const inputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "Your password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
    {
      id: 2,
      name: "confirmPassword",
      type: "password",
      placeholder: "Again password",
      value: values.confirmPassword,
      errorMessage: errors.confirmPassword,
      touched: touched.confirmPassword,
    },
  ];

  return (
    <div>
      <form
        className="lg:p-8 flex-1 lg:mt-0 mt-5 md:ml-5 md:mb-0 mb-6"
        onSubmit={handleSubmit}
      >
        <Title classAdd="text-[24px] text-center sm:text-start">
          Password Settings
        </Title>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </div>
        <button className="btn-primary mt-4 w-full md:w-36" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default Password;
