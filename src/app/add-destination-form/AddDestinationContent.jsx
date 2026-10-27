"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const REFRESH_DELAY_MS = 3000;
const CATEGORIES = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Luxury",
];

const todayISO = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

const refreshPage = () => window.location.reload();

const validators = {
  destinationName: (v) =>
    v.trim().length >= 3 ? null : "Enter at least 3 characters",
  price: (v) => (Number(v) > 0 ? null : "Enter a price above 0"),
  departureDate: (v) => {
    if (!v) return null;
    return v >= todayISO() ? null : "The date can't be in the past";
  },
  imageUrl: (v) => {
    try {
      const url = new URL(v);
      return ["http:", "https:"].includes(url.protocol)
        ? null
        : "Use an http or https link";
    } catch {
      return "Enter a valid image URL";
    }
  },
  description: (v) =>
    v.trim().length >= 30 ? null : "Write at least 30 characters",
};

/* ------------------------------------------------------------------ */
/* Animation                                                           */
/* ------------------------------------------------------------------ */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 26 },
  },
};

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function Icon({ children, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const PlusIcon = () => (
  <Icon size={18}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);
const CheckIcon = () => (
  <Icon>
    <path d="M5 12l5 5L20 7" />
  </Icon>
);
const AlertIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" />
  </Icon>
);

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

function Field({
  name,
  label,
  placeholder,
  type = "text",
  span = false,
  hint,
  inputProps,
}) {
  return (
    <motion.div variants={rise} className={span ? "md:col-span-2" : ""}>
      <TextField
        name={name}
        type={type}
        isRequired
        validate={validators[name]}
        className="w-full"
      >
        <Label>{label}</Label>
        <Input
          variant="secondary"
          placeholder={placeholder}
          className="w-full rounded-2xl"
          {...inputProps}
        />
        {hint && <Description>{hint}</Description>}
        <FieldError />
      </TextField>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Success popup                                                       */
/* ------------------------------------------------------------------ */

function SuccessDialog({ name }) {
  useEffect(() => {
    const timer = setTimeout(refreshPage, REFRESH_DELAY_MS);
    const onKey = (e) => e.key === "Escape" && refreshPage();
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-slate-900/50 p-4 backdrop-blur-sm"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
        aria-describedby="success-desc"
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="w-full max-w-sm overflow-hidden rounded-3xl bg-white text-center shadow-2xl"
      >
        <div className="px-8 pb-6 pt-9">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 16,
              delay: 0.1,
            }}
            className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <motion.path
                d="M5 12.5l4.5 4.5L19 7.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, delay: 0.35, ease: "easeOut" }}
              />
            </svg>
          </motion.div>

          <h2
            id="success-title"
            className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900"
          >
            Package added
          </h2>
          <p
            id="success-desc"
            className="mt-2 text-[15px] leading-relaxed text-slate-600"
          >
            <span className="font-semibold text-slate-800">{name}</span> is now
            part of your destinations. The page will refresh in a moment.
          </p>

          <Button
            autoFocus
            variant="primary"
            onPress={refreshPage}
            className="mt-6 w-full rounded-2xl bg-[#1a8fb0] py-5 text-base font-semibold text-white hover:bg-[#136f89]"
          >
            Done
          </Button>
        </div>

        <div className="h-1.5 bg-slate-100" aria-hidden="true">
          <motion.div
            className="h-full bg-gradient-to-r from-[#1a8fb0] via-sky-400 to-[#1a8fb0]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: REFRESH_DELAY_MS / 1000, ease: "linear" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function AddDestinationPage() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [addedName, setAddedName] = useState("");
  const [formKey, setFormKey] = useState(0);

  // FIX: Define minDate here so the form can access it
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    // Set the date on mount to avoid hydration errors
    setMinDate(todayISO());
  }, []);

  const isPending = status === "pending";

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = {
      destinationName: formData.get("destinationName").trim(),
      country: formData.get("country").trim(),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      duration: formData.get("duration").trim(),
      departureDate: formData.get("departureDate"),
      imageUrl: formData.get("imageUrl").trim(),
      description: formData.get("description").trim(),
    };

    setStatus("pending");
    setMessage("");

    const { data: tokenData } = await authClient.token();

    try {
      const res = await fetch(`${API_URL}/destinations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();

      setAddedName(payload.destinationName);
      setStatus("success");
      setMessage(
        `"${payload.destinationName}" was added to your destinations.`,
      );
      setFormKey((k) => k + 1);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage(
        "We couldn't save this package. Check your connection and try again.",
      );
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate overflow-hidden bg-slate-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#1a8fb0]/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/2 -z-10 h-96 w-96 rounded-full bg-sky-300/20 blur-3xl"
        />

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
          <motion.header
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Add a new travel package
            </h1>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
              Fill in the details below. The package appears on Roamly as soon
              as you save it.
            </p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 26,
              delay: 0.05,
            }}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5"
          >
            <div className="h-1.5 bg-gradient-to-r from-[#1a8fb0] via-sky-400 to-[#1a8fb0]" />

            <Form key={formKey} onSubmit={onSubmit} className="p-6 sm:p-10">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
              >
                <Field
                  span
                  name="destinationName"
                  label="Destination name"
                  placeholder="Bali Paradise"
                />

                <Field name="country" label="Country" placeholder="Indonesia" />

                <motion.div variants={rise}>
                  <Select
                    name="category"
                    isRequired
                    variant="secondary"
                    className="w-full"
                    placeholder="Select category"
                  >
                    <Label>Category</Label>
                    <Select.Trigger className="rounded-2xl">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {CATEGORIES.map((c) => (
                          <ListBox.Item key={c} id={c} textValue={c}>
                            {c}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                    <FieldError />
                  </Select>
                </motion.div>

                <Field
                  name="price"
                  label="Price (USD)"
                  type="number"
                  placeholder="1299"
                  inputProps={{
                    min: 1,
                    step: "any",
                    className:
                      "w-full rounded-2xl [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                  }}
                />

                <Field
                  name="duration"
                  label="Duration"
                  placeholder="7 Days / 6 Nights"
                />

                <Field
                  span
                  name="departureDate"
                  label="Departure date"
                  type="date"
                  inputProps={{ min: minDate }}
                />

                <Field
                  span
                  name="imageUrl"
                  label="Image URL"
                  type="url"
                  placeholder="https://example.com/bali-paradise.jpg"
                  hint="Use a direct link to a landscape photo."
                />

                <motion.div variants={rise} className="md:col-span-2">
                  <TextField
                    name="description"
                    isRequired
                    validate={validators.description}
                    className="w-full"
                  >
                    <Label>Description</Label>
                    <TextArea
                      variant="secondary"
                      rows={5}
                      placeholder="Describe the travel experience..."
                      className="w-full resize-y rounded-3xl"
                    />
                    <FieldError />
                  </TextField>
                </motion.div>

                <AnimatePresence initial={false}>
                  {(status === "success" || status === "error") && (
                    <motion.div
                      key={status}
                      role={status === "error" ? "alert" : "status"}
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8 }}
                      className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm md:col-span-2 ${
                        status === "success"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border-red-200 bg-red-50 text-red-700"
                      }`}
                    >
                      <span className="mt-0.5 shrink-0">
                        {status === "success" ? <CheckIcon /> : <AlertIcon />}
                      </span>
                      <p>{message}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div variants={rise} className="md:col-span-2">
                  <Button
                    type="submit"
                    variant="primary"
                    isPending={isPending}
                    isDisabled={status === "success"}
                    className="w-full rounded-2xl bg-[#1a8fb0] py-6 text-base font-semibold text-white hover:bg-[#136f89]"
                  >
                    {isPending ? <Spinner /> : <PlusIcon />}
                    {isPending ? "Adding package..." : "Add travel package"}
                  </Button>
                </motion.div>
              </motion.div>
            </Form>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {status === "success" && <SuccessDialog name={addedName} />}
      </AnimatePresence>
    </MotionConfig>
  );
}
