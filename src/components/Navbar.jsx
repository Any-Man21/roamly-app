// // "use client";

// // import { useEffect, useRef, useState } from "react";
// // import { logoFont } from "@/lib/font";
// // import Link from "next/link";
// // import { usePathname } from "next/navigation";
// // import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
// // import { authClient } from "@/lib/auth-client";
// // import { Avatar, Button } from "@heroui/react";

// // const NAV_LINKS = [
// //   { href: "/", label: "Home" },
// //   { href: "/destinations", label: "Destinations" },
// //   { href: "/my-bookings", label: "My Bookings" },
// //   { href: "/admin", label: "Admin" },
// //   { href: "/add-destination-form", label: "Add Destination" },
// // ];

// // // Shared class strings
// // const focusRing =
// //   "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a8fb0] rounded";
// // const topLink = `inline-flex items-center gap-1.5 py-1 text-[15px] font-medium text-[#14181c] transition-colors hover:text-[#1a8fb0] ${focusRing}`;
// // const iconBtn = `inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#14181c] hover:bg-slate-100 ${focusRing}`;

// // function UserIcon({ size = 16 }) {
// //   return (
// //     <svg
// //       width={size}
// //       height={size}
// //       viewBox="0 0 24 24"
// //       fill="none"
// //       stroke="currentColor"
// //       strokeWidth="2"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //       aria-hidden="true"
// //     >
// //       <circle cx="12" cy="8" r="4" />
// //       <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
// //     </svg>
// //   );
// // }

// // function PlaneIcon() {
// //   return (
// //     <svg
// //       width="20"
// //       height="20"
// //       viewBox="0 0 24 24"
// //       fill="currentColor"
// //       stroke="currentColor"
// //       strokeWidth="1"
// //       strokeLinejoin="round"
// //       aria-hidden="true"
// //       style={{ transform: "rotate(45deg)" }}
// //     >
// //       <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
// //     </svg>
// //   );
// // }

// // // Animation variants
// // const listVariants = {
// //   hidden: {},
// //   show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
// // };

// // const itemVariants = {
// //   hidden: { opacity: 0, x: -24 },
// //   show: {
// //     opacity: 1,
// //     x: 0,
// //     transition: { type: "spring", stiffness: 320, damping: 28 },
// //   },
// // };

// // export default function Navbar() {
// //   const { data: session } = authClient.useSession();

// //   const user = session?.user;

// //   const pathname = usePathname();
// //   const [open, setOpen] = useState(false);
// //   const closeBtnRef = useRef(null);
// //   const menuBtnRef = useRef(null);
// //   const reduceMotion = useReducedMotion();

// //   const isActive = (href) =>
// //     href === "/" ? pathname === "/" : pathname.startsWith(href);

// //   // Close the drawer on route change
// //   useEffect(() => {
// //     setOpen(false);
// //   }, [pathname]);

// //   // Escape to close, lock body scroll, manage focus, close when resized to desktop
// //   useEffect(() => {
// //     if (!open) return;

// //     const onKey = (e) => e.key === "Escape" && setOpen(false);
// //     document.addEventListener("keydown", onKey);

// //     const previousOverflow = document.body.style.overflow;
// //     document.body.style.overflow = "hidden";
// //     closeBtnRef.current?.focus();

// //     const mq = window.matchMedia("(min-width: 1024px)");
// //     const onChange = (e) => e.matches && setOpen(false);
// //     mq.addEventListener("change", onChange);

// //     const menuBtn = menuBtnRef.current;
// //     return () => {
// //       document.removeEventListener("keydown", onKey);
// //       mq.removeEventListener("change", onChange);
// //       document.body.style.overflow = previousOverflow;
// //       menuBtn?.focus();
// //     };
// //   }, [open]);

// //   // With reduced motion enabled, skip movement and just show/hide
// //   const panelTransition = reduceMotion
// //     ? { duration: 0 }
// //     : { type: "spring", stiffness: 260, damping: 30, mass: 0.9 };

