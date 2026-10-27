// "use client";

// import {
//   Button,
//   Description,
//   Form,
//   Input,
//   Label,
//   Modal,
//   Surface,
//   TextField,
//   TextArea,
//   Select,
//   ListBox,
//   FieldError,
// } from "@heroui/react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";

// import { AnimatePresence, motion } from "framer-motion";

// import { BiEdit } from "react-icons/bi";

// const CATEGORIES = [
//   "Beach",
//   "Mountain",
//   "City",
//   "Adventure",
//   "Cultural",
//   "Luxury",
// ];

// const validators = {
//   destinationName: (v) =>
//     v.trim().length >= 3 ? null : "Enter at least 3 characters",
//   price: (v) => (Number(v) > 0 ? null : "Enter a price above 0"),
//   imageUrl: (v) => {
//     try {
//       const url = new URL(v);
//       return ["http:", "https:"].includes(url.protocol)
//         ? null
//         : "Use an http or https link";
//     } catch {
//       return "Enter a valid image URL";
//     }
//   },
//   description: (v) =>
//     v.trim().length >= 30 ? null : "Write at least 30 characters",
// };

// const container = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
// };

// const rise = {
//   hidden: { opacity: 0, y: 18 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 260, damping: 26 },
//   },
// };

// function Icon({ children, size = 18 }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       {children}
//     </svg>
//   );
// }

// const CheckIcon = () => (
//   <Icon>
//     <path d="M5 12l5 5L20 7" />
//   </Icon>
// );
// const AlertIcon = () => (
//   <Icon>
//     <circle cx="12" cy="12" r="10" />
//     <path d="M12 8v4M12 16h.01" />
//   </Icon>
// );

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

// // One reusable text field: label + input + validation message
// function Field({
//   name,
//   label,
//   placeholder,
//   type = "text",
//   span = false,
//   hint,
//   inputProps,
//   defaultValue,
// }) {
//   return (
//     <motion.div variants={rise} className={span ? "md:col-span-2" : ""}>
//       <TextField
//         name={name}
//         type={type}
//         isRequired
//         validate={validators[name]}
//         defaultValue={defaultValue}
//         className="w-full"
//       >
//         <Label>{label}</Label>
//         <Input
//           variant="secondary"
//           placeholder={placeholder}
//           className="w-full rounded-2xl"
//           {...inputProps}
//         />
//         {hint && <Description>{hint}</Description>}
//         <FieldError />
//       </TextField>
//     </motion.div>
//   );
// }

// export function EditModal({ destination }) {
//   const router = useRouter();
//   const { _id } = destination || {};
//   const [status, setStatus] = useState("idle"); // idle | pending | success | error
//   const [message, setMessage] = useState("");

//   const isPending = status === "pending";

//   async function onSubmit(e) {
//     e.preventDefault();

//     // Read the values before any await (e.currentTarget is cleared afterwards)
//     const formData = new FormData(e.currentTarget);
//     const payload = {
//       destinationName: formData.get("destinationName").trim(),
//       country: formData.get("country").trim(),
//       category: formData.get("category"),
//       price: Number(formData.get("price")),
//       duration: formData.get("duration").trim(),
//       departureDate: formData.get("departureDate"),
//       imageUrl: formData.get("imageUrl").trim(),
//       description: formData.get("description").trim(),
//     };
//     console.log("Payload:", payload);

//     setStatus("pending");
//     setMessage("");

//     const { data: tokenData } = await authClient.token();

//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/destinations/${_id}`,
//         {
//           method: "PATCH", // To Edit
//           headers: {
//             "Content-Type": "application/json",
//             authorization: `Bearer ${tokenData?.token}`,
//           },
//           body: JSON.stringify(payload),
//         },
//       );
//       if (!res.ok) throw new Error(`Server responded with ${res.status}`);

//       const data = await res.json();
//       console.log("Response:", data);

