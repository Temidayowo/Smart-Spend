interface PasswordResetTemplateProps {
  name: string;
  resetUrl: string;
  expiresIn: Date;
}

export function passwordResetTemplate({ name, resetUrl, expiresIn }: PasswordResetTemplateProps): string {
  const expiresAtFormatted = expiresIn.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset your password – Spend Smart</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#2158d2,#25206e);border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
                <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">Spend Smart</p>
                <p style="color:#bfd8fe;font-size:14px;margin:8px 0 0;">Password Reset</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="background-color:#ffffff;padding:40px;border-radius:0 0 12px 12px;">

                <p style="font-size:16px;color:#111827;margin:0 0 8px;">Hi ${name},</p>
                <p style="font-size:15px;color:#6b7280;margin:0 0 32px;line-height:1.6;">
                  We received a request to reset your password. Click the button below to set a new one.
                  The link expires at <strong style="color:#111827;">${expiresAtFormatted}</strong>.
                </p>

                <!-- Button -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                  <tr>
                    <td align="center">
                      <a href="${resetUrl}" style="display:inline-block;background-color:#2158d2;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">
                        Reset Password
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="font-size:13px;color:#9ca3af;margin:0 0 8px;line-height:1.6;">
                  If the button doesn't work, copy and paste this link into your browser:
                </p>
                <p style="font-size:12px;color:#6b7280;word-break:break-all;margin:0 0 24px;">${resetUrl}</p>

                <p style="font-size:13px;color:#9ca3af;margin:0;line-height:1.6;">
                  If you didn't request a password reset, you can safely ignore this email.
                </p>

                <hr style="border:none;border-top:1px solid #f3f4f6;margin:32px 0;" />

                <p style="font-size:12px;color:#d1d5db;margin:0;text-align:center;">
                  &copy; ${new Date().getFullYear()} Spend Smart &middot; All rights reserved
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

interface OtpTemplateProps {
  name: string;
  otp: string;
  expiresIn: Date;
}

export function otpTemplate({ name, otp, expiresIn }: OtpTemplateProps): string {
  const expiresAtFormatted = expiresIn.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify your email – Spend Smart</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#2158d2,#25206e);border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
                <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">Spend Smart</p>
                <p style="color:#bfd8fe;font-size:14px;margin:8px 0 0;">Email Verification</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="background-color:#ffffff;padding:40px;border-radius:0 0 12px 12px;">

                <p style="font-size:16px;color:#111827;margin:0 0 8px;">Hi ${name},</p>
                <p style="font-size:15px;color:#6b7280;margin:0 0 32px;line-height:1.6;">
                  Use the verification code below to confirm your email address. It expires at
                  <strong style="color:#111827;">${expiresAtFormatted}</strong>.
                </p>

                <!-- OTP box -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                  <tr>
                    <td align="center" style="background-color:#f0f4ff;border:1.5px dashed #4D79DB;border-radius:10px;padding:28px 0;">
                      <p style="margin:0 0 6px;font-size:12px;color:#6b7280;letter-spacing:1.5px;text-transform:uppercase;font-weight:600;">Your verification code</p>
                      <span style="font-size:40px;font-weight:800;letter-spacing:12px;color:#2158d2;">${otp}</span>
                    </td>
                  </tr>
                </table>

                <p style="font-size:13px;color:#9ca3af;margin:0 0 8px;line-height:1.6;">
                  If you didn't create an account with Spend Smart, you can safely ignore this email.
                </p>
                <p style="font-size:13px;color:#9ca3af;margin:0;line-height:1.6;">
                  For security, never share this code with anyone.
                </p>

                <hr style="border:none;border-top:1px solid #f3f4f6;margin:32px 0;" />

                <p style="font-size:12px;color:#d1d5db;margin:0;text-align:center;">
                  &copy; ${new Date().getFullYear()} Spend Smart &middot; All rights reserved
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}