// //   return (
// //     <header className="sticky top-0 z-50 border-b border-slate-200 bg-white text-[#14181c]">
// //       <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-3 lg:px-6">
// //         {/* LEFT: desktop links / mobile hamburger */}
// //         <div className="flex items-center justify-start">
// //           <nav className="hidden lg:block" aria-label="Main">
// //             <ul className="flex gap-8">
// //               {NAV_LINKS.map(({ href, label }) => (
// //                 <li key={href}>
// //                   <Link
// //                     href={href}
// //                     aria-current={isActive(href) ? "page" : undefined}
// //                     className={`${topLink} ${
// //                       isActive(href)
// //                         ? "!text-[#1a8fb0] underline decoration-[1.5px] underline-offset-[6px]"
// //                         : ""
// //                     }`}
// //                   >
// //                     {label}
// //                   </Link>
// //                 </li>
// //               ))}
// //             </ul>
// //           </nav>

// //           <button
// //             ref={menuBtnRef}
// //             type="button"
// //             onClick={() => setOpen(true)}
// //             aria-label="Open menu"
// //             aria-expanded={open}
// //             aria-controls="mobile-drawer"
// //             className={`${iconBtn} lg:hidden`}
// //           >
// //             <svg
// //               width="24"
// //               height="24"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="currentColor"
// //               strokeWidth="2"
// //               strokeLinecap="round"
// //               aria-hidden="true"
// //             >
// //               <path d="M4 7h16M4 12h16M4 17h16" />
// //             </svg>
// //           </button>
// //         </div>

// //         {/* CENTER: logo */}
// //         <Link
// //           href="/"
// //           aria-label="Roamly home"
// //           className={`${logoFont.className} text-[26px] font-extrabold leading-none tracking-tight text-[#1a8fb0] lg:text-[28px] ${focusRing}`}
// //         >
// //           Roamly
// //         </Link>

// //         {/* RIGHT: desktop actions / mobile profile icon */}
// //         <div className="flex items-center justify-end">
// //           <div className="hidden items-center gap-7 lg:flex">
// //             <Link href="/profile" className={topLink}>
// //               <UserIcon />
// //               Profile
// //             </Link>
// //             {user ? (
// //               <>
// //                 <li>
// //                   <Avatar>
// //                     <Avatar.Image
// //                       alt="John Doe"
// //                       src={user?.image || "/default-avatar.png"}
// //                     />
// //                     <Avatar.Fallback>JD</Avatar.Fallback>
// //                   </Avatar>
// //                 </li>
// //                 <li>
// //                   <Button>Logout</Button>
// //                 </li>
// //               </>
// //             ) : (
// //               <>
// //                 <Link href="/login" className={topLink}>
// //                   Login
// //                 </Link>
// //                 <Link href="/signup" className={topLink}>
// //                   Sign Up
// //                 </Link>
// //               </>
// //             )}
// //           </div>

// //           <Link
// //             href="/profile"
// //             aria-label="Profile"
// //             className={`${iconBtn} lg:hidden`}
// //           >
// //             <UserIcon size={20} />
// //           </Link>
// //         </div>
// //       </div>

// //       <AnimatePresence>
// //         {open && (
// //           <>
// //             {/* DRAWER OVERLAY */}
// //             <motion.div
// //               key="overlay"
// //               onClick={() => setOpen(false)}
// //               aria-hidden="true"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               transition={{ duration: reduceMotion ? 0 : 0.3 }}
// //               className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-[2px] lg:hidden"
// //             />

// //             {/* DRAWER */}
// //             <motion.aside
// //               key="drawer"
// //               id="mobile-drawer"
// //               role="dialog"
// //               aria-modal="true"
// //               aria-label="Menu"
// //               initial={{ x: "-100%" }}
// //               animate={{ x: 0 }}
// //               exit={{ x: "-100%" }}
// //               transition={panelTransition}
// //               className="fixed bottom-0 left-0 top-0 z-[70] flex w-[min(320px,85vw)] flex-col overflow-hidden bg-white shadow-2xl lg:hidden"
// //             >
// //               <div className="relative flex h-16 items-center justify-between border-b border-slate-200 pl-6 pr-4">
// //                 <Link
// //                   href="/"
// //                   className={` ${logoFont.className} text-[26px] font-extrabold leading-none tracking-tight text-[#1a8fb0] ${focusRing}`}
// //                 >
// //                   Roamly
// //                 </Link>
// //                 <button
// //                   ref={closeBtnRef}
// //                   type="button"
// //                   onClick={() => setOpen(false)}
// //                   aria-label="Close menu"
// //                   className={iconBtn}
// //                 >
// //                   <svg
// //                     width="22"
// //                     height="22"
// //                     viewBox="0 0 24 24"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     strokeWidth="2"
// //                     strokeLinecap="round"
// //                     aria-hidden="true"
// //                   >
// //                     <path d="M6 6l12 12M18 6L6 18" />
// //                   </svg>
// //                 </button>

