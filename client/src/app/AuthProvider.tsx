import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
      userPoolClientId:
        process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
    },
  },
});

const formFields = {
  signUp: {
    username:{
      label: 'Username',
      placeholder: 'Enter your Username:',
      isRequired: true,
      order: 1,
    },
    email:{
      label: 'Email',
      placeholder: 'Enter your Email address',
      isRequired: true,
      type: "email",
      order: 2,
    },
    password: {
      label: 'Password:',
      placeholder: 'Enter your Password:',
      isRequired: true,
      type:"password",
      order: 3,
    },
    confirm_password: {
      label: 'Confirm Password:',
      placeholder: 'Re-enter your Password:',
      isRequired: true,
      type:"password",
      order: 4,
    },
  },
}
const AuthProvider = ({ children }: any) => {
  return (
    <div className="mt-5">
      <Authenticator formFields={formFields}>
        {({ user }) =>
          user ? (
            <div>{children}</div>
          ) : (
            <div>
              <h1>Please sign in below</h1>
            </div>
          )
        }
      </Authenticator>
    </div>
  );
};

export default AuthProvider;
