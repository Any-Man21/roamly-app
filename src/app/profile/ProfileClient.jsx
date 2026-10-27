"use client";

import { useEffect, useState, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({ name: "", image: "" });

  const [miles, setMiles] = useState(0);
  const constraintsRef = useRef(null);
  const prevPos = useRef({ x: 0, y: 0 });

  const user = session?.user;

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      router.push("/login");
      return;
    }
    setEditData({ name: user.name || "", image: user.image || "" });

    async function fetchMiles() {
      try {
        // IMPORTANT: Ensure session and token exist before calling fetch
        if (!session?.token) {
          console.warn("Miles Fetch: Session token missing, waiting...");
          // If token is missing, we wait for the next render
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/stats/${user.id}`,
          {
            headers: { Authorization: `Bearer ${session.token}` },
          },
        );

        if (!res.ok) {
          console.error(
            `Miles Fetch Error: Server returned status ${res.status}`,
          );
          throw new Error(`Server responded with ${res.status}`);
        }

        const data = await res.json();
        console.log("Miles successfully loaded:", data.miles);
        setMiles(data.miles || 0);
      } catch (err) {
        console.error("Miles Fetch failed:", err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMiles();
  }, [user, isPending, router, session]);

  const getRank = (m) => {
    if (m < 500) return { title: "Homebody", color: "text-slate-400" };
    if (m < 2000) return { title: "Tourist", color: "text-blue-400" };
    if (m < 5000) return { title: "Globetrotter", color: "text-emerald-400" };
    return { title: "World Explorer", color: "text-purple-500" };
  };

  const handleDrag = (_, info) => {
    const currentX = info.point.x;
    const currentY = info.point.y;
    const dx = currentX - prevPos.current.x;
    const dy = currentY - prevPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 1) {
      setMiles((prev) => prev + Math.floor(distance * 0.5));
    }
    prevPos.current = { x: currentX, y: currentY };
  };

  const handleDragEnd = async () => {
    try {
      if (!session?.token) return;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/stats/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token}`,
          },
          body: JSON.stringify({ miles }),
        },
      );
      if (!res.ok) throw new Error(`Save failed with status ${res.status}`);
      console.log("Miles persisted to database successfully");
    } catch (err) {
      console.error("Failed to save miles:", err);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const { error } = await authClient.updateUser({
        name: editData.name,
        image: editData.image,
      });
      if (error) {
        alert(`Update failed: ${error.message}`);
        return;
      }
      alert("Profile updated successfully!");
      setIsModalOpen(false);
      router.refresh();
    } catch (err) {
      alert("An unexpected error occurred.");
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#1a8fb0] border-t-transparent"></div>
      </div>
    );
  }

  if (!user) return null;

  const rank = getRank(miles);

  return (
    <div className="min-h-screen bg-white pb-20 overflow-hidden">
      <div className="relative bg-white border-b border-slate-100 z-20 relative">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
              <div className="relative">
                <Avatar
                  src={user.image}
                  className="h-20 w-20 ring-1 ring-slate-200 shadow-sm"
                >
                  <Avatar.Fallback className="text-xl">
                    {user.name?.[0] || "U"}
                  </Avatar.Fallback>
                </Avatar>
                <div className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-light text-[#14181c] tracking-tight">
                  {user.name || "Traveler"}
                </h1>
                <p className="text-slate-400 text-xs font-medium">
                  {user.email}
                </p>
              </div>
            </div>
            <Button
              className="bg-slate-900 text-white font-medium rounded-full hover:bg-slate-800 transition-all px-5 text-sm"
              variant="solid"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <main
        ref={constraintsRef}
        className="relative h-[calc(100vh-180px)] w-full bg-slate-50 overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <div className="absolute top-10 left-0 right-0 flex flex-col items-center z-10 pointer-events-none">
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.3em] mb-1">
            Traveler Rank
          </p>
          <motion.p
            key={rank.title}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`text-xl font-bold ${rank.color}`}
          >
            {rank.title}
          </motion.p>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center z-10 pointer-events-none">
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.3em] mb-1">
            Flight Distance
          </p>
          <p className="text-5xl font-black text-slate-800 tabular-nums">
            {miles.toLocaleString()}{" "}
            <span className="text-lg font-medium text-slate-400">mi</span>
          </p>
          <p className="text-slate-400 text-xs mt-2 italic">
            Drag the plane to explore
          </p>
        </div>

        <motion.div
          drag
          dragConstraints={constraintsRef}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          initial={{ x: 0, y: 0 }}
          whileDrag={{ scale: 1.2, zIndex: 50 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing select-none"
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-7xl filter drop-shadow-xl"
          >
            ✈️
          </motion.div>
          <div className="absolute inset-0 animate-pulse rounded-full bg-blue-400/20 blur-2xl -z-10" />
        </motion.div>

        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100"
            >
              <div className="border-b border-slate-100 px-6 py-5">
                <h3 className="text-lg font-semibold text-slate-800">
                  Update Profile
                </h3>
              </div>
              <div className="flex flex-col gap-6 p-6">
                <Input
                  label="Username"
                  placeholder="Your name"
                  variant="bordered"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
                <Input
                  label="Profile Image URL"
                  placeholder="https://..."
                  variant="bordered"
                  value={editData.image}
                  onChange={(e) =>
                    setEditData({ ...editData, image: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center justify-end gap-3 bg-slate-50 px-6 py-5">
                <Button
                  variant="light"
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-500 font-medium"
                >
                  Cancel
                </Button>
                <Button
                  className="bg-slate-900 text-white font-medium px-6 rounded-full hover:bg-slate-800"
                  onClick={handleUpdateProfile}
                >
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
