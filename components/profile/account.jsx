import { Input } from "postcss";
import Title from "../ui/Title";
import { useFormik } from "formik";
import { profileScheme } from "../../components/schema/profile";

const Account = () => {

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
    <div>
      <form className="p-8 flex-1">
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
          <button className="btn-primary mt-4">Update</button>
        </form>
    </div>
  );
};

export default Account;
