import Image from "next/image";
import React, { useState } from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import { profileScheme } from "../../components/schema/profile";
import Password from "../../components/profile/password";
import Order from "../../components/profile/Order";

const Profile = () => {
  const [tabs, setTabs] = useState(0);

  const onSubmit = async (values, actions) => {
    debugger;
    await new Promise((resolve) => setTimeout(resolve, 4000));
    actions.resetForm();
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        fullname: "",
        phone: "",
        email: "",
        address: "",
        job: "",
        bio: "",
      },
      onSubmit,
      validationSchema: profileScheme,
    });

  const inputs = [
    {
      id: 1,
      name: "fullname",
      type: "text",
      placeholder: "Your Full Name",
      value: values.fullname,
      errorMessage: errors.fullname,
      touched: touched.fullname,
    },
    {
      id: 2,
      name: "phone",
      type: "phone",
      placeholder: "Your phone",
      value: values.phone,
      errorMessage: errors.phone,
      touched: touched.phone,
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
      name: "address",
      type: "text",
      placeholder: "Your address",
      value: values.address,
      errorMessage: errors.address,
      touched: touched.address,
    },
    {
      id: 5,
      name: "job",
      type: "text",
      placeholder: "Your job",
      value: values.job,
      errorMessage: errors.job,
      touched: touched.job,
    },
    {
      id: 6,
      name: "bio",
      type: "text",
      placeholder: "Your bio",
      value: values.bio,
      errorMessage: errors.bio,
      touched: touched.bio,
    },
  ];

  return (
    <div className="flex px-10 min-h-[calc(100vh_-_140px)] md:flex-row flex-col mt-8">
      <div className="md:w-80 w-full flex-shrink-0">
        <div className="relative flex flex-col items-center px-10 py-5 border border-b-0">
          <Image
            src="/images/client2.jpg"
            alt=""
            width={100}
            height={100}
            className="rounded-full"
          />
          <b className="text-2xl mt-1 font-light">John Doe</b>
        </div>
        <ul className="text-center font-semibold">
          <li
            onClick={() => setTabs(0)}
            className={`border w-full p-3 text-base hover:bg-primary hover:text-white transition-all ${
              tabs === 0 && "bg-primary text-white"
            }`}
          >
            <i className="fa fa-home"></i>
            <button className="ml-2">Account</button>
          </li>
          <li
            onClick={() => setTabs(1)}
            className={`border w-full p-3 text-base hover:bg-primary hover:text-white transition-all ${
              tabs === 1 && "bg-primary text-white"
            }`}
          >
            <i className="fa fa-key"></i>
            <button className="ml-2">Password</button>
          </li>
          <li
            onClick={() => setTabs(2)}
            className={`border w-full p-3 text-base hover:bg-primary hover:text-white transition-all ${
              tabs === 2 && "bg-primary text-white"
            }`}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-2">Order</button>
          </li>
          <li
            onClick={() => setTabs(3)}
            className={`border w-full p-3 text-base hover:bg-primary hover:text-white transition-all ${
              tabs === 3 && "bg-primary text-white"
            }`}
          >
            <i className="fa fa-sign-out"></i>
            <button className="ml-2">LogOut</button>
          </li>
        </ul>
      </div>
      {tabs === 0 && (
        <form
          className="lg:p-8 flex-1 lg:mt-0 mt-5 md:ml-5 md:mb-0 mb-6"
          onSubmit={handleSubmit}
        >
          <Title classAdd="text-[24px] text-center sm:text-start">
            Account Settings
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
      )}
      {tabs === 1 && <Password />}
      {tabs === 2 && <Order />}
    </div>
  );
};

export default Profile;
