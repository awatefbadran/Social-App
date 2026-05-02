import { Input, Button } from "@heroui/react";
import { FiArrowLeft } from "react-icons/fi";
import { LuKeyRound } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../../Lib/ValidationSchema/AuthSchema";
import { toast } from "react-toastify";
import { changePasswordApi } from "../../Services/authServices";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function Settings() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: ""
    }
  });
  const { setToken, setUserData } = useContext(AuthContext);
async function onSubmit(data) {
  try {
    const res = await changePasswordApi(data);
    toast.success(res?.data?.message);
    localStorage.removeItem("token");
    setToken(null);
    setUserData(null);
    reset();
    navigate("/login");

  } catch (error) {
    console.log(error); 
    toast.error(error?.response?.data?.message);
  }
}

  return (
    <div className="flex flex-col items-center min-h-[80vh] py-10 bg-gray-100">

      <div className="w-full max-w-3xl mb-4">
        <Link
          to="/"
          className="flex items-center gap-2 w-fit px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 shadow-sm"
        >
          <FiArrowLeft />
          Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl"
      >
    
        <div className="flex items-start gap-3 mb-6">
          <div className="p-2 rounded-full bg-blue-100 text-blue-600">
            <LuKeyRound size={20} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Change Password</h2>
            <p className="text-gray-500 text-sm">
              Keep your account secure by using a strong password.
            </p>
          </div>
        </div>

       
        <Input
          label="Current password"
          type="password"
          variant="bordered"
          className="mb-4"
          {...register("password")}
          isInvalid={errors.password}
          errorMessage={errors.password?.message}
        />

  
        <Input
          label="New password"
          type="password"
          variant="bordered"
          className="mb-6"
          {...register("newPassword")}
          isInvalid={errors.newPassword}
          errorMessage={errors.newPassword?.message}
        />

        <Button
          type="submit"
          color="primary"
          className="w-full h-12"
          isLoading={isSubmitting}
        >
          Update password
        </Button>
      </form>
    </div>
  );
}