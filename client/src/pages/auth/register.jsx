import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  userName: '',
  email: '',
  password: ''
};

function AuthRegister() {
  const [formData, setformData] = useState(initialState);

  function onSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create New Account</h1>
        <p className="mt-2">
          Already have an account?
          <Link className="font-medium ml-1 text-primary hover:underline" to="/auth/login">
            Login
          </Link>
        </p>
      </div>
      
      <CommonForm
        formControls={registerFormControls}
        buttonText="Sign Up"
        formData={formData}
        setFormData={setformData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
