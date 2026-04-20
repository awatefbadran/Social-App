import { Button, Input } from '@heroui/react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { loginSchema } from '../../../Lib/ValidationSchema/AuthSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { PiEyeLight, PiEyeClosedLight } from "react-icons/pi"
import { useContext, useState } from 'react'
import { loginApi } from '../../../Services/authServices'
import { toast } from 'react-toastify'
import { AuthContext } from '../../../context/AuthContext'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [errormessage, setErrorMessage] = useState("")
  const [sucessMessage, setSuccessMessage] = useState("")

  const navigate = useNavigate()
  const { setToken, setUserData } = useContext(AuthContext)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  async function submit(data) {
    try {
      const respons = await loginApi(data)

      setToken(respons.data.data.token)
      setUserData(respons.data.data.user || null) 

    
      localStorage.setItem("token", respons.data.data.token)
    

      setSuccessMessage(respons?.data?.message)
      toast.success(respons?.data?.message)

    
      // console.log("Token from context:", respons.data.data.token)
      // console.log("User Data from context:", respons.data.data.user)

      navigate("/")
    } catch (error) {
      setErrorMessage(error?.response?.data?.message)
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className='max-w-3xl mx-auto'>
      <h2 className='text-3xl font-bold my-2'>Welcome to our social Media app Login Form</h2>
      <p className='text-gray-500 my-2'>Please fill this form to login to your account</p>
      <div className='form-body'>
        <Input
          isInvalid={errors.email}
          errorMessage={errors.email?.message}
          {...register("email")}
          label="Email"
          type='email'
          variant='bordered'
          className='pb-4'
        />
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
        <Button isLoading={isSubmitting} type="submit" className='mt-4 w-full' color="primary" >Login</Button>
        <p className='text-center font-bold'>Don't Have an account
          <Link to="/register" className='text-blue-700 mx-2'>Register</Link>
        </p>
      </div>
    </form>
  )
}

export default Login