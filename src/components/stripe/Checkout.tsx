import React from "react";
import { Button } from "../ui/button";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { useUser } from "@/lib/store/user";
import LoginForm from "../nav/LoginForm";

const Checkout = () => {
  const user = useUser((state) => state.user);

  if (!user?.id) {
    return (
      <div className="flex items-center h-96 w-full justify-center gap-2">
        <LoginForm />
        to read
      </div>
    );
  }

  return (
    <form className="h-96 w-full flex items-center justify-center">
      <Button
        variant="ghost"
        className="flex flex-col p-10 gap-5 ring-2 ring-green-600"
      >
        <span className="flex items-center gap-2 text-2xl font-bold text-green-500">
          <LightningBoltIcon className="w-5 h-5" />
          Upgrade to pro
        </span>
        <span>Unlock all Blog Contents</span>
      </Button>
    </form>
  );
};

export default Checkout;
