"use client";
import dynamic from "next/dynamic";
import SectionWrapper from "@/components/synapse/SectionWrapper";
import TransmitText from "@/components/synapse/TransmitText";

const SkillsGraph = dynamic(() => import("@/components/synapse/SkillsGraph"), { ssr: false });

export default function Skills() {
  return (
    <SectionWrapper id="skills" className="py-24 px-6 md:px-[8%]">
      <TransmitText text="Synapses" as="h2" className="text-4xl font-bold text-center mb-4" />
      <p className="text-center font-mono text-xs mb-12 tracking-widest" style={{ color: "rgba(34,211,238,0.5)" }}>
        // skills.graph — hover a node to fire it
      </p>
      <div className="max-w-4xl mx-auto glass-card p-4">
        <SkillsGraph />
      </div>
    </SectionWrapper>
  );
}