// //                 {/* Plane gliding along the header divider when the drawer opens */}
// //                 {!reduceMotion && (
// //                   <motion.span
// //                     aria-hidden="true"
// //                     className="pointer-events-none absolute -bottom-2.5 left-0 text-[#1a8fb0]"
// //                     initial={{ x: -30, y: 6, opacity: 0 }}
// //                     animate={{
// //                       x: 360,
// //                       y: [6, -4, 2, -2],
// //                       opacity: [0, 1, 1, 0],
// //                     }}
// //                     transition={{
// //                       duration: 1.3,
// //                       delay: 0.25,
// //                       ease: "easeInOut",
// //                     }}
// //                   >
// //                     <PlaneIcon />
// //                   </motion.span>
// //                 )}
// //               </div>

// //               <nav aria-label="Mobile" className="py-3">
// //                 <motion.ul
// //                   variants={listVariants}
// //                   initial={reduceMotion ? "show" : "hidden"}
// //                   animate="show"
// //                 >
// //                   {NAV_LINKS.map(({ href, label }) => (
// //                     <motion.li
// //                       key={href}
// //                       variants={reduceMotion ? undefined : itemVariants}
// //                     >
// //                       <Link
// //                         href={href}
// //                         aria-current={isActive(href) ? "page" : undefined}
// //                         className={`block px-6 py-3.5 text-[17px] font-medium hover:bg-sky-50 ${
// //                           isActive(href)
// //                             ? "bg-sky-50 text-[#1a8fb0] shadow-[inset_3px_0_0_#1a8fb0]"
// //                             : "text-[#14181c]"
// //                         }`}
// //                       >
// //                         {label}
// //                       </Link>
// //                     </motion.li>
// //                   ))}
// //                 </motion.ul>
// //               </nav>

// //               <motion.div
// //                 className="mt-auto border-t border-slate-200 pb-6 pt-3"
// //                 initial={reduceMotion ? false : { opacity: 0, y: 24 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{
// //                   delay: reduceMotion ? 0 : 0.5,
// //                   type: "spring",
// //                   stiffness: 260,
// //                   damping: 26,
// //                 }}
// //               >
// //                 <Link
// //                   href="/profile"
// //                   className="flex items-center gap-2 px-6 py-3.5 text-[17px] font-medium text-[#14181c] hover:bg-sky-50"
// //                 >
// //                   <UserIcon size={18} />
// //                   Profile
// //                 </Link>
// //                 <div className="flex gap-3 px-6 pt-3">
// //                   <Link
// //                     href="/login"
// //                     className="flex-1 rounded-lg border-[1.5px] border-[#1a8fb0] py-2.5 text-center text-[15px] font-semibold text-[#1a8fb0] hover:bg-sky-50"
// //                   >
// //                     Login
// //                   </Link>
// //                   <Link
// //                     href="/signup"
// //                     className="flex-1 rounded-lg border-[1.5px] border-[#1a8fb0] bg-[#1a8fb0] py-2.5 text-center text-[15px] font-semibold text-white hover:border-[#136f89] hover:bg-[#136f89]"
// //                   >
// //                     Sign Up
// //                   </Link>
// //                 </div>
// //               </motion.div>
// //             </motion.aside>
// //           </>
// //         )}
// //       </AnimatePresence>
// //     </header>
// //   );
// // }

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { logoFont } from "@/lib/font";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
// import { authClient } from "@/lib/auth-client";
// import { Avatar, Button } from "@heroui/react";
// import { useRouter } from "next/navigation";

// const NAV_LINKS = [
//   { href: "/", label: "Home" },
//   { href: "/destinations", label: "Destinations" },
//   { href: "/my-bookings", label: "My Bookings" },
//   { href: "/admin", label: "Admin" },
//   { href: "/add-destination-form", label: "Add Destination" },
// ];

