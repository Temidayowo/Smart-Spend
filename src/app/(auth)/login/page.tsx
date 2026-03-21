"use client";

import { useState } from "react";
import Card from "@/components/auth/Card";
import Input from "@/components/auth/Input";
import Divider from "@/components/auth/Divider";
import Google from "@/components/auth/Google";
import { loginUser } from "@/lib/actions/action";
import { ChartLine } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    setLoading(true);

    try {
      await loginUser(formData);
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="hidden bg-linear-to-br from-[#2158d2] to-[#25206e] lg:flex items-center justify-center relative rounded-b-2xl lg:rounded-l-2xl lg:rounded-br-none">
        <div className="absolute top-5 left-7 flex items-center gap-3">
          <span className="bg-[#4D79DB] p-1.5 inline-block rounded">
            <ChartLine className="text-white" size={20} />
          </span>
          <span className="text-lg text-white font-bold tracking-wide">
            SpendSmart
          </span>
        </div>

        <div className="text-center px-12 space-y-6">
          <h2 className="text-white text-4xl font-extrabold leading-tight tracking-tight">
            Take Control Of <br /> Your Finances
          </h2>
          <p className="text-[#dbeafe] text-sm leading-relaxed px-6">
            Track expenses, set budgets and achieve your financial goals with
            our intuitive expense tracking platform.
          </p>

          <div className="flex w-full gap-3 text-white pt-2">
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl py-3 px-2 space-y-1">
              <h3 className="font-extrabold text-2xl leading-none">50K+</h3>
              <p className="text-[#bfd8fe] text-xs font-medium">Active Users</p>
            </div>
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl py-3 px-2 space-y-1">
              <h3 className="font-extrabold text-2xl leading-none">$2M+</h3>
              <p className="text-[#bfd8fe] text-xs font-medium">Money Saved</p>
            </div>
          </div>
        </div>
      </div>

      {/* form part of the login page */}
      <div className="bg-linear-to-br from-[#f3f8fe] to-[#e1e8ff] rounded-t-2xl lg:rounded-r-2xl lg:rounded-tl-none w-full flex flex-col lg:flex-col lg:items-center lg:justify-center lg:min-h-auto min-h-screen">
        <div className="lg:hidden flex gap-3 items-center pt-7 px-7 pb-8">
          <span className="bg-[#2158d2] p-1.5 inline-block rounded">
            <ChartLine className="text-white" size={20} />
          </span>
          <h1 className="text-xl font-bold text-[#2158d2]">Spend Smart</h1>
        </div>
        <div className="w-full flex flex-col items-center justify-center flex-1 lg:flex-none px-7 lg:px-10 pb-16 lg:py-16">
          <h2 className="text-3xl text-center font-bold tracking-tight mb-1">
            Welcome back
          </h2>
          <p className="text-sm text-center text-gray-500 mb-6">
            Log in to your SpendSmart account
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <div className="my-5 w-full">
            <Google />
            <Divider />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <Input
              label="Email"
              name="email"
              placeholder="john@example.com"
              required
            />
            <Input
              label="Password"
              name="password"
              placeholder="••••••••"
              hasIcon={true}
              required
            />

            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className="accent-[#4F46E5] cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a
                href="/forgot-password"
                className="text-sm text-[#4F46E5] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <Button
              loadingText="Logging in ..."
              loading={loading}
              type="submit"
            >
              Log in
            </Button>
          </form>

          <p className="text-sm text-center mt-8 text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#4F46E5] font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Card>
  );
}
