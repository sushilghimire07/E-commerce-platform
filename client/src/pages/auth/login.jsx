import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link,  useNavigate } from "react-router-dom";
import { toast } from "sonner";


const initialState = {
  email: '',
  password: ''
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    console.log(formData);
    dispatch(loginUser(formData)).then((data)=>{
      if(data?.payload?.sucess){
        toast(data?.payload?.message)
          navigate('/');
      }
      else{
        toast.error(data?.payload?.message)
      }
    })
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
        <p className="mt-2">
          Dosen`t have an account?
          <Link className="font-medium ml-1 text-primary hover:underline" to="/auth/register">
            Register
          </Link>
        </p>
      </div>
      
      <CommonForm
        formControls={loginFormControls}
        buttonText="Sign Up"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
