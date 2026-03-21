import { ChartLine, LockIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Input from "@/components/auth/Input";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import { resetPassword } from "@/lib/actions/resetpassword.action";
import { toast } from "sonner";



const ResetPasswordContent = () => {
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("newPassword")?.toString() ?? "";
    const confirmNewPassword =
      formData.get("confirmNewPassword")?.toString() ?? "";

    setLoading(true);
    try {
      await resetPassword(newPassword, confirmNewPassword, token!);
      toast.success("Password reset successful. You can now log in.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div className="absolute flex gap-3 items-center top-7 left-7 pb-8">
        <span className="bg-[#2158d2] p-1.5 inline-block rounded">
          <ChartLine className="text-white" size={20} />
        </span>
        <h1 className="text-xl font-bold text-[#2158d2]">Spend Smart</h1>
      </div>
      <div className="bg-linear-to-br from-[#f3f8fe] to-[#e1e8ff] w-full h-screen lg:w-lg lg:h-auto">
        <div className="w-full flex flex-col items-center justify-center h-full px-7 lg:px-10 py-16">
          <span className="bg-[#dce4fb] p-4 mb-4 rounded-lg inline-block">
            <LockIcon className="text-[#2158d2]" size={30} />
          </span>
          <h2 className="text-3xl text-center font-bold tracking-tight mb-1">
            Reset Password
          </h2>
          <p className="text-sm text-center text-gray-500 mb-6">
            Enter your new password below.
          </p>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="w-full flex flex-col gap-5"
          >
            <Input
              label="New Password"
              name="newPassword"
              placeholder="••••••••"
              hasIcon={true}
              required
            />
            <Input
              label="Confirm New Password"
              name="confirmNewPassword"
              placeholder="••••••••"
              hasIcon={true}
              required
            />
            <Button type="submit" loading={loading} loadingText="Resetting...">
              Reset Password
            </Button>
          </form>
          <div className="mt-5 text-sm text-gray-500">
            <Link
              href="/login"
              className="lg:font-medium text-[#2158d2] hover:underline flex items-center"
            >
              <ArrowLeft className="inline-block mr-2 text-base lg:text-lg" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordContent;
