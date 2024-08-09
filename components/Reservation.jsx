import React from "react";
import Input from "./form/Input";
import Title from "./ui/Title";
import { useFormik } from "formik";
import { resolve } from "styled-jsx/css";
import { reservationScheme } from "./schema/reservation";

const Reservation = () => {
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    actions.resetForm();
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        fullName: "",
        phoneNumber: "",
        email: "",
        person: "",
        date: "",
      },
      onSubmit,
      validationSchema: reservationScheme,
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
      name: "phoneNumber",
      type: "number",
      placeholder: "Your Phone Number",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Your Email",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 4,
      name: "person",
      type: "number",
      placeholder: "How Many Persons",
      value: values.person,
      errorMessage: errors.person,
      touched: touched.person,
    },
    {
      id: 5,
      name: "date",
      type: "datetime-local",
      placeholder: "gg.aa.yyyy",
      value: values.date,
      errorMessage: errors.date,
      touched: touched.date,
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <Title classAdd="text-[40px] mb-10 sm:ml-0 ml-11">Rezervasyon</Title>
      <div className="flex sm:justify-between flex-wrap items-center justify-center  gap-x-10 ">
        <form
          onSubmit={handleSubmit}
          className="lg:flex-1 sm:w-full w-[80%] sm:mb-0 mb-6 "
        >
          <div className="flex flex-col gap-y-4 ">
            {inputs.map((input) => (
              <Input
                value={values}
                key={input.id}
                {...input}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))}
          </div>
          <button className="btn-primary mt-4" type="submit">
            Hemen Tut
          </button>
        </form>
        <div className="lg:flex-1 !h-[384px] ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d31479.190080374243!2d30.64867942866581!3d36.87793069292811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2str!4v1671785297464!5m2!1str!2str"
            className="w-full h-full rounded-lg"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
