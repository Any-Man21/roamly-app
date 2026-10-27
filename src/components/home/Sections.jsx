import Link from "next/link";
import Float from "@/components/Float";
import Reveal from "./Reveal";
import SafeImage from "./SafeImage";
import { SectionHeading, sectionClass } from "./ui";

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function Icon({ children, size = 22 }) {
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

const ShieldIcon = () => (
  <Icon>
    <path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);
const TagIcon = () => (
  <Icon>
    <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
    <circle cx="7.5" cy="7.5" r="1" />
  </Icon>
);
const HeadsetIcon = () => (
  <Icon>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="2.5" y="14" width="4" height="6" rx="1.5" />
    <rect x="17.5" y="14" width="4" height="6" rx="1.5" />
  </Icon>
);
const GlobeIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
  </Icon>
);
const MedalIcon = () => (
  <Icon>
    <circle cx="12" cy="9" r="6" />
    <path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" />
  </Icon>
);
const CheckIcon = ({ size = 18 }) => (
  <Icon size={size}>
    <path d="M5 12l5 5L20 7" />
  </Icon>
);
const ChevronIcon = () => (
  <Icon size={18}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);
const StarIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
  </svg>
);

const iconTile =
  "grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#1a8fb0]/10 text-[#1a8fb0]";

const primaryLink =
  "inline-flex items-center justify-center rounded-full bg-[#1a8fb0] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#136f89] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a8fb0]";

