// // import Image from "next/image";
// // import Link from "next/link";

// // const SEARCH_FIELDS = [
// //   {
// //     name: "location",
// //     label: "Location",
// //     type: "text",
// //     placeholder: "City, country or region",
// //   },
// //   {
// //     name: "duration",
// //     label: "Duration",
// //     options: [
// //       ["", "Anytime"],
// //       ["1-3", "1–3 days"],
// //       ["4-7", "4–7 days"],
// //       ["8-plus", "8+ days"],
// //     ],
// //   },
// //   {
// //     name: "budget",
// //     label: "Budget",
// //     options: [
// //       ["", "Any budget"],
// //       ["0-1000", "Up to $1,000"],
// //       ["1000-3000", "$1,000 – $3,000"],
// //       ["3000-plus", "$3,000+"],
// //     ],
// //   },
// //   {
// //     name: "people",
// //     label: "Travelers",
// //     options: [
// //       ["", "Any group size"],
// //       ["1", "1 traveler"],
// //       ["2", "2 travelers"],
// //       ["3-5", "3–5 travelers"],
// //       ["6-10", "6–10 travelers"],
// //       ["11-plus", "More than 10"],
// //     ],
// //   },
// // ];

// // const fieldClasses =
// //   "w-full bg-transparent text-[15px] font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none";

// // function SearchIcon() {
// //   return (
// //     <svg
// //       width="18"
// //       height="18"
// //       viewBox="0 0 24 24"
// //       fill="none"
// //       stroke="currentColor"
// //       strokeWidth="2.2"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //       aria-hidden="true"
// //     >
// //       <circle cx="11" cy="11" r="7" />
// //       <path d="m20 20-3.5-3.5" />
// //     </svg>
// //   );
// // }

// // export default function Banner() {
// //   return (
// //     <section className="relative isolate overflow-hidden bg-slate-900 text-white">
// //       {/* Background image (place the file at public/assets/banner.png) */}
// //       <Image
// //         src="https://wallpaperaccess.com/full/1431786.jpg"
// //         alt=""
// //         fill
// //         priority
// //         sizes="100vw"
// //         className="-z-20 object-cover object-center"
// //       />
// //       {/* Dark gradient so text stays readable on any photo */}
// //       <div
// //         aria-hidden="true"
// //         className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/35 to-black/65"
// //       />

// //       <div className="mx-auto flex min-h-[560px] max-w-7xl flex-col justify-between gap-12 px-4 pb-8 pt-16 sm:min-h-[620px] sm:px-6 sm:pt-20 lg:min-h-[700px] lg:px-8 lg:pt-24">
// //         {/* Headline + calls to action */}
// //         <div className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center text-center">
// //           <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl">
// //             Discover Your <br className="hidden sm:block" />
// //             Next Adventure
// //           </h1>

// //           <p className="mt-5 max-w-2xl text-base text-white/90 sm:text-lg lg:text-xl">
// //             Explore breathtaking destinations and create unforgettable memories
// //             with Roamly’s curated travel experiences.
// //           </p>

// //           <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
// //             <Link
// //               href="/destinations"
// //               className="rounded-lg bg-[#1a8fb0] px-7 py-3 text-center text-[15px] font-semibold text-white transition-colors hover:bg-[#136f89]
// //               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
// //             >
// //               Explore Now
// //             </Link>
// //             <Link
// //               href="/destinations"
// //               className="rounded-lg border border-white/60 bg-white/10 px-7 py-3 text-center text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
// //             >
// //               View Destinations
// //             </Link>
// //           </div>
// //         </div>

// //         {/* Search bar */}
// //         <form
// //           action="/destinations"
// //           method="get"
// //           role="search"
// //           aria-label="Search destinations"
// //           className="overflow-hidden rounded-xl shadow-2xl [color-scheme:light]"
// //         >
// //           <div className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
// //             {SEARCH_FIELDS.map(
// //               ({ name, label, type, placeholder, options }) => (
// //                 <label
// //                   key={name}
// //                   htmlFor={`search-${name}`}
// //                   className="block cursor-pointer bg-white px-5 py-3 transition-colors focus-within:bg-sky-50"
// //                 >
// //                   <span className="block text-xs font-semibold text-slate-500">
// //                     {label}
// //                   </span>
// //                   {options ? (
// //                     <select
// //                       id={`search-${name}`}
// //                       name={name}
// //                       defaultValue=""
// //                       className={`${fieldClasses} mt-0.5 cursor-pointer`}
// //                     >
// //                       {options.map(([value, text]) => (
// //                         <option key={value} value={value}>
// //                           {text}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   ) : (
// //                     <input
// //                       id={`search-${name}`}
// //                       name={name}
// //                       type={type}
// //                       placeholder={placeholder}
// //                       autoComplete="off"
// //                       className={`${fieldClasses} mt-0.5`}
// //                     />
// //                   )}
// //                 </label>
// //               ),
// //             )}

// //             <div className="flex bg-white p-3 sm:col-span-2 lg:col-span-1">
// //               <button
// //                 type="submit"
// //                 className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1a8fb0] px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#136f89] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a8fb0]"
// //               >
// //                 <SearchIcon />
// //                 Search
// //               </button>
// //             </div>
// //           </div>
// //         </form>
// //       </div>
// //     </section>
// //   );
// // }

// import Image from "next/image";
// import Link from "next/link";

