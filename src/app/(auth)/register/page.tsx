"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChartLine, Check } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import Card from "@/components/auth/Card";
import Input from "@/components/auth/Input";
import Divider from "@/components/auth/Divider";
import Google from "@/components/auth/Google";
import Button from "@/components/ui/button";
import Link from "next/link";
import { registerUser } from "@/lib/actions/register-action";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const benefits = [
    { id: 1, text: "Real-time Expense Tracking" },
    { id: 2, text: "Smart budget recommendations" },
    { id: 3, text: "Detailed financial insights" },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await registerUser(new FormData(e.currentTarget));
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      router.push("/verify-email");
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      {/* Blue panel — bottom on mobile, left on desktop */}
      <div className=" bg-linear-to-br from-[#2158d2] to-[#25206e] items-center justify-center relative rounded-b-2xl lg:rounded-l-2xl lg:rounded-br-none py-14 lg:py-0 hidden lg:flex">
        <div className="absolute top-7 left-7 flex gap-3 items-center">
          <span className="bg-[#4D79DB] p-1.5 inline-block rounded">
            <ChartLine className="text-white" size={20} />
          </span>
          <h1 className="text-2xl font-bold text-white">Spend Smart</h1>
        </div>

        <div className="w-full px-12 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-white font-bold text-3xl text-center">
              Track Your Financial Journey
            </h2>
            <p className="text-[#dbeafe] text-sm text-center leading-relaxed">
              Join thousands of users who have transformed their financial
              habits with our powerful expense tracker tools.
            </p>
          </div>

          <StaggerContainer className="flex flex-col gap-3.5">
            {benefits.map((item) => (
              <StaggerItem key={item.id} className="flex gap-3 items-center">
                <span className="bg-[#4D79DB] p-1 inline-block rounded shrink-0">
                  <Check className="text-white" size={16} />
                </span>
                <p className="text-white text-sm">{item.text}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="flex gap-3">
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl py-3 px-2 text-center space-y-1">
              <h3 className="font-extrabold text-2xl text-white leading-none">
                10K+
              </h3>
              <p className="text-[#bfd8fe] text-xs font-medium">Active Users</p>
            </div>
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl py-3 px-2 text-center space-y-1">
              <h3 className="font-extrabold text-2xl text-white leading-none">
                4.9★
              </h3>
              <p className="text-[#bfd8fe] text-xs font-medium">User Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form panel — top on mobile, right on desktop */}
      <div className="bg-linear-to-br from-[#f3f8fe] to-[#e1e8ff] lg:bg-white lg:rounded-t-2xl lg:rounded-r-2xl lg:rounded-tl-none w-full flex flex-col lg:flex-col items-center justify-center gap-5 lg:min-h-auto min-h-screen py-10">
        <div className="lg:hidden absolute flex gap-3 items-center top-5 left-6 w-full">
          <span className="bg-[#2158d2] p-1.5 inline-block rounded">
            <ChartLine className="text-white" size={20} />
          </span>
          <h1 className="text-xl font-bold text-[#2158d2]">Spend Smart</h1>
        </div>
        <div className="flex flex-col items-center justify-center w-full px-7  text-center">
          <h2 className="font-bold text-3xl tracking-tight">
            Create your account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Start tracking your expenses in minutes
          </p>
        </div>

        <div className="w-4/5">
          <Google />
          <Divider />
        </div>

        <form onSubmit={handleSubmit} className="w-4/5 flex flex-col gap-3">
          <Input label="Full Name" name="name" placeholder="John Doe" />
          <Input label="Email" name="email" placeholder="john@example.com" />
          <Input
            label="Password"
            name="password"
            placeholder="Create a strong password"
            hasIcon={true}
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            hasIcon={true}
          />
          <div className="flex flex-row items-center gap-2">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              className="accent-[#4F46E5] cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <span className="text-[#5646e5] cursor-pointer hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-[#5646e5] cursor-pointer hover:underline">
                Privacy Policy
              </span>
            </label>
          </div>
          <Button
            loading={loading}
            loadingText="Creating account..."
            type="submit"
          >
            Create Account
          </Button>
        </form>

        <p className="text-sm mt-2.5 text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#5646e5] font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default Page;
