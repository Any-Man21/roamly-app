// "use client";

// import { Button, Card, DateField, Description, toast } from "@heroui/react";
// import { AnimatePresence, MotionConfig, motion } from "framer-motion";
// import React, { useState } from "react";
// import { Calendar, ChevronDown } from "@gravity-ui/icons";
// import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";

// const MAX_TRAVELERS = 10;

// const money = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
//   maximumFractionDigits: 0,
// });

// // "2026-12-01" -> "Dec 1, 2026"
// function formatDate(iso) {
//   if (!iso) return "";
//   const [y, m, d] = iso.split("-").map(Number);
//   if (!y || !m || !d) return iso;
//   return new Date(y, m - 1, d).toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
// }

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

// const ClockIcon = () => (
//   <Icon>
//     <circle cx="12" cy="12" r="9" />
//     <path d="M12 7v5l3 2" />
//   </Icon>
// );
// const CalendarIcon = () => (
//   <Icon>
//     <rect x="3" y="5" width="18" height="16" rx="2" />
//     <path d="M16 3v4M8 3v4M3 11h18" />
//   </Icon>
// );
// const UsersIcon = () => (
//   <Icon>
//     <circle cx="9" cy="8" r="3.5" />
//     <path d="M2.5 20v-1a5.5 5.5 0 0 1 5.5-5.5h2A5.5 5.5 0 0 1 15.5 19v1" />
//     <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a5.5 5.5 0 0 1 3.5 5v1" />
//   </Icon>
// );
// const ArrowIcon = () => (
//   <Icon size={18}>
//     <path d="M5 12h14M13 6l6 6-6 6" />
//   </Icon>
// );
// const ShieldIcon = () => (
//   <Icon size={16}>
//     <path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6l-8-3Z" />
//     <path d="m9 12 2 2 4-4" />
//   </Icon>
// );

// function Row({ icon, label, children }) {
//   return (
//     <div className="flex items-center gap-3">
//       <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#1a8fb0]/10 text-[#1a8fb0]">
//         {icon}
//       </span>
//       <div className="min-w-0 flex-1">
//         <p className="text-xs text-slate-500">{label}</p>
//         <div className="truncate text-sm font-semibold text-slate-900">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// const stepBtn =
//   "grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-lg font-semibold text-slate-700 transition-colors hover:border-[#1a8fb0] hover:text-[#1a8fb0] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a8fb0]";

// const BookingCard = ({ destination, className = "" }) => {
//   const {
//     price,
//     duration,
//     departureDate,
//     category,
//     description,
//     destinationName,
//     _id,
//     imageUrl,
//     country,
//   } = destination;

//   // session
//   const { data: session } = authClient.useSession();
//   const user = session?.user;

//   const [travelers, setTravelers] = useState(1);
//   const [departureRequest, setDepartureRequest] = useState(null);

//   const unitPrice = Number(price) || 0;
//   const total = unitPrice * travelers;
//   const date = formatDate(departureDate);

//   // book
//   // const handleBooking = async () => {
//   //   if (!user) {
//   //     alert("Please log in to book this trip.");
//   //     return;
//   //   }

//   //   if (!departureRequest) {
//   //     alert("Please choose your preferred date.");
//   //     return;
//   //   }

//   //   const bookingData = {
//   //     userId: user.id,
//   //     userName: user.name,
//   //     destinationId: _id,
//   //     travelers: travelers,
//   //     departureRequest: departureRequest.toString(), // "2026-12-01"
//   //     category: category,
//   //     destinationName: destinationName,
//   //     description: description,
//   //     price: price,
//   //     duration: duration,
//   //     imageURL: imageUrl,
//   //     country: country,
//   //   };

//   //   // TODO: send bookingData to your backend booking route
//   //   console.log("Booking data:", bookingData);
//   // };

//   const router = useRouter();

//   const handleBooking = async () => {
//     if (!user) {
//       toast.warning("Please log in", {
//         description: "You need an account to book this trip.",
//       });
//       return;
//     }

//     if (!departureRequest) {
//       toast.warning("Choose a date", {
//         description: "Pick your preferred departure date first.",
//       });
//       return;
//     }

//     const bookingData = {
//       userId: user.id,
//       userName: user.name,
//       destinationId: _id,
//       travelers: travelers,
//       departureRequest: departureRequest.toString(), // "2026-12-01"
//       category: category,
//       destinationName: destinationName,
//       description: description,
//       price: price,
//       duration: duration,
//       imageURL: imageUrl,
//       country: country,
//     };

