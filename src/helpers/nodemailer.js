require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const {
  gmailAccount,
  gmailRedirectUri,
  gmailRefreshToken,
  googleClientId,
  googleClientSecret,
  frontendBaseUrl
} = require("../config/keys");

const OAuth2 = google.auth.OAuth2;

class AccountVerificationHelper {
  static async sendVerificationEmail(to, token, use) {
    const oauth2Client = new OAuth2(
      googleClientId,
      googleClientSecret,
      gmailRedirectUri
    );
    oauth2Client.setCredentials({
      refresh_token: gmailRefreshToken
    });
    const accessToken = oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: gmailAccount,
        clientId: googleClientId,
        clientSecret: googleClientSecret,
        refreshToken: gmailRefreshToken,
        accessToken
      }
    });

    const URL = () => {
      if (use === "registration") {
        return `${frontendBaseUrl}/verifyAccount/?email=${to}&token=${token}`;
      } else if (use === "password_reset") {
        return `${frontendBaseUrl}/password_reset?token=${token}`;
      } else {
        return;
      }
    };

    const html = () => {
      if (use === "registration") {
        return `
          <div style="height: 100%; width: 100%; margin: 0; padding: 0; color: black; background-color: white">
            <p>Kindly click on the link below to activate your account</p>
            <p>Click this link below:</p>
            <p>${URL()}</p>   
          </div>
        `;
      } else if (use === "password_reset") {
        return `
          <div style="height: 100%; width: 100%; margin: 0; padding: 0; color: black; background-color: white">
            <p>We heard that you lost your Finlo password. Sorry about that.</p>
            <p>But don't worry, you can use the following link to reset your password.</p>
            <p>${URL()}</p>
            <p>If you don't use this link within 3 hours it will expire</p>
          </div>
        `;
      } else {
        return;
      }
    };

    const subject = () => {
      if (use === "registration") {
        return "Account Verification"
      } else if (use === "password_reset") {
        return "Reset Password"
      } else {
        return;
      }
    }

    const mailOptions = {
      from: "no-reply@gmail.com",
      to,
      subject: subject(),
      generateTextFromHTML: true,
      html: html()
    };

    await smtpTransport.sendMail(mailOptions, (_err, info) => {
      if (_err) {
        console.log(_err);
      }
      console.log(`Email sent: ${info.response}`);
      smtpTransport.close();
    });
  }
}

module.exports = AccountVerificationHelper;
