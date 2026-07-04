"use client";
import dynamic from "next/dynamic";
import SectionWrapper from "@/components/synapse/SectionWrapper";
import TransmitText from "@/components/synapse/TransmitText";

const RoadmapConstellation = dynamic(() => import("@/components/synapse/RoadmapConstellation"), { ssr: false });

export default function Learning() {
  return (
    <SectionWrapper id="learning" className="py-24 px-6 md:px-[8%]">
      <TransmitText text="What I'm Building Next" as="h2" className="text-4xl font-bold text-center mb-4" />
      <p className="text-center font-mono text-xs mb-12 tracking-widest" style={{ color: "rgba(34,211,238,0.5)" }}>
        // signal.creeping — nodes not yet reached
      </p>
      <div className="max-w-3xl mx-auto glass-card p-4">
        <RoadmapConstellation />
      </div>
    </SectionWrapper>
  );
}
