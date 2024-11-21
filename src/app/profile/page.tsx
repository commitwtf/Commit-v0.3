"use client";

import { useState, useEffect } from "react";
import { Header } from "@/src/components/Header";
import { Sidebar } from "@/src/components/Sidebar";
import { Progress } from "@/src/components/ui/Progress";
import { Users, Timer, AlertCircle } from "lucide-react";
import Link from "next/link";
import { CommitCard } from "@/src/components/CommitCard";

export default function ProfilePage() {
  const [isDark, setIsDark] = useState(false);
  const [userCommits, setUserCommits] = useState([
    {
      id: 1,
      title: "Collect 5 Phi x Cyber campaign Creds",
      participants: 245,
      stakeAmount: 5,
      stakeToken: "CYBER",
      timeRemaining: "02:15:30",
      progress: 60,
    },
    {
      id: 2,
      title: "Collect 10 Phi x Cyber campaign Creds",
      participants: 157,
      stakeAmount: 10,
      stakeToken: "CYBER",
      timeRemaining: "01:45:20",
      progress: 40,
    },
  ]);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("darkMode", newIsDark.toString());
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "dark" : ""}`}>
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <div className="flex flex-1 overflow-hidden bg-[#E7E7E7] dark:bg-[#141414] transition-all duration-300 ease-in-out">
        <Sidebar currentPath="/profile" />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Your Commits
            </h1>

            {userCommits.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {userCommits.map((commit) => (
                  <CommitCard key={commit.id} {...commit} />
                ))}
              </div>
            ) : (
              <div className="bg-blue-50 dark:bg-blue-950/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                  <AlertCircle className="w-4 h-4" />
                  You haven&apos;t joined any commits yet. Explore active
                  commits and start earning rewards!
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
