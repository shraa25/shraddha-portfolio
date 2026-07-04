"use client";
import dynamic from "next/dynamic";
import SignalSpine from "@/components/synapse/SignalSpine";

const BackgroundNetwork = dynamic(() => import("@/components/synapse/BackgroundNetwork"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/synapse/CustomCursor"), { ssr: false });

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackgroundNetwork />
      <CustomCursor />
      <SignalSpine />
      <div className="relative z-10">{children}</div>
    </>
  );
}
