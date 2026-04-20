import * as z from "zod";

export const registerSchema = z.object({
    name: z.string().nonempty("Name is required").min(3, "Name must be at least 3 characters").max(20, "Name must be less than 20 characters"),  
    username: z.string().nonempty("Username is required").min(3, "Username must be at least 3 characters").max(20, "Username must be less than 20 characters"),
    email: z.string().nonempty("Email is required").email("Please enter a valid email address"),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters").max(10, "Password must be less than 10 characters").regex(/[A-Z]/, "Password must contain at least one capital letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
    rePassword: z.string().nonempty("rePassword is required").min(6, "rePassword must be at least 6 characters").max(10, "rePassword must be less than 10 characters").regex(/[A-Z]/, "Password must contain at least one capital letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
    dateOfBirth: z.string().nonempty("Birth date is required").refine((date) => {
        const today = new Date();
        const dateOfBirth = new Date(date);
        const age = today.getFullYear() - dateOfBirth.getFullYear();
        return age >= 18;
    }, "You must be at least 18 years old to register"),
    gender: z.string().nonempty("Gender is required"),

}).refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"]
})


export const loginSchema = z.object({
    email: z.string().nonempty("Email is required").email("Please enter a valid email address"),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters").max(10, "Password must be less than 10 characters"),

})

export const changePasswordSchema = z.object({
  password: z.string()
    .nonempty("Current password is required"),

  newPassword: z.string()
    .nonempty("New password is required")
    .min(6, "Password must be at least 6 characters")
    .max(10, "Password must be less than 10 characters")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[@$!%*?&#]/, "Must contain special character"),
});