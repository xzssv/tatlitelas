import Image from "next/image";
import React, { useState } from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import { profileScheme } from "../../components/schema/profile";
import Password from "../../components/profile/password";
import Order from "../../components/admin/Order";
import Product from "../../components/admin/Product";
import { BiCategoryAlt } from "react-icons/bi";
import { MdInventory } from "react-icons/md";
import Category from "../../components/admin/Category";
import Footer from "../../components/admin/FooterEdit";

const Admin = () => {
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
          <b className="text-2xl mt-1 font-light">John Doeaaaa</b>
        </div>
        <ul className="text-center font-semibold">
          <li
            onClick={() => setTabs(0)}
            className={`border w-full p-3 text-base hover:bg-primary hover:text-white transition-all ${
              tabs === 0 && "bg-primary text-white"
            }`}
          >
            <div className="flex text-center justify-center">
              <MdInventory className="mt-1 font-bold"/>
              <button className="ml-2">Products</button>
            </div>
          </li>
          <li
            onClick={() => setTabs(1)}
            className={`border w-full p-3 text-base hover:bg-primary hover:text-white transition-all ${
              tabs === 1 && "bg-primary text-white"
            }`}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-2">Orders</button>
          </li>
          <li
            onClick={() => setTabs(2)}
            className={`border w-full p-3 text-base hover:bg-primary hover:text-white transition-all ${
              tabs === 2 && "bg-primary text-white"
            }`}
          >
            <div className="flex text-center justify-center">
              <BiCategoryAlt className="mt-1 font-bold" />
              <button className="ml-2">Categories</button>
            </div>
          </li>
          <li
            onClick={() => setTabs(3)}
            className={`border w-full p-3 text-base hover:bg-primary hover:text-white transition-all ${
              tabs === 3 && "bg-primary text-white"
            }`}
          >
            <i className="fa fa-copyright"></i>
            <button className="ml-2 font-extrabold">Footer</button>
          </li>
          <li
            onClick={() => setTabs(4)}
            className={`border w-full p-3 text-base hover:bg-primary hover:text-white transition-all ${
              tabs === 4 && "bg-primary text-white"
            }`}
          >
            <i className="fa fa-sign-out"></i>
            <button className="ml-2">LogOut</button>
          </li>
        </ul>
      </div>
      {tabs === 0 && <Product />}
      {tabs === 1 && <Order />}
      {tabs === 2 && <Category />}
      {tabs === 3 && <Footer />}
    </div>
  );
};

export default Admin;
