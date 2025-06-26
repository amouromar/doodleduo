"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Helper for random color
const bubbleColors = [
  "bg-green-300",
  "bg-green-400",
  "bg-green-500",
  "bg-cyan-300",
  "bg-cyan-400",
  "bg-lime-300",
  "bg-lime-400",
  "bg-emerald-300",
  "bg-emerald-400",
];

const popularRooms = [
  {
    name: "Chess Club",
    creator: "John Doe",
    activeUsers: 15,
    private: false,
  },
  {
    name: "Art Room",
    creator: "Jane Doe",
    activeUsers: 20,
    private: false,
  },
  {
    name: "Study Buddies",
    creator: "Bob Smith",
    activeUsers: 12,
    private: true,
  },
  {
    name: "Music Lounge",
    creator: "Alice Johnson",
    activeUsers: 18,
    private: false,
  },
  {
    name: "Movie Night",
    creator: "David Lee",
    activeUsers: 10,
    private: true,
  },
  {
    name: "Bookworms",
    creator: "Sarah Taylor",
    activeUsers: 22,
    private: false,
  },
  {
    name: "Gamers",
    creator: "Michael Brown",
    activeUsers: 16,
    private: false,
  },
  {
    name: "Writers",
    creator: "Emily Chen",
    activeUsers: 14,
    private: false,
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const BUBBLE_SIZE = 62;
const BUBBLE_MARGIN = 4; // px, to avoid edge collisions

function getNonOverlappingPositions(
  count: number,
  containerWidth: number,
  containerHeight: number,
  bubbleSize: number,
  margin: number
) {
  const positions: { x: number; y: number }[] = [];
  let attempts = 0;
  while (positions.length < count && attempts < 3000) {
    attempts++;
    // Ensure bubbles stay within container
    const min = margin;
    const maxX = containerWidth - bubbleSize - margin;
    const maxY = containerHeight - bubbleSize - margin;
    const x = Math.random() * (maxX - min) + min;
    const y = Math.random() * (maxY - min) + min;
    // Check overlap
    const overlaps = positions.some((pos) => {
      const dx = pos.x + bubbleSize / 2 - (x + bubbleSize / 2);
      const dy = pos.y + bubbleSize / 2 - (y + bubbleSize / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      return dist < bubbleSize + margin;
    });
    if (!overlaps) {
      positions.push({ x, y });
    }
  }
  // Fallback: randomly place if not enough
  while (positions.length < count) {
    positions.push({
      x: Math.random() * (containerWidth - bubbleSize),
      y: Math.random() * (containerHeight - bubbleSize),
    });
  }
  return positions;
}

const Bubbles = () => {
  // Container dimensions in px (Tailwind h-60 = 240px, w-full assumed 100%)
  const containerWidth = 400; // px, adjust if you know the actual width
  const containerHeight = 240; // px (h-60)
  const positions = getNonOverlappingPositions(
    popularRooms.length,
    containerWidth,
    containerHeight,
    BUBBLE_SIZE,
    BUBBLE_MARGIN
  );
  const bubbles = popularRooms.map((room, i) => {
    const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
    // Convert px to % for responsive positioning
    const leftPercent = (positions[i].x / containerWidth) * 100;
    const topPercent = (positions[i].y / containerHeight) * 100;
    return {
      ...room,
      size: BUBBLE_SIZE,
      left: leftPercent,
      top: topPercent,
      color,
    };
  });
  return (
    <div className="absolute inset-0">
      {bubbles.map((bubble, idx) => (
        <div
          key={bubble.name}
          className={`absolute flex items-center justify-center cursor-pointer text-white font-bold shadow-lg transition-transform duration-300 hover:scale-120 ${bubble.color}`}
          style={{
            width: BUBBLE_SIZE,
            height: BUBBLE_SIZE,
            left: `${bubble.left}%`,
            top: `${bubble.top}%`,
            borderRadius: "50%",
            zIndex: 10 + idx,
            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.10)",
            userSelect: "none",
          }}
          title={bubble.name}
        >
          {/* Private Icon
          <div className="flex items-center justify-center">
            <span className="bg-teal-600 px-1 py-1 rounded-full text-white absolute right-12 top-0 text-sm">
              {bubble.private ? <Lock size={12} /> : <LockOpen size={12} />}
            </span>
          </div> */}
          {/* Room Name */}
          <div className="rounded-full p-3">
            <span
              className="text-lg select-none font-satoshi"
              style={{
                textShadow: "0 1px 4px rgba(0,0,0,0.15)",
              }}
            >
              {getInitials(bubble.name)}
            </span>
          </div>
          {/* Active Users */}
          <div>
            <span className="bg-purple-600 text-white font-satoshi font-light px-2 py-0 rounded-full absolute left-10 top-10 text-xs whitespace-nowrap select-none">
              {bubble.activeUsers}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const Welcome = () => {
  const user = "Hamid";
  const [showDialog, setShowDialog] = useState(false);
  const [roomLink, setRoomLink] = useState("");
  const router = useRouter();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomLink.trim()) {
      // Extract room id from URL or use as path
      let link = roomLink.trim();
      // Remove leading/trailing slashes and domain if pasted
      link = link.replace(/^https?:\/\/(www\.)?[^/]+\//, "/");
      if (!link.startsWith("/")) link = "/" + link;
      setShowDialog(false);
      setRoomLink("");
      router.push(link);
    }
  };

  return (
    <div className="md:px-[10%] lg:px-[20%]">
      {/* Join Room Dialog */}
      {showDialog && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          className="animate-fade-in animate-duration-[1s] animate-ease-in-out"
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 32,
              minWidth: 320,
              boxShadow: "0 2px 24px rgba(0,0,0,0.15)",
              position: "relative",
            }}
            className="animate-fade-in animate-duration-[1s] animate-ease-in-out"
          >
            <button
              onClick={() => setShowDialog(false)}
              style={{
                position: "absolute",
                top: 30,
                right: 35,
                background: "none",
                border: "none",
                fontSize: 20,
                cursor: "pointer",
              }}
              aria-label="Close"
              className="text-2xl font-bold font-satoshi text-red-600"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold font-satoshi mb-4 text-green-700">
              Join a Room
            </h3>
            <form onSubmit={handleJoin} className="flex flex-col gap-4">
              <input
                type="text"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400
                placeholder:text-gray-500 text-sm font-satoshi font-bold"
                placeholder="add room link..."
                value={roomLink}
                onChange={(e) => setRoomLink(e.target.value)}
                autoFocus
                autoComplete="off"
              />
              <button
                type="submit"
                className="bg-green-600 font-satoshi font-bold text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Header */}
      <div className="mt-8 px-2">
        <header>
          <h1 className="text-4xl font-light font-satoshi text-green-600">
            Welcome, <span className="font-semibold">{user}</span>!
          </h1>
        </header>
      </div>
      {/* Body */}
      <div className="mt-2 px-2">
        {/* Welcome Section */}
        <section>
          <p className="text-sm text-gray-500 font-semibold">
            You can start by{" "}
            <span className="font-normal cursor-pointer underline">
              <Link href="/room">creating a room</Link>
            </span>{" "}
            or join{" "}
            <span
              className="font-normal cursor-pointer underline"
              onClick={() => setShowDialog(true)}
            >
              an existing one
            </span>
            .
          </p>
        </section>

        {/* Popular Rooms */}
        <section className="mt-8">
          {/* Header */}
          <div className="flex flex-row items-center gap-4">
            <h2 className="text-2xl text-green-600 font-light">
              Popular Rooms
            </h2>
            <Link
              href="/room/popular"
              className="mt-1 text-xs text-gray-400 font-bold cursor-pointer rounded-full underline-offset-2 underline"
            >
              <ChevronRight
                size={20}
                className="hover:scale-125 transition-all"
              />
            </Link>
          </div>
          {/* Body */}
          <div className="relative w-full h-60 mt-6">
            <Bubbles />
          </div>
        </section>

        {/* Solo Mode */}
        <section className="mt-8">
          {/* Header */}
          <header>
            <div className="flex flex-row items-center gap-4">
              <h2 className="text-2xl text-green-600 font-light">Solo Mode</h2>
              <Link
                href="/room/solo"
                className="mt-1 text-xs text-gray-400 font-bold cursor-pointer rounded-full underline-offset-2 underline"
              >
                <ChevronRight
                  size={20}
                  className="hover:scale-125 transition-all"
                />
              </Link>
            </div>
            <p className="text-sm text-gray-500 font-semibold">
              Go solo and let your creativity flow and express yourself
            </p>
          </header>
          {/* Body */}
          <div className="mt-4 px-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Solo Doodles */}
              <Link href="/welcome">
                <div className="flex flex-col items-center justify-center bg-gradient-to-b from-green-600 to-green-400 w-34 h-34 rounded">
                  <span className="text-white font-semibold text-sm font-satoshi">
                    doodle_name
                  </span>
                  <span className="text-white font-light text-xs font-satoshi">
                    {new Date(Date.now()).toLocaleString().split(",")[0]}
                  </span>
                </div>
              </Link>
              {/* Solo Doodles */}
              <Link href="/welcome">
                <div className="flex flex-col items-center justify-center bg-gradient-to-b from-green-600 to-green-400 w-34 h-34 rounded">
                  <span className="text-white font-semibold text-sm font-satoshi">
                    doodle_name
                  </span>
                  <span className="text-white font-light text-xs font-satoshi">
                    {new Date(Date.now()).toLocaleString().split(",")[0]}
                  </span>
                </div>
              </Link>
              {/* More Doodles */}
              <Link href="/welcome">
                <div className="flex flex-col items-center justify-center bg-gradient-to-b from-green-600 to-green-400 w-34 h-34 rounded">
                  <span className="text-white font-semibold text-sm font-satoshi">
                    doodle_name
                  </span>
                  <span className="text-white font-light text-xs font-satoshi">
                    {new Date(Date.now()).toLocaleString().split(",")[0]}
                  </span>
                </div>
              </Link>
              {/* More Doodles */}
              <Link href="/welcome">
                <div className="flex flex-col items-center justify-center bg-gradient-to-b from-green-600 to-green-400 w-34 h-34 rounded">
                  <span className="text-white font-semibold text-sm font-satoshi">
                    doodle_name
                  </span>
                  <span className="text-white font-light text-xs font-satoshi">
                    {new Date(Date.now()).toLocaleString().split(",")[0]}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Welcome;
