"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";
import {
  Button,
  Card,
  Description,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
  Separator,
} from "@heroui/react";
import { Check } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Logo from "@/components/Logo";
import { BsGoogle } from "react-icons/bs";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 26 },
  },
};

const PERKS = [
  "Hand-picked destinations around the world",
  "All your bookings in one place",
  "Free to join, no credit card needed",
];

function EyeIcon({ off = false }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M3 3l18 18" />}
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="h-[18px] w-[18px] animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="3"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

const SignUpPage = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Read the values before any await (e.currentTarget is cleared afterwards)
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    setIsPending(true);

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    setIsPending(false);

    if (error) {
      console.error("Sign up error:", error);
      alert(`Sign up failed: ${error.message || error.statusText}`);
      return;
    }

    console.log("Sign up success:", data);
    alert("Sign up successful!");
    // router.push("/");
    // router.refresh();
    window.location.assign("/");
  };

  // Google Sign up (the same call creates the account on first use)
  const handleGoogleSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/signup",
    });

    if (error) {
      console.error("Google Sign In error:", error);
      alert(`Google Sign In failed: ${error.message || error.statusText}`);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
        {/* ---------------- Brand panel (large screens) ---------------- */}
        <aside className="relative hidden items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f6a85] via-[#1a8fb0] to-sky-400 text-white lg:flex">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl"
          />

          {/* floating travel bubbles */}
          {[
            { emoji: "🏖️", className: "left-[10%] top-[14%]", delay: 0 },
            { emoji: "🏔️", className: "right-[12%] top-[22%]", delay: 1.2 },
            { emoji: "✈️", className: "right-[18%] bottom-[16%]", delay: 0.6 },
            { emoji: "🌍", className: "left-[14%] bottom-[12%]", delay: 1.8 },
          ].map(({ emoji, className, delay }) => (
            <motion.span
              key={emoji}
              aria-hidden="true"
              className={`absolute grid h-14 w-14 place-items-center rounded-2xl bg-white/15 text-3xl shadow-lg backdrop-blur ${className}`}
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
            >
              {emoji}
            </motion.span>
          ))}

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 max-w-md px-12"
          >
            <motion.h2
              variants={rise}
              className="text-5xl font-extrabold leading-[1.05] tracking-tight"
            >
              Your next adventure starts here
            </motion.h2>
            <motion.p variants={rise} className="mt-4 text-lg text-white/90">
              Create a free Roamly account and start exploring trips made for
              the way you travel.
            </motion.p>

            <ul className="mt-8 space-y-4">
              {PERKS.map((perk) => (
                <motion.li
                  key={perk}
                  variants={rise}
                  className="flex items-center gap-3 text-[15px] font-medium"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/20">
                    <Check className="size-4" />
                  </span>
                  {perk}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </aside>

        {/* ---------------- Form ---------------- */}
        <section className="relative flex items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 sm:px-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#1a8fb0]/10 blur-3xl"
          />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative w-full max-w-md"
          >
            <motion.div
              variants={rise}
              className="flex justify-center lg:justify-start"
            >
              <Logo />
            </motion.div>

            <motion.div
              variants={rise}
              className="mt-6 text-center lg:text-left"
            >
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Create your account
              </h1>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                Join Roamly in less than a minute.
              </p>
            </motion.div>

            <motion.div variants={rise} className="mt-8">
              <Card className="rounded-3xl border border-slate-200 bg-white p-0 shadow-xl shadow-slate-900/5">
                <div className="h-1.5 bg-gradient-to-r from-[#1a8fb0] via-sky-400 to-[#1a8fb0]" />
                <Form onSubmit={onSubmit} className="w-full p-6 sm:p-8">
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex w-full flex-col gap-5"
                  >
                    {/* name */}
                    <motion.div variants={rise}>
                      <TextField
                        isRequired
                        name="name"
                        type="text"
                        className="w-full"
                        validate={(value) => {
                          if (value.trim().length < 2) {
                            return "Name must be at least 2 characters long";
                          }
                          return null;
                        }}
                      >
                        <Label>Name</Label>
                        <Input
                          variant="secondary"
                          placeholder="John Doe"
                          className="w-full rounded-2xl"
                        />
                        <FieldError />
                      </TextField>
                    </motion.div>

                    {/* email */}
                    <motion.div variants={rise}>
                      <TextField
                        isRequired
                        name="email"
                        type="email"
                        className="w-full"
                        validate={(value) => {
                          if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                              value,
                            )
                          ) {
                            return "Please enter a valid email address";
                          }
                          return null;
                        }}
                      >
                        <Label>Email</Label>
                        <Input
                          variant="secondary"
                          placeholder="john@example.com"
                          className="w-full rounded-2xl"
                        />
                        <FieldError />
                      </TextField>
                    </motion.div>

                    {/* image */}
                    <motion.div variants={rise}>
                      <TextField
                        isRequired
                        name="image"
                        type="url"
                        className="w-full"
                      >
                        <Label>Image URL</Label>
                        <Input
                          variant="secondary"
                          placeholder="https://example.com/image.jpg"
                          className="w-full rounded-2xl"
                        />
                        <Description>
                          A direct link to your profile photo.
                        </Description>
                        <FieldError />
                      </TextField>
                    </motion.div>

                    {/* password */}
                    <motion.div variants={rise}>
                      <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="w-full"
                        validate={(value) => {
                          if (value.length < 8) {
                            return "Password must be at least 8 characters";
                          }
                          if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                          }
                          return null;
                        }}
                      >
                        <Label>Password</Label>
                        <div className="relative">
                          <Input
                            variant="secondary"
                            placeholder="Enter your password"
                            className="w-full rounded-2xl pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1a8fb0]"
                          >
                            <EyeIcon off={showPassword} />
                          </button>
                        </div>
                        <Description>
                          Must be at least 8 characters with at least 1 number
                        </Description>
                        <FieldError />
                      </TextField>
                    </motion.div>

                    <motion.div variants={rise} className="flex flex-col gap-3">
                      <Button
                        type="submit"
                        variant="primary"
                        isPending={isPending}
                        className="w-full rounded-2xl bg-[#1a8fb0] py-6 text-base font-semibold text-white transition-colors hover:bg-[#136f89]"
                      >
                        {isPending ? <Spinner /> : <Check />}
                        {isPending ? "Signing up..." : "Create account"}
                      </Button>

                      <div className="mx-auto flex items-center justify-center gap-3">
                        <Separator className="w-full" />

                        <div className="whitespace-nowrap">or</div>

                        <Separator />
                      </div>

                      <Button
                        type="button"
                        onPress={handleGoogleSignIn}
                        variant="danger"
                        className="w-full rounded-xl py-6 text-base font-semibold text-white transition-colors hover:bg-[#136f80] hover:text-white"
                      >
                        <BsGoogle /> Continue with Google
                      </Button>
                      <p className="text-center text-xs leading-relaxed text-slate-500">
                        By creating an account you agree to our{" "}
                        <Link
                          href="/terms"
                          className="font-semibold text-[#1a8fb0] hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="font-semibold text-[#1a8fb0] hover:underline"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </motion.div>
                  </motion.div>
                </Form>
              </Card>
            </motion.div>

            <motion.p
              variants={rise}
              className="mt-6 text-center text-sm text-slate-600"
            >
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#1a8fb0] hover:underline"
              >
                Log in
              </Link>
            </motion.p>
          </motion.div>
        </section>
      </div>
    </MotionConfig>
  );
};

export default SignUpPage;