//       setStatus("success");
//       setMessage(`"${payload.destinationName}" was updated successfully.`);
//       router.refresh(); // reload the server data on the details page
//     } catch (err) {
//       console.error(err);
//       setStatus("error");
//       setMessage(
//         "We couldn't save this package. Check your connection and try again.",
//       );
//     }
//   }
//   return (
//     <Modal>
//       <Button variant="outline" className=" sm:w-auto">
//         <BiEdit /> Edit
//       </Button>
//       <Modal.Backdrop>
//         <Modal.Container placement="auto">
//           <Modal.Dialog className="sm:max-w-2xl">
//             <Modal.CloseTrigger />
//             <Modal.Header>
//               <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
//                 <BiEdit className="size-5" />
//               </Modal.Icon>
//               <Modal.Heading>Edit Destination</Modal.Heading>
//               <p className="mt-1.5 text-sm leading-5 text-muted">
//                 Update the details below and save your changes.
//               </p>
//             </Modal.Header>
//             <Modal.Body className="p-6">
//               <Surface variant="default">
//                 <Form onSubmit={onSubmit} className="p-6 sm:p-10">
//                   <motion.div
//                     variants={container}
//                     initial="hidden"
//                     animate="show"
//                     className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
//                   >
//                     {/* Destination name */}
//                     <Field
//                       span
//                       name="destinationName"
//                       label="Destination name"
//                       placeholder="Bali Paradise"
//                       defaultValue={destination.destinationName}
//                     />

//                     {/* Country */}
//                     <Field
//                       name="country"
//                       label="Country"
//                       placeholder="Indonesia"
//                       defaultValue={destination.country}
//                     />

//                     {/* Category */}
//                     <motion.div variants={rise}>
//                       <Select
//                         name="category"
//                         isRequired
//                         variant="secondary"
//                         className="w-full"
//                         placeholder="Select category"
//                         defaultValue={destination.category}
//                       >
//                         <Label>Category</Label>
//                         <Select.Trigger className="rounded-2xl">
//                           <Select.Value />
//                           <Select.Indicator />
//                         </Select.Trigger>
//                         <Select.Popover>
//                           <ListBox>
//                             {CATEGORIES.map((c) => (
//                               <ListBox.Item key={c} id={c} textValue={c}>
//                                 {c}
//                                 <ListBox.ItemIndicator />
//                               </ListBox.Item>
//                             ))}
//                           </ListBox>
//                         </Select.Popover>
//                         <FieldError />
//                       </Select>
//                     </motion.div>

//                     {/* Price */}
//                     <Field
//                       name="price"
//                       label="Price (USD)"
//                       type="number"
//                       placeholder="1299"
//                       defaultValue={destination.price?.toString()}
//                       inputProps={{
//                         min: 1,
//                         step: "any",
//                         className:
//                           "w-full rounded-2xl [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
//                       }}
//                     />

//                     {/* Duration */}
//                     <Field
//                       name="duration"
//                       label="Duration"
//                       placeholder="7 Days / 6 Nights"
//                       defaultValue={destination.duration}
//                     />

//                     {/* Departure date */}
//                     <Field
//                       span
//                       name="departureDate"
//                       label="Departure date"
//                       type="date"
//                       defaultValue={destination.departureDate}
//                     />

//                     {/* Image URL */}
//                     <Field
//                       span
//                       name="imageUrl"
//                       label="Image URL"
//                       type="url"
//                       placeholder="https://example.com/bali-paradise.jpg"
//                       hint="Use a direct link to a landscape photo."
//                       defaultValue={destination.imageUrl}
//                     />

//                     {/* Description */}
//                     <motion.div variants={rise} className="md:col-span-2">
//                       <TextField
//                         name="description"
//                         isRequired
//                         validate={validators.description}
//                         defaultValue={destination.description}
//                         className="w-full"
//                       >
//                         <Label>Description</Label>
//                         <TextArea
//                           variant="secondary"
//                           rows={5}
//                           placeholder="Describe the travel experience..."
//                           className="w-full resize-y rounded-3xl"
//                         />
//                         <FieldError />
//                       </TextField>
//                     </motion.div>

//                     {/* Status message */}
//                     <AnimatePresence initial={false}>
//                       {(status === "success" || status === "error") && (
//                         <motion.div
//                           key={status}
//                           role={status === "error" ? "alert" : "status"}
//                           initial={{ opacity: 0, y: -8, scale: 0.98 }}
//                           animate={{ opacity: 1, y: 0, scale: 1 }}
//                           exit={{ opacity: 0, y: -8 }}
//                           className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm md:col-span-2 ${
//                             status === "success"
//                               ? "border-emerald-200 bg-emerald-50 text-emerald-800"
//                               : "border-red-200 bg-red-50 text-red-700"
//                           }`}
//                         >
//                           <span className="mt-0.5 shrink-0">
//                             {status === "success" ? (
//                               <CheckIcon />
//                             ) : (
//                               <AlertIcon />
//                             )}
//                           </span>
//                           <p>{message}</p>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>