//     // jwt

//     const { data: tokenData } = await authClient.token();
//     console.log("Token data:", tokenData);

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `Bearer ${tokenData?.token}`,
//       },
//       body: JSON.stringify(bookingData),
//     });

//     const data = await res.json();
//     console.log("Response:", data);

//     // TODO: send bookingData to your backend booking route
//     console.log("Booking data:", bookingData);

//     toast.success("Booking confirmed ✈️", {
//       description: `${destinationName} · ${travelers} ${
//         travelers === 1 ? "traveler" : "travelers"
//       } · ${formatDate(bookingData.departureRequest)} · ${money.format(total)}`,
//     });
//     router.push("/my-bookings");
//     router.refresh();
//   };

//   return (
//     <MotionConfig reducedMotion="user">
//       <motion.div
//         initial={{ opacity: 0, y: 24 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ type: "spring", stiffness: 240, damping: 24 }}
//         className={`w-full ${className}`}
//       >
//         <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-0 shadow-2xl shadow-[#1a8fb0]/15">
//           {/* ---------- Header ---------- */}
//           <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#0f6a85] via-[#1a8fb0] to-sky-400 px-6 pb-8 pt-6 text-white">
//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute -right-10 -top-12 -z-10 h-40 w-40 rounded-full bg-white/20 blur-2xl"
//             />
//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute -bottom-16 -left-10 -z-10 h-40 w-40 rounded-full bg-sky-200/30 blur-2xl"
//             />

//             <motion.span
//               aria-hidden="true"
//               className="absolute right-5 top-5 text-3xl"
//               animate={{ y: [0, -8, 0], rotate: [-6, 6, -6] }}
//               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//             >
//               ✈️
//             </motion.span>

//             {category && (
//               <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
//                 {category}
//               </span>
//             )}

//             <p className="mt-4 text-sm font-medium text-white/80">
//               Starting from
//             </p>
//             <motion.p
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{
//                 type: "spring",
//                 stiffness: 300,
//                 damping: 20,
//                 delay: 0.15,
//               }}
//               className="text-5xl font-extrabold tracking-tight"
//             >
//               {unitPrice > 0 ? money.format(unitPrice) : "Free"}
//               <span className="ml-1.5 text-base font-medium text-white/80">
//                 / person
//               </span>
//             </motion.p>
//           </div>

//           {/* ---------- Body ---------- */}
//           <div className="-mt-4 flex flex-col gap-5 rounded-t-3xl bg-white p-6">
//             <div className="flex flex-col gap-4">
//               {duration && (
//                 <Row icon={<ClockIcon />} label="Duration">
//                   {duration}
//                 </Row>
//               )}
//               {date && (
//                 <Row icon={<CalendarIcon />} label="Departure">
//                   {date}
//                 </Row>
//               )}

//               <Row icon={<UsersIcon />} label="Travelers">
//                 <div className="flex items-center gap-3">
//                   <button
//                     type="button"
//                     onClick={() => setTravelers((n) => Math.max(1, n - 1))}
//                     disabled={travelers <= 1}
//                     aria-label="Remove a traveler"
//                     className={stepBtn}
//                   >
//                     −
//                   </button>
//                   <span
//                     aria-live="polite"
//                     className="min-w-6 text-center text-base font-bold tabular-nums"
//                   >
//                     {travelers}
//                   </span>
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setTravelers((n) => Math.min(MAX_TRAVELERS, n + 1))
//                     }
//                     disabled={travelers >= MAX_TRAVELERS}
//                     aria-label="Add a traveler"
//                     className={stepBtn}
//                   >
//                     +
//                   </button>
//                 </div>
//               </Row>
//             </div>

//             <DateField
//               onChange={setDepartureRequest}
//               className="w-full"
//               name="date"
//             >
//               <DateField.Group>
//                 <DateField.Prefix>
//                   <Calendar className="size-4 text-muted" />
//                 </DateField.Prefix>
//                 <DateField.Input>
//                   {(segment) => <DateField.Segment segment={segment} />}
//                 </DateField.Input>
//                 <DateField.Suffix>
//                   <ChevronDown className="size-4 text-muted" />
//                 </DateField.Suffix>
//               </DateField.Group>
//               <Description>Enter Preferred date</Description>
//             </DateField>

//             {/* Total */}
//             <div className="flex items-end justify-between rounded-2xl bg-slate-50 px-4 py-3">
//               <div>
//                 <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
//                   Total
//                 </p>

//                 <p className="text-xs text-slate-500">
//                   {travelers} ×{" "}
//                   {unitPrice > 0 ? money.format(unitPrice) : "Free"}
//                 </p>
//               </div>
//               <div className="overflow-hidden text-right">
//                 <AnimatePresence mode="popLayout" initial={false}>
//                   <motion.p
//                     key={total}
//                     initial={{ y: 16, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     exit={{ y: -16, opacity: 0 }}
//                     transition={{ type: "spring", stiffness: 380, damping: 28 }}
//                     className="text-3xl font-extrabold tracking-tight text-[#1a8fb0]"
//                   >
//                     {total > 0 ? money.format(total) : "Free"}
//                   </motion.p>
//                 </AnimatePresence>
//               </div>
//             </div>

//             {/* Book now */}
//             <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
//               <Button
//                 onPress={handleBooking}
//                 variant="primary"
//                 className="group w-full rounded-2xl bg-[#1a8fb0] py-7 text-base font-semibold text-white shadow-lg shadow-[#1a8fb0]/30 transition-colors hover:bg-[#136f89]"
//               >
//                 Book Now
//                 <span className="transition-transform duration-300 group-hover:translate-x-1">
//                   <ArrowIcon />
//                 </span>
//               </Button>
//             </motion.div>

//             <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
//               <ShieldIcon />
//               You won&apos;t be charged yet
//             </p>
//           </div>
//         </Card>
//       </motion.div>
//     </MotionConfig>
//   );
// };

// export default BookingCard;

"use client";

import { Button, Card, DateField, Description, toast } from "@heroui/react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import React, { useState } from "react";
import { Calendar, ChevronDown } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const MAX_TRAVELERS = 10;

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

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

const ClockIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Icon>
);
const CalendarIcon = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 11h18" />
  </Icon>
);
const UsersIcon = () => (
  <Icon>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20v-1a5.5 5.5 0 0 1 5.5-5.5h2A5.5 5.5 0 0 1 15.5 19v1" />
    <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a5.5 5.5 0 0 1 3.5 5v1" />
  </Icon>
);
const ArrowIcon = () => (
  <Icon size={18}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);
