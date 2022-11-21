/* eslint-disable no-useless-escape */
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputHook from "components/form/InputHook";
import RadioHook from "components/form/RadioHook";
import DropdownHook from "components/form/DropdownHook";
import CheckboxHook from "components/form/CheckboxHook";
import Button from "components/button/Button";

const DropdownData = [
  {
    id: 1,
    value: "teacher",
    text: "Teacher",
  },

  {
    id: 2,
    value: "developer",
    text: "Developer",
  },

  {
    id: 3,
    value: "doctor",
    text: "Doctor",
  },
];

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .min(8, "password must be 8 characters or more")
    .required(),
  gender: yup
    .string()
    .required("Please choose your gender")
    .oneOf(["male", "female"]),
  job: yup.string().required("Please select your job"),
  term: yup.boolean().required("Please accept terms and conditions").oneOf([true], "The terms and conditions must be accepted."),
});

function SignupForm() {
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
    control,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onchange",
    defaultValues: {
      job: "",
    },
  });

  const onSubmitHandler = (values) => {
    if (!isValid) return;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        reset({
          username: "",
          email: "",
          password: "",
          gender: "male",
          job: "",
          term: false,
        });
        console.log(values);
      }, 5000);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="border border-primary rounded-lg p-10 block lg:w-[500px]  max-w-[500px] mx-auto my-10 text-xl "
    >
      <div className="flex items-center text-2xl font-bold text-white justify-center mb- 10">
        Sign Up Now
      </div>
      {/* UserName */}
      <div className="flex flex-col gap-3 mt-10 mb-5">
        <label htmlFor="username" className="text-white cursor-pointer">
          Username
        </label>
        <InputHook
          name="username"
          id="username"
          placeholder="Enter your username"
          control={control}
          type="text"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="email" className=" cursor-pointer text-white">
          Email
        </label>
        <InputHook
          name="email"
          id="email"
          placeholder="Enter your email"
          control={control}
          type="email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="password" className=" cursor-pointer text-white">
          Password
        </label>
        <InputHook
          name="password"
          id="password"
          placeholder="Enter your password"
          control={control}
          type="password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Gender */}
      <div className="flex flex-col gap-3 mb-5">
        <label className=" cursor-pointer text-white">Gender</label>
        <div className=" flex items-center gap-5">
          <RadioHook
            control={control}
            name="gender"
            value="male"
            defaultChecked={true}
          ></RadioHook>
          <span className="text-white">Male</span>
          <RadioHook control={control} name="gender" value="female"></RadioHook>
          <span className="text-white">Female</span>
        </div>
      </div>
      {errors.gender && (
        <p className="text-red-500 text-sm">{errors.gender.message}</p>
      )}

      {/* Dropdown */}
      <div className="flex flex-col gap-3 mb-5">
        <label className=" cursor-pointer text-white">Occupation</label>
        <DropdownHook
          control={control}
          name="job"
          setValue={setValue}
          data={DropdownData}
          dropdownLabel={
            isSubmitSuccessful
              ? "Please select your job"
              : "Please select your job"
          }
        ></DropdownHook>
      </div>
      {errors.job && (
        <p className="text-red-500 text-sm">{errors.job.message}</p>
      )}

      {/* Terms and conditions */}
      <div className="w-full ">
        <CheckboxHook
          control={control}
          text="I accept the terms and conditions"
          name="term"
          className="text-white"
        ></CheckboxHook>
      </div>
      {errors.term && (
        <p className="text-red-500 text-sm">{errors.term.message}</p>
      )}

      {/* Button */}
      <Button
      type="submit"
        className={`w-full p-5 text-white font-semibold mt-5 rounded-lg ${
          isSubmitting ? "opacity-50" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className=" w-5 h-5 rounded-full border-2 border-t-2 border-white border-t-transparent animate-spin mx-auto"></div>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}

export default SignupForm;