//                     {/* Submit */}
//                     <motion.div variants={rise} className="md:col-span-2">
//                       <Button
//                         type="submit"
//                         variant="primary"
//                         isPending={isPending}
//                         className="w-full rounded-2xl bg-[#1a8fb0] py-6 text-base font-semibold text-white transition-colors hover:bg-[#136f89]"
//                       >
//                         {isPending ? <Spinner /> : <CheckIcon />}
//                         {isPending ? "Saving..." : "Save changes"}
//                       </Button>
//                     </motion.div>
//                   </motion.div>
//                 </Form>
//               </Surface>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button slot="close" variant="secondary">
//                 Cancel
//               </Button>
//             </Modal.Footer>
//           </Modal.Dialog>
//         </Modal.Container>
//       </Modal.Backdrop>
//     </Modal>
//   );
// }

"use client";

import {
  Button,
  Description,
  Form,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  TextArea,
  Select,
  ListBox,
  FieldError,
} from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import { AnimatePresence, motion } from "framer-motion";

import { BiEdit } from "react-icons/bi";

const CATEGORIES = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Luxury",
];

const validators = {
  destinationName: (v) =>
    v.trim().length >= 3 ? null : "Enter at least 3 characters",
  price: (v) => (Number(v) > 0 ? null : "Enter a price above 0"),
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
  defaultValue,
}) {
  return (
    <motion.div variants={rise} className={span ? "md:col-span-2" : ""}>
      <TextField
        name={name}
        type={type}
        isRequired
        validate={validators[name]}
        defaultValue={defaultValue}
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

export function EditModal({ destination }) {
  const router = useRouter();
  const { _id } = destination || {};
  const [status, setStatus] = useState("idle"); // idle | pending | success | error
  const [message, setMessage] = useState("");

  const isPending = status === "pending";

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // 1. Extract Admin Password from the form
    const adminPassword = formData.get("adminPassword");

    if (!adminPassword) {
      setStatus("error");
      setMessage("Please enter the admin password to save changes.");
      return;
    }

    const payload = {
      adminPassword, // <--- Send password to backend
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destinations/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || `Server responded with ${res.status}`,
        );
      }

      setStatus("success");
      setMessage(`"${payload.destinationName}" was updated successfully.`);
      router.refresh();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage(
        err.message || "We couldn't save this package. Check your connection.",
      );
    }
  }
  return (
    <Modal>
      <Button variant="outline" className=" sm:w-auto">
        <BiEdit /> Edit
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-2xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <BiEdit className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Edit Destination</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Update the details below and save your changes.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <Form onSubmit={onSubmit} className="p-6 sm:p-10">
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
                      defaultValue={destination.destinationName}
                    />

                    <Field
                      name="country"
                      label="Country"
                      placeholder="Indonesia"
                      defaultValue={destination.country}
                    />

                    <motion.div variants={rise}>
                      <Select
                        name="category"
                        isRequired
                        variant="secondary"
                        className="w-full"
                        placeholder="Select category"
                        defaultValue={destination.category}
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
                      defaultValue={destination.price?.toString()}
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
                      defaultValue={destination.duration}
                    />

                    <Field
                      span
                      name="departureDate"
                      label="Departure date"
                      type="date"
                      defaultValue={destination.departureDate}
                    />

                    <Field
                      span
                      name="imageUrl"
                      label="Image URL"
                      type="url"
                      placeholder="https://example.com/bali-paradise.jpg"
                      hint="Use a direct link to a landscape photo."
                      defaultValue={destination.imageUrl}
                    />

                    <motion.div variants={rise} className="md:col-span-2">
                      <TextField
                        name="description"
                        isRequired
                        validate={validators.description}
                        defaultValue={destination.description}
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

                    {/* ADMIN VERIFICATION SECTION */}
                    <motion.div
                      variants={rise}
                      className="md:col-span-2 p-4 rounded-2xl bg-slate-100 border border-slate-200"
                    >
                      <TextField
                        name="adminPassword"
                        isRequired
                        className="w-full"
                      >
                        <Label className="text-xs font-semibold text-slate-500">
                          Admin Password Required to Save
                        </Label>
                        <Input
                          type="password"
                          variant="secondary"
                          placeholder="Enter admin password"
                          className="w-full rounded-xl"
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
                            {status === "success" ? (
                              <CheckIcon />
                            ) : (
                              <AlertIcon />
                            )}
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
                        className="w-full rounded-2xl bg-[#1a8fb0] py-6 text-base font-semibold text-white transition-colors hover:bg-[#136f89]"
                      >
                        {isPending ? <Spinner /> : <CheckIcon />}
                        {isPending ? "Saving..." : "Save changes"}
                      </Button>
                    </motion.div>
                  </motion.div>
                </Form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