// // Shared class strings
// const focusOutline =
//   "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a8fb0]";
// const focusRing = `${focusOutline} rounded`;
// const topLink = `inline-flex items-center gap-1.5 py-1 text-[15px] font-medium text-[#14181c] transition-colors hover:text-[#1a8fb0] ${focusRing}`;
// const iconBtn = `inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#14181c] hover:bg-slate-100 ${focusRing}`;
// const logoutBtn =
//   "h-10 rounded-lg border-[1.5px] border-[#1a8fb0] bg-transparent px-5 text-[15px] font-semibold text-[#1a8fb0] hover:bg-sky-50";

// function UserIcon({ size = 16 }) {
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
//       <circle cx="12" cy="8" r="4" />
//       <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
//     </svg>
//   );
// }

// function PlaneIcon() {
//   return (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//       stroke="currentColor"
//       strokeWidth="1"
//       strokeLinejoin="round"
//       aria-hidden="true"
//       style={{ transform: "rotate(45deg)" }}
//     >
//       <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
//     </svg>
//   );
// }

// // The user's profile photo (falls back to initials if there is no image)
// function ProfileAvatar({ user }) {
//   const initials = (user.name || user.email || "U")
//     .trim()
//     .split(/\s+/)
//     .map((word) => word[0])
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();

//   return (
//     <Avatar className="h-10 w-10 ring-2 ring-[#1a8fb0]/30">
//       <Avatar.Image
//         alt={user.name || "Profile"}
//         src={user.image || undefined}
//       />
//       <Avatar.Fallback>{initials}</Avatar.Fallback>
//     </Avatar>
//   );
// }

// // The avatar "lands" like a plane, and a small plane swoops past once
// function FlyIn({ children, className = "" }) {
//   const reduceMotion = useReducedMotion();

//   if (reduceMotion) return <div className={className}>{children}</div>;

//   return (
//     <motion.div
//       className={`relative ${className}`}
//       initial={{ x: -90, y: 18, rotate: -18, opacity: 0, scale: 0.6 }}
//       animate={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
//       transition={{ type: "spring", stiffness: 140, damping: 14, mass: 0.9 }}
//       whileHover={{ y: -2, rotate: -6 }}
//     >
//       {children}
//       <motion.span
//         aria-hidden="true"
//         className="pointer-events-none absolute left-0 top-0 text-[#1a8fb0]"
//         initial={{ x: -60, y: 14, opacity: 0 }}
//         animate={{ x: [-60, -20, 10], y: [14, -4, -12], opacity: [0, 1, 0] }}
//         transition={{ duration: 1.1, delay: 0.1, ease: "easeOut" }}
//       >
//         <PlaneIcon />
//       </motion.span>
//     </motion.div>
//   );
// }

// // Animation variants
// const listVariants = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
// };

// const itemVariants = {
//   hidden: { opacity: 0, x: -24 },
//   show: {
//     opacity: 1,
//     x: 0,
//     transition: { type: "spring", stiffness: 320, damping: 28 },
//   },
// };

// export default function Navbar() {
//   const router = useRouter();
//   const { data: session, isPending } = authClient.useSession();

//   // signed in user object (or null if not signed in)

//   const user = session?.user;

//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);
//   const closeBtnRef = useRef(null);
//   const menuBtnRef = useRef(null);
//   const reduceMotion = useReducedMotion();

//   // sign out logic

//   const handleSignOut = async () => {
//     const { data, error } = await authClient.signOut();

//     if (error) {
//       console.error("Log out error:", error);
//       alert(`Log out failed: ${error.message || error.statusText}`);
//       return;
//     }
//     alert("Log out successful!");
//     setOpen(false);
//     router.push("/");
//     router.refresh();
//   };

//   const isActive = (href) =>
//     href === "/" ? pathname === "/" : pathname.startsWith(href);

//   // Close the drawer on route change
//   useEffect(() => {
//     setOpen(false);
//   }, [pathname]);

//   // Escape to close, lock body scroll, manage focus, close when resized to desktop
//   useEffect(() => {
//     if (!open) return;

//     const onKey = (e) => e.key === "Escape" && setOpen(false);
//     document.addEventListener("keydown", onKey);

//     const previousOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     closeBtnRef.current?.focus();

//     const mq = window.matchMedia("(min-width: 1024px)");
//     const onChange = (e) => e.matches && setOpen(false);
//     mq.addEventListener("change", onChange);

//     const menuBtn = menuBtnRef.current;
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       mq.removeEventListener("change", onChange);
//       document.body.style.overflow = previousOverflow;
//       menuBtn?.focus();
//     };
//   }, [open]);

