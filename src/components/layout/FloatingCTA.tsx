"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { KAKAO_CHANNEL_URL } from "@/lib/constants";
import { track } from "@/lib/analytics/track";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={KAKAO_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="카카오톡 오픈채팅으로 문의하기"
      onClick={() => track("kakao_click", { location: "floating_cta" })}
      className={cn(
        "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE500] text-[#3C1E1E] shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      )}
    >
      <MessageCircle size={24} />
    </a>
  );
}