const ShieldIcon = () => (
  <Icon size={16}>
    <path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

function Row({ icon, label, children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#1a8fb0]/10 text-[#1a8fb0]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500">{label}</p>
        <div className="truncate text-sm font-semibold text-slate-900">
          {children}
        </div>
      </div>
    </div>
  );
}

const stepBtn =
  "grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-lg font-semibold text-slate-700 transition-colors hover:border-[#1a8fb0] hover:text-[#1a8fb0] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a8fb0]";

const BookingCard = ({ destination, className = "" }) => {
  const {
    price,
    duration,
    departureDate,
    category,
    description,
    destinationName,
    _id,
    imageUrl,
    country,
  } = destination;

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [travelers, setTravelers] = useState(1);
  const [departureRequest, setDepartureRequest] = useState(null);

  const unitPrice = Number(price) || 0;
  const total = unitPrice * travelers;
  const date = formatDate(departureDate);

  const handleBooking = async () => {
    // 1. Auth Check
    if (!user) {
      toast.warning("Authentication Required", {
        description: "Please log in to book this trip.",
      });
      setTimeout(() => router.push("/login"), 1500);
      return;
    }

    // 2. Date existence check
    if (!departureRequest) {
      toast.warning("Choose a date", {
        description: "Pick your preferred departure date first.",
      });
      return;
    }

    // 3. Date range validation using timestamps
    const startDate = new Date(departureDate).getTime();
    const requestedDate = new Date(departureRequest).getTime();

    if (isNaN(startDate) || isNaN(requestedDate)) {
      toast.warning("Invalid Date", {
        description: "The selected date is not valid.",
      });
      return;
    }

    const maxDateObj = new Date(departureDate);
    maxDateObj.setMonth(maxDateObj.getMonth() + 3);
    const maxDateTimestamp = maxDateObj.getTime();

    if (requestedDate < startDate || requestedDate > maxDateTimestamp) {
      // FIXED: Changed toast.error to toast.warning to prevent Runtime TypeError
      toast.warning("Date Unavailable", {
        description: `This trip is only available from ${formatDate(departureDate)} up to 3 months after.`,
      });
      return;
    }

    // 4. API Call
    const bookingData = {
      userId: user.id,
      userName: user.name,
      destinationId: _id,
      travelers: travelers,
      departureRequest: departureRequest.toString(),
      category: category,
      destinationName: destinationName,
      description: description,
      price: price,
      duration: duration,
      imageURL: imageUrl,
      country: country,
    };

    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) throw new Error("Server error");

      toast.success("Booking confirmed ✈️", {
        description: `${destinationName} · ${travelers} ${travelers === 1 ? "traveler" : "travelers"} · ${formatDate(bookingData.departureRequest)} · ${money.format(total)}`,
      });
      router.push("/my-bookings");
      router.refresh();
    } catch (error) {
      toast.warning("Booking failed", {
        description: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        className={`w-full ${className}`}
      >
        <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-0 shadow-2xl shadow-[#1a8fb0]/15">
          <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#0f6a85] via-[#1a8fb0] to-sky-400 px-6 pb-8 pt-6 text-white">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-12 -z-10 h-40 w-40 rounded-full bg-white/20 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 -left-10 -z-10 h-40 w-40 rounded-full bg-sky-200/30 blur-2xl"
            />
            <motion.span
              aria-hidden="true"
              className="absolute right-5 top-5 text-3xl"
              animate={{ y: [0, -8, 0], rotate: [-6, 6, -6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              ✈️
            </motion.span>
            {category && (
              <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                {category}
              </span>
            )}
            <p className="mt-4 text-sm font-medium text-white/80">
              Starting from
            </p>
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.15,
              }}
              className="text-5xl font-extrabold tracking-tight"
            >
              {unitPrice > 0 ? money.format(unitPrice) : "Free"}
              <span className="ml-1.5 text-base font-medium text-white/80">
                / person
              </span>
            </motion.p>
          </div>

          <div className="-mt-4 flex flex-col gap-5 rounded-t-3xl bg-white p-6">
            <div className="flex flex-col gap-4">
              {duration && (
                <Row icon={<ClockIcon />} label="Duration">
                  {duration}
                </Row>
              )}
              {date && (
                <Row icon={<CalendarIcon />} label="Departure">
                  {date}
                </Row>
              )}
              <Row icon={<UsersIcon />} label="Travelers">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTravelers((n) => Math.max(1, n - 1))}
                    disabled={travelers <= 1}
                    className={stepBtn}
                  >
                    −
                  </button>
                  <span className="min-w-6 text-center text-base font-bold tabular-nums">
                    {travelers}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setTravelers((n) => Math.min(MAX_TRAVELERS, n + 1))
                    }
                    disabled={travelers >= MAX_TRAVELERS}
                    className={stepBtn}
                  >
                    +
                  </button>
                </div>
              </Row>
            </div>

            <DateField
              onChange={setDepartureRequest}
              className="w-full"
              name="date"
            >
              <DateField.Group>
                <DateField.Prefix>
                  <Calendar className="size-4 text-muted" />
                </DateField.Prefix>
                <DateField.Input>
                  {(segment) => <DateField.Segment segment={segment} />}
                </DateField.Input>
                <DateField.Suffix>
                  <ChevronDown className="size-4 text-muted" />
                </DateField.Suffix>
              </DateField.Group>
              <Description>Enter Preferred date</Description>
            </DateField>

            <div className="flex items-end justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Total
                </p>
                <p className="text-xs text-slate-500">
                  {travelers} ×{" "}
                  {unitPrice > 0 ? money.format(unitPrice) : "Free"}
                </p>
              </div>
              <div className="overflow-hidden text-right">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={total}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    className="text-3xl font-extrabold tracking-tight text-[#1a8fb0]"
                  >
                    {total > 0 ? money.format(total) : "Free"}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button
                onPress={handleBooking}
                variant="primary"
                className="group w-full rounded-2xl bg-[#1a8fb0] py-7 text-base font-semibold text-white shadow-lg shadow-[#1a8fb0]/30 transition-colors hover:bg-[#136f89]"
              >
                Book Now{" "}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </Button>
            </motion.div>

            <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <ShieldIcon /> You won&apos;t be charged yet
            </p>
          </div>
        </Card>
      </motion.div>
    </MotionConfig>
  );
};

export default BookingCard;
