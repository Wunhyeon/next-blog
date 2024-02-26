"use client";

import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import React from "react";

const SwitchForm = ({
  checked,
  onToggle,
  name,
}: {
  checked: boolean;
  onToggle: () => Promise<string>;
  name: string;
}) => {
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const { error } = JSON.parse(await onToggle());
    if (error?.message) {
      toast({
        title: "Fail to update" + name,
        description: (
          <pre>
            <code>{error.message}</code>
          </pre>
        ),
      });
    } else {
      toast({
        title: "Successfully update" + name,
      });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Switch checked={checked} type="submit" />
    </form>
  );
};

export default SwitchForm;
