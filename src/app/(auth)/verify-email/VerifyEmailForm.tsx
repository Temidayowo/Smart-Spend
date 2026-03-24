"use client";

import { useState, useEffect } from "react";
import { ChartLine } from "lucide-react";
import OTPInput from "@/components/auth/OtpInput";
import Button from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import {
  resendVerificationEmail,
  verifyEmail,
} from "@/lib/actions/verify-email-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { compareSync } from "bcryptjs";

type VerifyEmailFormProps = {
  email: String;
  expired: Date;
};

const VerifyEmailForm = ({ email, expired }: VerifyEmailFormProps) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date>(expired);

  const router = useRouter();

  useEffect(() => {
    // reset and restart timer whenever expiryDate changes
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = expiryDate.getTime() - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
      } else {
        const minutes = Math.floor(diff / 1000 / 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]); // ← re-runs when expiryDate changes

 async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
   e.preventDefault();

   // Guard: don't submit if OTP is incomplete
   if (otp.length < 6) {
     toast.error("Please enter the complete 6-digit code.");
     return;
   }

   setLoading(true);
   try {
     const result = await verifyEmail(otp);
     if (result.success) {
       toast.success("Email verified successfully!");
       router.push("/dashboard");
     }
   } catch (error) {
     toast.error(
       error instanceof Error ? error.message : "Something went wrong.",
     );
   } finally {
     setLoading(false);
   }
 }

 async function handleResend() {
   setResending(true);
   try {
     await resendVerificationEmail();
     setExpiryDate(new Date(Date.now() + 10 * 60 * 1000));
     setOtp("");
     toast.success("A new OTP has been sent to your email.");
   } catch (error) {
     if (isRedirectError(error)) throw error;
     toast.error(
       error instanceof Error ? error.message : "Something went wrong.",
     );
   } finally {
     setResending(false);
   }
 }


  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center px-4">
      <div className="absolute flex gap-2 items-center top-4 left-4 sm:top-6 sm:left-6">
        <span className="bg-[#2158d2] p-1.5 rounded">
          <ChartLine className="text-white" size={18} />
        </span>
        <h1 className="text-lg sm:text-xl font-bold text-[#2158d2]">
          Spend Smart
        </h1>
      </div>

      <div className="w-full max-w-md bg-linear-to-br from-[#f3f8fe] to-[#e1e8ff] rounded-xl px-5 py-10 sm:px-8 sm:py-12 flex flex-col items-center justify-center gap-8 shadow-sm">
        <div className="w-full text-center space-y-2">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#2158d2]">
            OTP Verification
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            An OTP has been sent to{" "}
            <span className="font-semibold text-[#2158d2] break-all">
              {email}
            </span>
          </p>
          <p>OTP expires in: {timeLeft}</p>
        </div>

        <form
          className="w-full flex flex-col gap-6 items-center"
          onSubmit={handleSubmit}
        >
          <OTPInput onOtpChange={setOtp} />
          <Button type="submit" className="w-full" loading={loading} disabled={loading || otp.length < 6}>
            Verify OTP
          </Button>
        </form>

        <div className="flex items-center gap-2 text-sm text-[#6b7280] w-full">
          <span className="flex-1 h-px bg-gray-300" />
          <span className="whitespace-nowrap px-2">
            Didn&apos;t receive the code?
          </span>
          <span className="flex-1 h-px bg-gray-300" />
        </div>

        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="w-full bg-transparent font-semibold text-gray-600 hover:bg-white/60 active:bg-white/80 border border-gray-300 hover:border-[#2158d2]/40 backdrop-blur-sm rounded-md py-2 px-4 text-sm transition-colors flex gap-1.5 justify-center disabled:opacity-50"
        >
          {resending ? "Sending..." : "Resend OTP"}
          <RotateCw className={`ml-2 ${resending ? "animate-spin" : ""}`} />
        </button>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