//   // With reduced motion enabled, skip movement and just show/hide
//   const panelTransition = reduceMotion
//     ? { duration: 0 }
//     : { type: "spring", stiffness: 260, damping: 30, mass: 0.9 };

//   return (
//     <header className="sticky top-0 z-50 border-b border-slate-200 bg-white text-[#14181c]">
//       <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-3 lg:px-6">
//         {/* LEFT: desktop links / mobile hamburger */}
//         <div className="flex items-center justify-start">
//           <nav className="hidden lg:block" aria-label="Main">
//             <ul className="flex gap-8">
//               {NAV_LINKS.map(({ href, label }) => (
//                 <li key={href}>
//                   <Link
//                     href={href}
//                     aria-current={isActive(href) ? "page" : undefined}
//                     className={`${topLink} ${
//                       isActive(href)
//                         ? "!text-[#1a8fb0] underline decoration-[1.5px] underline-offset-[6px]"
//                         : ""
//                     }`}
//                   >
//                     {label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           <button
//             ref={menuBtnRef}
//             type="button"
//             onClick={() => setOpen(true)}
//             aria-label="Open menu"
//             aria-expanded={open}
//             aria-controls="mobile-drawer"
//             className={`${iconBtn} lg:hidden`}
//           >
//             <svg
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               aria-hidden="true"
//             >
//               <path d="M4 7h16M4 12h16M4 17h16" />
//             </svg>
//           </button>
//         </div>

//         {/* CENTER: logo */}
//         <Link
//           href="/"
//           aria-label="Roamly home"
//           className={`${logoFont.className} text-[26px] font-extrabold leading-none tracking-tight text-[#1a8fb0] lg:text-[28px] ${focusRing}`}
//         >
//           Roamly
//         </Link>

//         {/* RIGHT: desktop actions / mobile profile */}
//         <div className="flex items-center justify-end">
//           {/* Desktop */}
//           <div className="hidden items-center gap-7 lg:flex">
//             {isPending ? (
//               <div
//                 aria-hidden="true"
//                 className="h-10 w-32 animate-pulse rounded-full bg-slate-100"
//               />
//             ) : user ? (
//               <div className="flex items-center gap-4">
//                 <FlyIn>
//                   <Link
//                     href="/profile"
//                     aria-label="Profile"
//                     className={`block rounded-full transition-shadow hover:shadow-md hover:shadow-[#1a8fb0]/30 ${focusOutline}`}
//                   >
//                     <ProfileAvatar user={user} />
//                   </Link>
//                 </FlyIn>
//                 {/* TODO: logout logic */}
//                 <Button
//                   variant="outline"
//                   className={logoutBtn}
//                   onClick={handleSignOut}
//                 >
//                   Logout
//                 </Button>
//               </div>
//             ) : (
//               <>
//                 <Link href="/profile" className={topLink}>
//                   <UserIcon />
//                   Profile
//                 </Link>
//                 <Link href="/login" className={topLink}>
//                   Login
//                 </Link>
//                 <Link href="/signup" className={topLink}>
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile and small tablets */}
//           {isPending ? (
//             <div
//               aria-hidden="true"
//               className="h-10 w-10 animate-pulse rounded-full bg-slate-100 lg:hidden"
//             />
//           ) : user ? (
//             <FlyIn className="lg:hidden">
//               <Link
//                 href="/profile"
//                 aria-label="Profile"
//                 className={`block rounded-full ${focusOutline}`}
//               >
//                 <ProfileAvatar user={user} />
//               </Link>
//             </FlyIn>
//           ) : (
//             <Link
//               href="/profile"
//               aria-label="Profile"
//               className={`${iconBtn} lg:hidden`}
//             >
//               <UserIcon size={20} />
//             </Link>
//           )}
//         </div>
//       </div>

//       <AnimatePresence>
//         {open && (
//           <>
//             {/* DRAWER OVERLAY */}
//             <motion.div
//               key="overlay"
//               onClick={() => setOpen(false)}
//               aria-hidden="true"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: reduceMotion ? 0 : 0.3 }}
//               className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-[2px] lg:hidden"
//             />

