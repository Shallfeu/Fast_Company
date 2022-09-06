import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/LoginForm";
import RegisterForm from "../components/ui/RegisterForm";

type HookProps = {
  type: string;
};

const Login: React.FC = () => {
  const { type } = useParams<HookProps>();
  const [formType, setFormType] = useState<string>(
    type === "register" ? type : "login"
  );

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === "login" ? (
            <>
              <h3 className="mb-4">Login</h3>
              <LoginForm />
              <p>
                Dont have account?{" "}
                <a role="button" onClick={toggleFormType}>
                  Create it
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Register</h3>
              <RegisterForm />
              <p>
                Already have account?{" "}
                <a role="button" onClick={toggleFormType}>
                  Sign in
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
