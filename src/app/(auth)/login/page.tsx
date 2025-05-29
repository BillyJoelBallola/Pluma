"use client";

import { login } from "@/app/actions/auth/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginInput, selectLoginSchema } from "@/zod-schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();

  const defaultValues: LoginInput = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    mode: "onBlur",
    resolver: zodResolver(selectLoginSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: LoginInput) => {
    login(data, router);
  };

  return (
    <div className="h-dvh w-dvw p-8">
      <div className="grid place-items-end">
        <Button variant={"ghost"} className="max-w-fit">
          <Link href={"/register"}>Register</Link>
        </Button>
      </div>
      <div className="h-[90%] w-full grid place-items-center">
        <div className="text-center w-full sm:w-[22rem]">
          {Object.keys(errors).length !== 0 && (
            <div className="mb-4 w-full text-left dark:bg-gray-800 rounded-sm text-sm p-2">
              <div className="flex gap-2 items-center mb-2">
                <TriangleAlert className="size-5" />
                <h2 className="font-semibold text-lg">There is a problem</h2>
              </div>
              {Object.values(errors).map((error) => (
                <p key={error.message} className="text-sm font-red-500">
                  {error?.message}
                </p>
              ))}
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold">Login to continue</h1>
          <p className="text-gray-500">
            Fill out all fields to login using your account
          </p>
          <form className="mt-8 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="Email Address"
              type="email"
              className={errors.email?.message && "border border-red-500"}
              {...register("email")}
            />
            <Input
              placeholder="Password"
              type="password"
              className={errors.password?.message && "border border-red-500"}
              {...register("password")}
            />
            <Button className="cursor-pointer" disabled={isSubmitting}>
              {isSubmitting ? <Loader className="animate-spin" /> : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
