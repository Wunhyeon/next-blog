"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { SiGithub } from "react-icons/si";
import LoginForm from "./LoginForm";
import { useUser } from "@/lib/store/user";
import Profile from "./profile";

const NavBar = () => {
  const user = useUser((state) => state.user);

  console.log("user : ", user);

  return (
    <nav className="flex items-center justify-between">
      <div className="group">
        <Link href="/" className="text-2xl font-bold">
          DailyBlog
        </Link>
        <div className="h-1 w-0 group-hover:w-full transition-all bg-green-500"></div>
      </div>
      {user ? <Profile /> : <LoginForm />}
    </nav>
  );
};

export default NavBar;
