// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { MotionConfig, motion } from "framer-motion";
// import {
//   Button,
//   Card,
//   Description,
//   Form,
//   Input,
//   Label,
//   TextField,
//   FieldError,
//   Separator,
// } from "@heroui/react";
// import { Check } from "@gravity-ui/icons";
// import { useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
// import Logo from "@/components/Logo";
// import { BsGoogle } from "react-icons/bs";

// const container = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
// };

// const rise = {
//   hidden: { opacity: 0, y: 18 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 260, damping: 26 },
//   },
// };

// function EyeIcon({ off = false }) {
//   return (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
//       <circle cx="12" cy="12" r="3" />
//       {off && <path d="M3 3l18 18" />}
//     </svg>
//   );
// }

// function Spinner() {
//   return (
//     <svg
//       className="h-[18px] w-[18px] animate-spin"
//       viewBox="0 0 24 24"
//       fill="none"
//       aria-hidden="true"
//     >
//       <circle
//         cx="12"
//         cy="12"
//         r="9"
//         stroke="currentColor"
//         strokeOpacity="0.3"
//         strokeWidth="3"
//       />
//       <path
//         d="M21 12a9 9 0 0 0-9-9"
//         stroke="currentColor"
//         strokeWidth="3"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

// const LoginPage = () => {
//   const router = useRouter();
//   const [isPending, setIsPending] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     // Read the values before any await (e.currentTarget is cleared afterwards)
//     const formData = new FormData(e.currentTarget);
//     const user = Object.fromEntries(formData.entries());

//     setIsPending(true);

//     try {
//       const { error } = await authClient.signIn.email({
//         email: user.email,
//         password: user.password,
//       });

//       if (error) {
//         alert(`Log In failed: ${error.message || error.statusText}`);
//         return;
//       }

//       // router.push("/");
//       // router.refresh();
//       window.location.assign("/");
//     } catch (err) {
//       console.error("Log In error:", err);
//       alert("An unexpected error occurred.");
//     } finally {
//       setIsPending(false);
//     }
//   };

//   // Google Sign In
//   const handleGoogleSignIn = async () => {
//     const { error } = await authClient.signIn.social({
//       provider: "google",
//       callbackURL: "/",
//       errorCallbackURL: "/login",
//     });

//     if (error) {
//       console.error("Google Sign In error:", error);
//       alert(`Google Sign In failed: ${error.message || error.statusText}`);
//     }
//   };

//   return (
//     <MotionConfig reducedMotion="user">
//       <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-10">
//         {/* soft background glow */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#1a8fb0]/15 blur-3xl"
//         />
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-sky-300/20 blur-3xl"
//         />

//         <motion.div
//           variants={container}
//           initial="hidden"
//           animate="show"
//           className="relative w-full max-w-md"
//         >
//           <motion.div variants={rise} className="flex justify-center">
//             <Logo />
//           </motion.div>

//           <motion.div variants={rise} className="mt-6 text-center">
//             <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
//               Welcome back
//             </h1>
//             <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
//               Log in to continue your journey.
//             </p>
//           </motion.div>

//           <motion.div variants={rise} className="mt-8">
//             <Card className="rounded-3xl border border-slate-200 bg-white p-0 shadow-xl shadow-slate-900/5">
//               <div className="h-1.5 bg-gradient-to-r from-[#1a8fb0] via-sky-400 to-[#1a8fb0]" />
//               <Form
//                 onSubmit={onSubmit}
//                 className="flex w-full flex-col gap-5 p-6 sm:p-8"
//               >
//                 {/* email */}
//                 <TextField
//                   isRequired
//                   name="email"
//                   type="email"
//                   className="w-full"
//                   validate={(value) => {
//                     if (
//                       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
//                     ) {
//                       return "Please enter a valid email address";
//                     }
//                     return null;
//                   }}
//                 >
//                   <Label>Email</Label>
//                   <Input
//                     variant="secondary"
//                     placeholder="john@example.com"
//                     className="w-full rounded-2xl"
//                   />
//                   <FieldError />
//                 </TextField>

//                 {/* password */}
//                 <TextField
//                   isRequired
//                   minLength={8}
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   className="w-full"
//                   validate={(value) => {
//                     if (value.length < 8) {
//                       return "Password must be at least 8 characters";
//                     }
//                     if (!/[0-9]/.test(value)) {
//                       return "Password must contain at least one number";
//                     }
//                     return null;
//                   }}
//                 >
//                   <Label>Password</Label>
//                   <div className="relative">
//                     <Input
//                       variant="secondary"
//                       placeholder="Enter your password"
//                       className="w-full rounded-2xl pr-12"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword((v) => !v)}
//                       aria-label={
//                         showPassword ? "Hide password" : "Show password"
//                       }
//                       className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1a8fb0]"
//                     >
//                       <EyeIcon off={showPassword} />
//                     </button>
//                   </div>
//                   <Description>
//                     Your Password to Log In. Must be at least 8 characters and
//                     contain at least one number.
//                   </Description>
//                   <FieldError />
//                 </TextField>

//                 <Button
//                   type="submit"
//                   variant="primary"
//                   isPending={isPending}
//                   className="w-full rounded-2xl bg-[#1a8fb0] py-6 text-base font-semibold text-white transition-colors hover:bg-[#136f89]"
//                 >
//                   {isPending ? <Spinner /> : <Check />}
//                   {isPending ? "Logging in..." : "Log In"}
//                 </Button>

//                 <div className="mx-auto flex items-center justify-center gap-3">
//                   <Separator className="w-full" />

//                   <div className="whitespace-nowrap">or</div>

//                   <Separator />
//                 </div>

//                 <Button
//                   type="button"
//                   onPress={handleGoogleSignIn}
//                   variant="danger"
//                   className="w-full rounded-xl py-6 text-base font-semibold text-white transition-colors hover:bg-[#136f80] hover:text-white"
//                 >
//                   <BsGoogle /> Continue with Google
//                 </Button>
//               </Form>
//             </Card>
//           </motion.div>

//           <motion.p
//             variants={rise}
//             className="mt-6 text-center text-sm text-slate-600"
//           >
//             New to Roamly?{" "}
//             <Link
//               href="/signup"
//               className="font-semibold text-[#1a8fb0] hover:underline"
//             >
//               Create an account
//             </Link>
//           </motion.p>
//         </motion.div>
//       </div>
//     </MotionConfig>
//   );
// };

// export default LoginPage;

import LoginContent from "./LoginContent";
export const metadata = {
  title: "Log in",
  description: "Log in to your account to continue your journey.",
};

export default function ProfilePage() {
  return <LoginContent />;
}
