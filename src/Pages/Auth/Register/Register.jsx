import { Button, DatePicker, Input, Select, SelectItem } from '@heroui/react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { registerSchema } from '../../../Lib/ValidationSchema/AuthSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { PiEyeLight, PiEyeClosedLight } from "react-icons/pi";
import { useState, useContext } from 'react'
import { registerApi } from '../../../Services/authServices'
import { toast } from 'react-toastify'
import { AuthContext } from '../../../context/AuthContext';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [errormessage, setErrorMessage] = useState("");
  const [sucessMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // ✅ هنا جلبنا الكونتكست
  const { setUserData, setToken } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: ""
    }
  });

  async function submit(data) {
    try {
      const respons = await registerApi(data);
      setSuccessMessage(respons?.data?.message)
      toast.success(respons?.data?.message)

      // ✅ تحديث الكونتكست
      setUserData(respons?.data?.user || null);
      setToken(respons?.data?.token || null);
  console.log("Token:", respons?.data?.token);
    console.log("User Data:", respons?.data?.user);
      // ✅ التنقل للـ login بعد التحديث
      navigate("/login");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message)
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className='max-w-3xl mx-auto'>
      <h2 className='text-3xl font-bold my-2'>Welcome to our social Media app Register Form</h2>
      <p className='text-gray-500 my-2'>Please fill this form to create your account</p>
      <div className='form-body'>
        <Input isInvalid={errors.name} errorMessage={errors.name?.message} {...register("name")} label="Name" type='text' variant='bordered' className='pb-4' />
        <Input isInvalid={errors.username} errorMessage={errors.username?.message} {...register("username")} label="Username" type='text' variant='bordered' className='pb-4' />
        <Input isInvalid={errors.email} errorMessage={errors.email?.message} {...register("email")} label="Email" type='email' variant='bordered' className='pb-4' />
        <Input
          isInvalid={errors.password}
          errorMessage={errors.password?.message}
          {...register("password")}
          label="Password"
          type={showPassword ? "text" : "password"}
          variant='bordered'
          className='pb-4'
          endContent={
            showPassword
              ? <PiEyeLight className='text-2xl cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
              : <PiEyeClosedLight className='text-2xl cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
          }
        />
        <Input
          isInvalid={errors.rePassword}
          errorMessage={errors.rePassword?.message}
          {...register("rePassword")}
          label="Re-Password"
          type={showRePassword ? "text" : "password"}
          variant='bordered'
          className='pb-4'
          endContent={
            showRePassword
              ? <PiEyeLight className='text-2xl cursor-pointer' onClick={() => setShowRePassword(!showRePassword)} />
              : <PiEyeClosedLight className='text-2xl cursor-pointer' onClick={() => setShowRePassword(!showRePassword)} />
          }
        />
        <div className='flex justify-between gap-3'>
          <Input type="date" isInvalid={errors.dateOfBirth} errorMessage={errors.dateOfBirth?.message} {...register("dateOfBirth")} className='pb-4' label="Birth date" />
          <Select isInvalid={errors.gender} errorMessage={errors.gender?.message} {...register("gender")} className="max-w-xs" label="Select a gender">
            <SelectItem key="male">Male</SelectItem>
            <SelectItem key="female">Female</SelectItem>
          </Select>
        </div>
        <Button isLoading={isSubmitting} type="submit" className='mt-4 w-full' color="primary" >Register</Button>
        <p className='text-center font-bold'>Already Have an account
          <Link to="/login" className='text-blue-700 mx-2'>Login</Link>
        </p>
      </div>
    </form>
  )
}

export default Register;