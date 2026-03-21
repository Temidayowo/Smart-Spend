"use client";

import Link from "next/link";
import { ChartLine } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/button";
import { requestPasswordReset } from "@/lib/actions/forgot-password-action";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const result = await requestPasswordReset(formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("If that email exists, a reset link has been sent.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="w-full min-h-screen bg-linear-to-br from-[#f3f8fe] to-[#e1e8ff] lg:bg-none lg:bg-white flex flex-col lg:flex-col lg:justify-center lg:items-center">
      <div className="absolute flex gap-3 items-center top-7 left-7 pb-8">
        <span className="bg-[#2158d2] p-1.5 inline-block rounded">
          <ChartLine className="text-white" size={20} />
        </span>
        <h1 className="text-xl font-bold text-[#2158d2]">Spend Smart</h1>
      </div>
      <div className="py-10 lg:py-20 w-full lg:w-lg flex flex-1 lg:flex-none lg:bg-linear-to-br lg:from-[#f3f8fe] lg:to-[#e1e8ff] lg:rounded-2xl flex-col justify-center items-center gap-6 px-7 lg:px-10">
        <div className="flex flex-col gap-3">
          <h2 className="lg:text-3xl text-xl text-black font-bold">
            Forgot Password?
          </h2>
          <p className="text-black text-[12px] lg:text-sm">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="w-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="Email" className="text-black lg:text-base text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="outline-none font-normal text-black text-small bg-white box-border px-4 py-2 rounded-sm w-full focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
              required
            />
          </div>
          <Button type="submit" loading={loading} loadingText="Sending..." className="mt-4">
            Send Reset Link
          </Button>
        </form>
        <div className="w-full">
          Dont have an account?{" "}
          <Link href="/register" className="text-[#4F46E5] font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
