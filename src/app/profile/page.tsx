"use client";

import { useSession } from "next-auth/react";
import { useAuth } from "@/lib/hooks/use-auth";
import { Mail, Phone, Linkedin, Globe } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { user: zustandUser, isAuthenticated } = useAuth();

  const user = session?.user || zustandUser;
  const isLoading = status === "loading";

  const displayUser = user
    ? {
        name: (user as any).fullName || (user as any).name || "Josh Hazelwood",
        email: user.email || "josh@boostnow.com",
        jobTitle: (user as any)?.jobTitle || "Software Designer",
        company: (user as any)?.company || "BoostNow LLP",
        location: (user as any)?.location || "California, USA",
        phone: (user as any)?.phone || "+1-555-0123",
        linkedin: (user as any)?.linkedin || "josh-hazelwood",
        website: (user as any)?.website || "https://boostnow.com",
        profileImage: (user as any)?.profileImage || null,
        description:
          (user as any)?.description ||
          "A modern digital visiting card for software designer showcasing professional details, social links, and portfolio",
      }
    : {
        name: "Josh Hazelwood",
        email: "josh@boostnow.com",
        jobTitle: "Software Designer",
        company: "BoostNow LLP",
        location: "California, USA",
        phone: "+1-555-0123",
        linkedin: "josh-hazelwood",
        website: "https://boostnow.com",
        profileImage: null,
        description:
          "A modern digital visiting card for software designer showcasing professional details, social links, and portfolio",
      };

  if (isLoading) return <p className="text-center mt-10">Loading your card...</p>;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 relative"
      style={{ background: "#f5f5f5" }}
    >
      {/* ✅ Logo at top-left */}
      <div className="absolute top-6 left-6">
        <div className="w-[140px] h-[40px] bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">CredLink</span>
        </div>
      </div>

      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-10 text-white shadow-2xl min-h-[550px] flex flex-col items-center border-[4px] border-white ">

          {/* Background Image */}
          <div className="absolute top-6 left-6 right-6 h-32 bg-black/20 rounded-2xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center">
              {/* <span className="text-white/70 text-sm">Meeting Background</span> */}
            </div>
          </div>

          {/* ✅ Profile Image + Username */}
          <div className="relative z-10 flex flex-col items-center mt-40 mb-8">
            <div className="w-28 h-28 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden translate-y-25">
              {displayUser.profileImage ? (
                <img
                  src={displayUser.profileImage}
                  alt={displayUser.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <span className="text-gray-600 text-2xl font-bold">
                    {displayUser.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </span>
                </div>
              )}
            </div>

            {/* Username below image */}
            <p className="text-white/90 text-sm font-medium mt-3">
              @{(displayUser.name || "JoshHazelwood")
                .replace(/\s+/g, "")
                .toLowerCase()}
            </p>
          </div>

          {/* Name */}
          <h1 className="text-3xl font-semi-bold text-center mb-4 text-white translate-y-15">
            {displayUser.name}
          </h1>

          {/* Job Title & Company */}
          <p className="text-center text-white mt-6 mb-1 translate-y-15">
            {displayUser.jobTitle} | {displayUser.company}
          </p>

          {/* Location */}
          <p className="text-center text-white mb-10">
            {displayUser.location}
          </p>

          {/* Contact Icons */}
          <div className="flex justify-center gap-5 mb-12 translate-y-5">
            <div className="p-1">
              <a
                href={`mailto:${displayUser.email}`}
                className="w-14 h-14 p-3 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition shadow-md"
              >
                <Mail className="w-6 h-6 text-white" />
              </a>
            </div>

            <div className="p-1">
              <a
                href={`tel:${displayUser.phone}`}
                className="w-14 h-14 p-3 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition shadow-md"
              >
                <Phone className="w-6 h-6 text-white" />
              </a>
            </div>

            <div className="p-1">
              <a
                href={`https://linkedin.com/in/${displayUser.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 p-3 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition shadow-md"
              >
                <Linkedin className="w-6 h-6 text-white" />
              </a>
            </div>

            <div className="p-1">
              <a
                href={displayUser.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 p-3 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition shadow-md"
              >
                <Globe className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-center text-white text-base leading-relaxed mb-12 px-4 translate-y-10"
            style={{ fontFamily: "Times New Roman, Times, serif" }}
          >
            {displayUser.description}
          </p>

          {/* Buttons Section */}
          <div className="flex flex-col items-center gap-8 w-full translate-y-10">
  {/* Row 1 - 3 Buttons */}
  <div className="flex justify-center gap-5 w-full">
    <button className="flex-1 bg-white text-blue-600 py-15 rounded-lg text-base font-semibold hover:bg-blue-50 transition shadow-md">
      Services
    </button>
    <button className="flex-1 bg-white text-blue-600 py-15 rounded-lg text-base font-semibold hover:bg-blue-50 transition shadow-md">
      Portfolio
    </button>
    <button className="flex-1 bg-white text-blue-600 py-15 rounded-lg text-base font-semibold hover:bg-blue-50 transition shadow-md">
      Links
    </button>
  </div>

  {/* Row 2 - 2 Buttons Centered */}
  <div className="flex justify-center gap-5 w-3/5">
    <button className="flex-1 bg-white text-blue-600 py-10 rounded-lg text-base font-semibold hover:bg-blue-50 transition shadow-md">
      Experience
    </button>
    <button className="flex-1 bg-white text-blue-600 py-10 rounded-lg text-base font-semibold hover:bg-blue-50 transition shadow-md">
      Review
    </button>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
