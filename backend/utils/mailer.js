const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function sendPasswordResetEmail(email, resetLink) {
    await transporter.sendMail({
        from: `"Registration Portal" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Password Reset Request",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                <h2>Password Reset</h2>

                <p>
                    We received a request to reset your password.
                </p>

                <p>
                    Click the button below to create a new password:
                </p>

                <a
                    href="${resetLink}"
                    style="
                        display: inline-block;
                        padding: 12px 24px;
                        background: #1976d2;
                        color: white;
                        text-decoration: none;
                        border-radius: 6px;
                    "
                >
                    Reset Password
                </a>

                <p style="margin-top: 20px;">
                    This link will expire in 15 minutes.
                </p>

                <p>
                    If you didn't request a password reset, you can safely
                    ignore this email.
                </p>
            </div>
        `
    });
}

module.exports = {
    sendPasswordResetEmail
};