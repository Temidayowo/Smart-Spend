interface OtpTemplateProps {
  name: string;
  otp: string;
}

export default function OtpTemplate({ name, otp }: OtpTemplateProps): string {
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
                <table cellpadding="0" cellspacing="0" style="display:inline-table;">
                  <tr>
                    <td style="background-color:#4D79DB;border-radius:6px;padding:8px;vertical-align:middle;">
                      <img
                        src="https://api.iconify.design/lucide:chart-line.svg?color=white&width=20&height=20"
                        alt=""
                        width="20"
                        height="20"
                        style="display:block;"
                      />
                    </td>
                    <td style="padding-left:10px;vertical-align:middle;">
                      <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">Spend Smart</span>
                    </td>
                  </tr>
                </table>
                <p style="color:#bfd8fe;font-size:14px;margin:16px 0 0;">Email Verification</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="background-color:#ffffff;padding:40px;border-radius:0 0 12px 12px;">

                <p style="font-size:16px;color:#111827;margin:0 0 8px;">Hi ${name},</p>
                <p style="font-size:15px;color:#6b7280;margin:0 0 32px;line-height:1.6;">
                  Use the verification code below to confirm your email address. It expires in
                  <strong style="color:#111827;">10 minutes</strong>.
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

                <!-- Divider -->
                <hr style="border:none;border-top:1px solid #f3f4f6;margin:32px 0;" />

                <p style="font-size:12px;color:#d1d5db;margin:0;text-align:center;">
                  © ${new Date().getFullYear()} Spend Smart · All rights reserved
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
