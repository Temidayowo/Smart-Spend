"use client";

import { Suspense } from "react";
import ResetPasswordContent from "./ResetPasswordContent";

const ResetPasswordPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordContent/>
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
