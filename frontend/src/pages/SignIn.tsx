import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import toast from "react-hot-toast";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation({
    mutationFn: apiClient.login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      toast.success("Signed in successfully");
      navigate("/");
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="container mx-auto flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="font-bold">Sign In</h2>
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
      <span className="flex justify-between">
        <span>
          Don't have an account ?{" "}
          <Link className="underline" to={"/sign-up"}>
            Sign Up
          </Link>
        </span>
        <button>Sign In</button>
      </span>
    </form>
  );
};

export default SignIn;