/* ------------------------------------------------------------------ */
/* Why Roamly                                                          */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    icon: <ShieldIcon />,
    title: "Secure booking",
    text: "Your details stay protected, and every trip is confirmed before you travel.",
  },
  {
    icon: <TagIcon />,
    title: "Honest prices",
    text: "Curated packages at fair prices, with no hidden fees at checkout.",
  },
  {
    icon: <HeadsetIcon />,
    title: "24/7 support",
    text: "A real person is a message away, before and during your trip.",
  },
  {
    icon: <GlobeIcon />,
    title: "Handpicked trips",
    text: "Every destination is reviewed by our team, so you only see trips worth taking.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-white">
      <div
        className={`${sectionClass} grid items-center gap-14 lg:grid-cols-2 lg:gap-16`}
      >
        <Reveal className="relative">
          <div className="group">
            <SafeImage
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=70"
              alt="Traveler standing by a mountain lake"
              fallback="🏞️"
              className="relative aspect-[5/4] rounded-3xl shadow-xl shadow-slate-900/10 lg:aspect-[4/5]"
            />
          </div>

          <Float className="absolute -bottom-5 left-4 sm:left-6" distance={8}>
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-slate-900/10 ring-1 ring-slate-100">
              <span className="text-amber-400">
                <StarIcon size={26} />
              </span>
              <div>
                <p className="text-lg font-extrabold leading-none text-slate-900">
                  4.9 / 5
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Average traveler rating
                </p>
              </div>
            </div>
          </Float>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Why Roamly"
              title="Travel that feels effortless"
              subtitle="We take care of the details, so all you have to think about is where to go next."
            />
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {FEATURES.map(({ icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="flex gap-4">
                  <span className={iconTile}>{icon}</span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    title: "Discover",
    text: "Browse handpicked destinations and find the one that matches your mood.",
  },
  {
    title: "Book",
    text: "Choose your date and group size, then confirm in a couple of clicks.",
  },
  {
    title: "Travel",
    text: "Pack your bags. We handle the details while you enjoy the trip.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-slate-50">
      <div className={sectionClass}>
        <SectionHeading
          eyebrow="How it works"
          title="Your trip in three simple steps"
          subtitle="From first idea to boarding pass, we keep it quick and clear."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map(({ title, text }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-4 select-none text-8xl font-extrabold text-[#1a8fb0]/10"
                >
                  {i + 1}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#1a8fb0] text-lg font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Experiences gallery                                                 */
/* ------------------------------------------------------------------ */

const EXPERIENCES = [
  {
    name: "Beaches",
    text: "Sun, sand and slow mornings",
    emoji: "🏖️",
    gradient: "from-cyan-400 to-sky-500",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=70",
  },
  {
    name: "Mountains",
    text: "Fresh air and big views",
    emoji: "🏔️",
    gradient: "from-slate-500 to-sky-700",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=70",
  },
  {
    name: "Cities",
    text: "Culture, food and nightlife",
    emoji: "🏙️",
    gradient: "from-indigo-400 to-violet-500",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&q=70",
  },
  {
    name: "Adventure",
    text: "Roads less traveled",
    emoji: "🧗",
    gradient: "from-orange-400 to-rose-500",
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=700&q=70",
  },
];

export function Experiences() {
  return (
    <section className="bg-white">
      <div className={sectionClass}>
        <SectionHeading
          eyebrow="Inspiration"
          title="Find your kind of trip"
          subtitle="Whatever you are in the mood for, there is a destination waiting."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {EXPERIENCES.map(({ name, text, emoji, gradient, src }, i) => (
            <Reveal key={name} delay={i * 0.08}>
              <Link
                href="/destinations"
                className="group relative block aspect-[3/4] overflow-hidden rounded-3xl shadow-md shadow-slate-900/10 transition-shadow duration-300 hover:shadow-2xl hover:shadow-[#1a8fb0]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a8fb0]"
              >
                <SafeImage
                  src={src}
                  alt={`${name} destination`}
                  fallback={emoji}
                  gradient={gradient}
                  className="absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                  <p className="text-lg font-bold sm:text-xl">
                    <span aria-hidden="true">{emoji}</span> {name}
                  </p>
                  <p className="mt-0.5 text-xs text-white/85 sm:text-sm">
                    {text}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Awards                                                              */
/* ------------------------------------------------------------------ */

const AWARDS = [
  {
    title: "Best Online Travel Platform",
    by: "Global Travel Awards",
    year: "2026",
  },
  {
    title: "Excellence in Customer Service",
    by: "Customer Choice Awards",
    year: "2026",
  },
  {
    title: "Top Rated Travel Experiences",
    by: "Traveler's Voice",
    year: "2025",
  },
  {
    title: "Sustainable Tourism Champion",
    by: "Green Journeys Council",
    year: "2025",
  },
];

export function Awards() {
  return (
    <section className="bg-slate-50">
      <div className={sectionClass}>
        <SectionHeading
          eyebrow="Recognition"
          title="Awards and recognition"
          subtitle="Honored by travelers and the travel industry for getting the details right."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AWARDS.map(({ title, by, year }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-lg">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-amber-50 text-amber-500">
                  <MedalIcon />
                </span>
                <h3 className="mt-4 text-base font-bold leading-snug text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  {by} · {year}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Refund policy                                                       */
/* ------------------------------------------------------------------ */

const GUARANTEES = [
  "Free cancellation up to 48 hours before departure",
  "Refunds go back to your original payment method",
  "Processed within 5 to 7 business days",
  "Prefer to rebook? Keep your full amount as travel credit",
];

const REFUND_TIERS = [
  {
    when: "48+ hours before departure",
    refund: "100% refund",
    badge: "bg-emerald-50 text-emerald-700",
    bar: "bg-emerald-500",
    width: "w-full",
  },
  {
    when: "24 to 48 hours before",
    refund: "50% refund",
    badge: "bg-amber-50 text-amber-700",
    bar: "bg-amber-500",
    width: "w-1/2",
  },
  {
    when: "Less than 24 hours before",
    refund: "Travel credit",
    badge: "bg-slate-100 text-slate-600",
    bar: "bg-slate-400",
    width: "w-1/4",
  },
];

export function RefundPolicy() {
  return (
    <section className="bg-white">
      <div
        className={`${sectionClass} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}
      >
        <div>
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Book with confidence"
              title="Our refund policy"
              subtitle="Plans change, and that is okay. Cancel from My Bookings in a few clicks and get a clear, fair refund."
            />
          </Reveal>

          <ul className="mt-8 space-y-4">
            {GUARANTEES.map((item, i) => (
              <Reveal key={item} delay={i * 0.07}>
                <li className="flex items-start gap-3 text-[15px] text-slate-700">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#1a8fb0] text-white">
                    <CheckIcon size={14} />
                  </span>
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900">
              What you get back
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Based on when you cancel
            </p>

            <div className="mt-6 space-y-6">
              {REFUND_TIERS.map(({ when, refund, badge, bar, width }) => (
                <div key={when}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-700">{when}</p>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${badge}`}
                    >
                      {refund}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${bar} ${width}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

const TESTIMONIALS = [
  {
    name: "Amelia R.",
    trip: "Bali Paradise",
    initials: "AR",
    text: "Booking took two minutes and the trip was everything the photos promised. I already have my next one picked.",
  },
  {
    name: "Daniel K.",
    trip: "Swiss Alps",
    initials: "DK",
    text: "Clear prices, quick answers and zero stress. Roamly made planning for our group of eight genuinely easy.",
  },
  {
    name: "Sofia M.",
    trip: "Santorini",
    initials: "SM",
    text: "I had to change my plans and cancelling was painless. That peace of mind is why I book here.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-slate-50">
      <div className={sectionClass}>
        <SectionHeading
          eyebrow="Traveler stories"
          title="Loved by travelers"
          subtitle="Real trips, real memories, shared by the people who took them."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map(({ name, trip, initials, text }, i) => (
            <Reveal key={name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                <div
                  className="flex gap-0.5 text-amber-400"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon key={s} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-700">
                  &ldquo;{text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#1a8fb0] to-sky-400 text-sm font-bold text-white">
                    {initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {name}
                    </p>
                    <p className="text-xs text-slate-500">Traveled to {trip}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

const FAQS = [
  {
    q: "How do I book a trip?",
    a: "Open a destination, choose your preferred date and the number of travelers, then press Book Now. Your booking appears in My Bookings right away.",
  },
  {
    q: "When is my booking confirmed?",
    a: "A new booking starts as pending and is confirmed automatically two minutes later. You can watch the countdown on your booking card.",
  },
  {
    q: "Can I cancel a booking?",
    a: "Yes. Open My Bookings and cancel from the booking card. What you get back depends on how close you are to departure, as shown in our refund policy above.",
  },
  {
    q: "Can I travel with a group?",
    a: "Absolutely. You can book for up to 10 travelers on a single booking, and the total updates as you add people.",
  },
  {
    q: "Is my personal information safe?",
    a: "We only collect what we need to manage your booking, and we never sell your information.",
  },
];

export function Faq() {
  return (
    <section className="bg-white">
      <div className={`${sectionClass} max-w-3xl`}>
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          subtitle="Everything you need to know before you book."
        />

        <div className="mt-10 space-y-3">
          {FAQS.map(({ q, a }, i) => (
            <Reveal key={q} delay={i * 0.05}>
              <details className="group rounded-2xl border border-slate-200 bg-white p-5 transition-shadow open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[15px] font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#1a8fb0]/10 text-[#1a8fb0] transition-transform duration-300 group-open:rotate-180">
                    <ChevronIcon />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final call to action                                                */
/* ------------------------------------------------------------------ */

export function FinalCta() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f6a85] via-[#1a8fb0] to-sky-400 px-6 py-14 text-center text-white shadow-xl shadow-[#1a8fb0]/20 sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 -top-16 -z-10 h-64 w-64 rounded-full bg-white/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -right-10 -z-10 h-64 w-64 rounded-full bg-sky-200/30 blur-3xl"
            />

            <Float
              className="absolute right-6 top-6 hidden text-5xl sm:block"
              distance={12}
            >
              <span aria-hidden="true">✈️</span>
            </Float>

            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-5xl">
              Ready to roam?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/90 sm:text-lg">
              Your next adventure is one click away. Explore our trips or create
              a free account to start planning.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/destinations"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#136f89] transition-colors hover:bg-sky-50 sm:w-auto"
              >
                Explore destinations
              </Link>
              <Link
                href="/signup"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/60 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:w-auto"
              >
                Create free account
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