// const SEARCH_FIELDS = [
//   {
//     name: "location",
//     label: "Location",
//     type: "text",
//     placeholder: "City, country or region",
//   },
//   {
//     name: "duration",
//     label: "Duration",
//     options: [
//       ["", "Anytime"],
//       ["1-3", "1–3 days"],
//       ["4-7", "4–7 days"],
//       ["8-plus", "8+ days"],
//     ],
//   },
//   {
//     name: "budget",
//     label: "Budget",
//     options: [
//       ["", "Any budget"],
//       ["0-1000", "Up to $1,000"],
//       ["1000-3000", "$1,000 – $3,000"],
//       ["3000-plus", "$3,000+"],
//     ],
//   },
// ];

// const fieldClasses =
//   "w-full bg-transparent text-[15px] font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none";

// function SearchIcon() {
//   return (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2.2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       <circle cx="11" cy="11" r="7" />
//       <path d="m20 20-3.5-3.5" />
//     </svg>
//   );
// }

// export default function Banner() {
//   return (
//     <section className="relative isolate overflow-hidden bg-slate-900 text-white">
//       {/* Background image (place the file at public/assets/banner.png) */}
//       <Image
//         src="https://wallpaperaccess.com/full/1431786.jpg"
//         alt=""
//         fill
//         priority
//         sizes="100vw"
//         className="-z-20 object-cover object-center"
//       />
//       {/* Dark gradient so text stays readable on any photo */}
//       <div
//         aria-hidden="true"
//         className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/35 to-black/65"
//       />

//       <div className="mx-auto flex min-h-[560px] max-w-7xl flex-col justify-between gap-12 px-4 pb-8 pt-16 sm:min-h-[620px] sm:px-6 sm:pt-20 lg:min-h-[700px] lg:px-8 lg:pt-24">
//         {/* Headline + calls to action */}
//         <div className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center text-center">
//           <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl">
//             Discover Your <br className="hidden sm:block" />
//             Next Adventure
//           </h1>

//           <p className="mt-5 max-w-2xl text-base text-white/90 sm:text-lg lg:text-xl">
//             Explore breathtaking destinations and create unforgettable memories
//             with Roamly’s curated travel experiences.
//           </p>

//           <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
//             <Link
//               href="/destinations"
//               className="rounded-lg bg-[#1a8fb0] px-7 py-3 text-center text-[15px] font-semibold text-white transition-colors hover:bg-[#136f89]
//               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
//             >
//               Explore Now
//             </Link>
//             <Link
//               href="/destinations"
//               className="rounded-lg border border-white/60 bg-white/10 px-7 py-3 text-center text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
//             >
//               View Destinations
//             </Link>
//           </div>
//         </div>

//         {/* Search bar */}
//         <form
//           action="/destinations"
//           method="get"
//           role="search"
//           aria-label="Search destinations"
//           className="overflow-hidden rounded-xl shadow-2xl [color-scheme:light]"
//         >
//           <div className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
//             {SEARCH_FIELDS.map(
//               ({ name, label, type, placeholder, options }) => (
//                 <label
//                   key={name}
//                   htmlFor={`search-${name}`}
//                   className={`block cursor-pointer bg-white px-5 py-3 transition-colors focus-within:bg-sky-50 ${
//                     name === "location" ? "sm:col-span-2 lg:col-span-1" : ""
//                   }`}
//                 >
//                   <span className="block text-xs font-semibold text-slate-500">
//                     {label}
//                   </span>
//                   {options ? (
//                     <select
//                       id={`search-${name}`}
//                       name={name}
//                       defaultValue=""
//                       className={`${fieldClasses} mt-0.5 cursor-pointer`}
//                     >
//                       {options.map(([value, text]) => (
//                         <option key={value} value={value}>
//                           {text}
//                         </option>
//                       ))}
//                     </select>
//                   ) : (
//                     <input
//                       id={`search-${name}`}
//                       name={name}
//                       type={type}
//                       placeholder={placeholder}
//                       autoComplete="off"
//                       className={`${fieldClasses} mt-0.5`}
//                     />
//                   )}
//                 </label>
//               ),
//             )}

//             <div className="flex bg-white p-3 sm:col-span-2 lg:col-span-1">
//               <button
//                 type="submit"
//                 className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1a8fb0] px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#136f89] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a8fb0]"
//               >
//                 <SearchIcon />
//                 Search
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

export default function Banner() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-900 text-white">
      {/* Background image (place the file at public/assets/banner.png) */}
      <Image
        src="https://wallpaperaccess.com/full/1431786.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* Dark gradient so text stays readable on any photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/35 to-black/65"
      />

      <div className="mx-auto flex min-h-[560px] max-w-7xl flex-col justify-between gap-12 px-4 pb-8 pt-16 sm:min-h-[620px] sm:px-6 sm:pt-20 lg:min-h-[700px] lg:px-8 lg:pt-24">
        {/* Headline + calls to action */}
        <div className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl">
            Discover Your <br className="hidden sm:block" />
            Next Adventure
          </h1>

          <p className="mt-5 max-w-2xl text-base text-white/90 sm:text-lg lg:text-xl">
            Explore breathtaking destinations and create unforgettable memories
            with Roamly’s curated travel experiences.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Link
              href="/destinations"
              className="rounded-lg bg-[#1a8fb0] px-7 py-3 text-center text-[15px] font-semibold text-white transition-colors hover:bg-[#136f89] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore Now
            </Link>
            <Link
              href="/destinations"
              className="rounded-lg border border-white/60 bg-white/10 px-7 py-3 text-center text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View Destinations
            </Link>
          </div>
        </div>

        {/* Search bar */}
        <SearchBar />
      </div>
    </section>
  );
}
