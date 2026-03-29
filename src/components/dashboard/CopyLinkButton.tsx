"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export function CopyLinkButton({ username }: { username: string }) {
  const handleCopy = () => {
    const url = `${window.location.origin}/store/${username}`;
    navigator.clipboard.writeText(url);
    toast.success("Store link copied to clipboard!");
  };

  return (
    <Button 
      variant="secondary" 
      className="flex-1 md:flex-initial gap-2 bg-white/5 border-white/5 hover:bg-white/10 group h-11 px-4 text-xs md:text-sm font-bold"
      onClick={handleCopy}
    >
      <Copy size={16} />
      <span className="hidden sm:inline">Copy Link</span>
    </Button>
  );
}