//             {/* DRAWER */}
//             <motion.aside
//               key="drawer"
//               id="mobile-drawer"
//               role="dialog"
//               aria-modal="true"
//               aria-label="Menu"
//               initial={{ x: "-100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "-100%" }}
//               transition={panelTransition}
//               className="fixed bottom-0 left-0 top-0 z-[70] flex w-[min(320px,85vw)] flex-col overflow-hidden bg-white shadow-2xl lg:hidden"
//             >
//               <div className="relative flex h-16 items-center justify-between border-b border-slate-200 pl-6 pr-4">
//                 <Link
//                   href="/"
//                   className={` ${logoFont.className} text-[26px] font-extrabold leading-none tracking-tight text-[#1a8fb0] ${focusRing}`}
//                 >
//                   Roamly
//                 </Link>
//                 <button
//                   ref={closeBtnRef}
//                   type="button"
//                   onClick={() => setOpen(false)}
//                   aria-label="Close menu"
//                   className={iconBtn}
//                 >
//                   <svg
//                     width="22"
//                     height="22"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     aria-hidden="true"
//                   >
//                     <path d="M6 6l12 12M18 6L6 18" />
//                   </svg>
//                 </button>

//                 {/* Plane gliding along the header divider when the drawer opens */}
//                 {!reduceMotion && (
//                   <motion.span
//                     aria-hidden="true"
//                     className="pointer-events-none absolute -bottom-2.5 left-0 text-[#1a8fb0]"
//                     initial={{ x: -30, y: 6, opacity: 0 }}
//                     animate={{
//                       x: 360,
//                       y: [6, -4, 2, -2],
//                       opacity: [0, 1, 1, 0],
//                     }}
//                     transition={{
//                       duration: 1.3,
//                       delay: 0.25,
//                       ease: "easeInOut",
//                     }}
//                   >
//                     <PlaneIcon />
//                   </motion.span>
//                 )}
//               </div>

//               <nav aria-label="Mobile" className="py-3">
//                 <motion.ul
//                   variants={listVariants}
//                   initial={reduceMotion ? "show" : "hidden"}
//                   animate="show"
//                 >
//                   {NAV_LINKS.map(({ href, label }) => (
//                     <motion.li
//                       key={href}
//                       variants={reduceMotion ? undefined : itemVariants}
//                     >
//                       <Link
//                         href={href}
//                         aria-current={isActive(href) ? "page" : undefined}
//                         className={`block px-6 py-3.5 text-[17px] font-medium hover:bg-sky-50 ${
//                           isActive(href)
//                             ? "bg-sky-50 text-[#1a8fb0] shadow-[inset_3px_0_0_#1a8fb0]"
//                             : "text-[#14181c]"
//                         }`}
//                       >
//                         {label}
//                       </Link>
//                     </motion.li>
//                   ))}
//                 </motion.ul>
//               </nav>

//               <motion.div
//                 className="mt-auto border-t border-slate-200 pb-6 pt-3"
//                 initial={reduceMotion ? false : { opacity: 0, y: 24 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{
//                   delay: reduceMotion ? 0 : 0.5,
//                   type: "spring",
//                   stiffness: 260,
//                   damping: 26,
//                 }}
//               >
//                 {user ? (
//                   <>
//                     <Link
//                       href="/profile"
//                       className="flex items-center gap-3 px-6 py-3 hover:bg-sky-50"
//                     >
//                       <ProfileAvatar user={user} />
//                       <span className="min-w-0">
//                         <span className="block truncate text-[17px] font-medium text-[#14181c]">
//                           {user.name || "My profile"}
//                         </span>
//                         <span className="block truncate text-sm text-slate-500">
//                           {user.email}
//                         </span>
//                       </span>
//                     </Link>
//                     <div className="px-6 pt-3">
//                       {/* TODO: logout logic */}
//                       <Button
//                         variant="outline"
//                         className={`${logoutBtn} w-full`}
//                         onClick={handleSignOut}
//                       >
//                         Logout
//                       </Button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <Link
//                       href="/profile"
//                       className="flex items-center gap-2 px-6 py-3.5 text-[17px] font-medium text-[#14181c] hover:bg-sky-50"
//                     >
//                       <UserIcon size={18} />
//                       Profile
//                     </Link>
//                     <div className="flex gap-3 px-6 pt-3">
//                       <Link
//                         href="/login"
//                         className="flex-1 rounded-lg border-[1.5px] border-[#1a8fb0] py-2.5 text-center text-[15px] font-semibold text-[#1a8fb0] hover:bg-sky-50"
//                       >
//                         Login
//                       </Link>
//                       <Link
//                         href="/signup"
//                         className="flex-1 rounded-lg border-[1.5px] border-[#1a8fb0] bg-[#1a8fb0] py-2.5 text-center text-[15px] font-semibold text-white hover:border-[#136f89] hover:bg-[#136f89]"
//                       >
//                         Sign Up
//                       </Link>
//                     </div>
//                   </>
//                 )}
//               </motion.div>
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { logoFont } from "@/lib/font";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/admin", label: "Admin" },
  { href: "/add-destination-form", label: "Add Destination" },
];

