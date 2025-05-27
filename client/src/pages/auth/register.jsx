import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"



const initialState = {
  userName: '',
  email: '',
  password: '',
};

function AuthRegister() {
  const [formData, setformData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  function onSubmit(e) {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.sucess) {
        toast(data?.payload.message)
        navigate('/auth/login');
      }else{
         toast.error(data?.payload.message)
      }
    });
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
