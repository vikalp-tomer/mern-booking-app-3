import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { Link, useNavigate } from "react-router-dom";

export type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>();

  const mutation = useMutation({
    mutationFn: apiClient.register,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/");
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="container mx-auto flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="font-bold">Sign Up</h2>
      <span className="flex gap-10">
        <label className="flex-1">
          FirstName
          <input
            type="text"
            className="border w-full"
            {...register("firstName", { required: "email is required" })}
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
        </label>
        <label className="flex-1">
          LastName
          <input
            type="text"
            className="border w-full"
            {...register("lastName", { required: "email is required" })}
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
        </label>
      </span>
      <label className="">
        Email
        <input
          type="email"
          className="border w-full"
          {...register("email", { required: "email is required" })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </label>
      <label>
        Password
        <input
          type="password"
          className="border w-full"
          {...register("password", { required: "password is required" })}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          className="border w-full"
          {...register("confirmPassword", {
            validate: (value) => {
              if (!value) {
                return "This field is required";
              } else if (watch("password") !== value) {
                return "Your passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
      </label>
      <span className="flex justify-between">
        <span>
          Already have an account ?{" "}
          <Link className="underline" to={"/sign-in"}>
            Sign In instead
          </Link>
        </span>
        <button>Sign Up</button>
      </span>
    </form>
  );
};

export default SignUp;