// Shared class strings
const focusOutline =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a8fb0]";
const focusRing = `${focusOutline} rounded`;
const topLink = `inline-flex items-center gap-1.5 py-1 text-[15px] font-medium text-[#14181c] transition-colors hover:text-[#1a8fb0] ${focusRing}`;
const iconBtn = `inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#14181c] hover:bg-slate-100 ${focusRing}`;
const logoutBtn =
  "h-10 rounded-lg border-[1.5px] border-[#1a8fb0] bg-transparent px-5 text-[15px] font-semibold text-[#1a8fb0] hover:bg-sky-50";

function UserIcon({ size = 16 }) {
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
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ transform: "rotate(45deg)" }}
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function ProfileAvatar({ user }) {
  const initials = (user.name || user.email || "U")
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Avatar className="h-10 w-10 ring-2 ring-[#1a8fb0]/30">
      <Avatar.Image
        alt={user.name || "Profile"}
        src={user.image || undefined}
      />
      <Avatar.Fallback>{initials}</Avatar.Fallback>
    </Avatar>
  );
}

function FlyIn({ children, className = "" }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ x: -90, y: 18, rotate: -18, opacity: 0, scale: 0.6 }}
      animate={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 140, damping: 14, mass: 0.9 }}
      whileHover={{ y: -2, rotate: -6 }}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 text-[#1a8fb0]"
        initial={{ x: -60, y: 14, opacity: 0 }}
        animate={{ x: [-60, -20, 10], y: [14, -4, -12], opacity: [0, 1, 0] }}
        transition={{ duration: 1.1, delay: 0.1, ease: "easeOut" }}
      >
        <PlaneIcon />
      </motion.span>
    </motion.div>
  );
}

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 320, damping: 28 },
  },
};

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef(null);
  const menuBtnRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      alert(`Log out failed: ${error.message || error.statusText}`);
      return;
    }
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    const menuBtn = menuBtnRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
      document.body.style.overflow = previousOverflow;
      menuBtn?.focus();
    };
  }, [open]);

  const panelTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 260, damping: 30, mass: 0.9 };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white text-[#14181c]">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-3 lg:px-6">
        {/* LEFT: Desktop Links / Mobile Hamburger */}
        <div className="flex items-center justify-start">
          <nav className="hidden lg:block" aria-label="Main">
            <ul className="flex gap-8">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={`${topLink} ${
                      isActive(href)
                        ? "!text-[#1a8fb0] underline decoration-[1.5px] underline-offset-[6px]"
                        : ""
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={menuBtnRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            className={`${iconBtn} lg:hidden`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>

        {/* CENTER: Logo */}
        <Link
          href="/"
          aria-label="Roamly home"
          className={`${logoFont.className} text-[26px] font-extrabold leading-none tracking-tight text-[#1a8fb0] lg:text-[28px] ${focusRing}`}
        >
          Roamly
        </Link>

        {/* RIGHT: Actions */}
        <div className="flex items-center justify-end">
          {/* Desktop View */}
          <div className="hidden items-center gap-7 lg:flex">
            {isPending ? (
              <div
                aria-hidden="true"
                className="h-10 w-32 animate-pulse rounded-full bg-slate-100"
              />
            ) : user ? (
              <div className="flex items-center gap-4">
                <FlyIn>
                  <Link
                    href="/profile"
                    aria-label="Profile"
                    className={`block rounded-full transition-shadow hover:shadow-md hover:shadow-[#1a8fb0]/30 ${focusOutline}`}
                  >
                    <ProfileAvatar user={user} />
                  </Link>
                </FlyIn>
                <Button
                  variant="outline"
                  className={logoutBtn}
                  onClick={handleSignOut}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                {/* GUEST: Profile link takes them to Login */}
                <Link href="/login" className={topLink}>
                  <UserIcon />
                  Profile
                </Link>
                <Link href="/login" className={topLink}>
                  Login
                </Link>
                <Link href="/signup" className={topLink}>
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile View */}
          {isPending ? (
            <div
              aria-hidden="true"
              className="h-10 w-10 animate-pulse rounded-full bg-slate-100 lg:hidden"
            />
          ) : user ? (
            <FlyIn className="lg:hidden">
              <Link
                href="/profile"
                aria-label="Profile"
                className={`block rounded-full ${focusOutline}`}
              >
                <ProfileAvatar user={user} />
              </Link>
            </FlyIn>
          ) : (
            /* GUEST: Mobile Avatar icon takes them to Login */
            <Link
              href="/login"
              aria-label="Login"
              className={`${iconBtn} lg:hidden`}
            >
              <UserIcon size={20} />
            </Link>
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-[2px] lg:hidden"
            />

            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={panelTransition}
              className="fixed bottom-0 left-0 top-0 z-[70] flex w-[min(320px,85vw)] flex-col overflow-hidden bg-white shadow-2xl lg:hidden"
            >
              <div className="relative flex h-16 items-center justify-between border-b border-slate-200 pl-6 pr-4">
                <Link
                  href="/"
                  className={`${logoFont.className} text-[26px] font-extrabold leading-none tracking-tight text-[#1a8fb0] ${focusRing}`}
                >
                  Roamly
                </Link>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className={iconBtn}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>

                {!reduceMotion && (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-2.5 left-0 text-[#1a8fb0]"
                    initial={{ x: -30, y: 6, opacity: 0 }}
                    animate={{
                      x: 360,
                      y: [6, -4, 2, -2],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 1.3,
                      delay: 0.25,
                      ease: "easeInOut",
                    }}
                  >
                    <PlaneIcon />
                  </motion.span>
                )}
              </div>

              <nav className="py-3">
                <motion.ul
                  variants={listVariants}
                  initial={reduceMotion ? "show" : "hidden"}
                  animate="show"
                >
                  {NAV_LINKS.map(({ href, label }) => (
                    <motion.li
                      key={href}
                      variants={reduceMotion ? undefined : itemVariants}
                    >
                      <Link
                        href={href}
                        className={`block px-6 py-3.5 text-[17px] font-medium hover:bg-sky-50 ${
                          isActive(href)
                            ? "bg-sky-50 text-[#1a8fb0] shadow-[inset_3px_0_0_#1a8fb0]"
                            : "text-[#14181c]"
                        }`}
                      >
                        {label}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>

              <motion.div
                className="mt-auto border-t border-slate-200 pb-6 pt-3"
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduceMotion ? 0 : 0.5,
                  type: "spring",
                  stiffness: 260,
                  damping: 26,
                }}
              >
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-6 py-3 hover:bg-sky-50"
                    >
                      <ProfileAvatar user={user} />
                      <span className="min-w-0">
                        <span className="block truncate text-[17px] font-medium text-[#14181c]">
                          {user.name || "My profile"}
                        </span>
                        <span className="block truncate text-sm text-slate-500">
                          {user.email}
                        </span>
                      </span>
                    </Link>
                    <div className="px-6 pt-3">
                      <Button
                        variant="outline"
                        className={`${logoutBtn} w-full`}
                        onClick={handleSignOut}
                      >
                        Logout
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* GUEST: Profile link in drawer takes them to Login */}
                    <Link
                      href="/login"
                      className="flex items-center gap-2 px-6 py-3.5 text-[17px] font-medium text-[#14181c] hover:bg-sky-50"
                    >
                      <UserIcon size={18} />
                      Profile
                    </Link>
                    <div className="flex gap-3 px-6 pt-3">
                      <Link
                        href="/login"
                        className="flex-1 rounded-lg border-[1.5px] border-[#1a8fb0] py-2.5 text-center text-[15px] font-semibold text-[#1a8fb0] hover:bg-sky-50"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        className="flex-1 rounded-lg border-[1.5px] border-[#1a8fb0] bg-[#1a8fb0] py-2.5 text-center text-[15px] font-semibold text-white hover:border-[#136f89] hover:bg-[#136f89]"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
