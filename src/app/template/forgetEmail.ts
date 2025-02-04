import emailTransporter from "./emailTransporter";

const forgetEmail = async (email: string, resetLink: string) => {
  return await emailTransporter.sendMail({
    from: '"PH Health Care 👻" <mdparvez222khan@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello Patient, Did you just forget your password?", // plain text body
    html: `
        <div>
          <p>Dear User,</p>
          <p>Your password reset link
            <a href=${resetLink}>
                <button>
                    Reset Password
                </button>
            </a>
          </p>
        </div>
        `, // html body
  });
};

export default forgetEmail;
