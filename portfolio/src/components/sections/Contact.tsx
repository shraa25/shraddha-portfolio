"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Download, Briefcase, Send } from "lucide-react";
import SectionWrapper from "@/components/synapse/SectionWrapper";
import TransmitText from "@/components/synapse/TransmitText";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type FormData = z.infer<typeof schema>;

const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

const GithubIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const CONTACTS = [
  { Icon: Mail,        label: "shraddhamore2528@gmail.com",          href: "mailto:shraddhamore2528@gmail.com" },
  { Icon: Phone,       label: "+91 7700924001",                       href: "tel:+917700924001" },
  { Icon: GithubIcon,  label: "github.com/shraa25",                   href: "https://github.com/shraa25" },
  { Icon: LinkedinIcon,label: "linkedin.com/in/shraddha-more",        href: "https://www.linkedin.com/in/shraddha-more-2528" },
  { Icon: MapPin,      label: "Thane, Maharashtra",                   href: null },
];

export default function Contact() {
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
        { from_name: data.name, from_email: data.email, message: data.message },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success"); reset();
    } catch (err: any) { console.error("EmailJS error:", err?.text || err?.message || err); setStatus("error"); }
  };

  const inputStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    color: "var(--text)",
  };

  return (
    <SectionWrapper id="contact" className="py-24 px-6 md:px-[8%] text-center">
      <TransmitText text="Get In Touch" as="h2" className="text-4xl font-bold text-center mb-4" />
      <p className="text-center font-mono text-xs mb-12 tracking-widest" style={{ color: "var(--accent)", opacity: 0.6 }}>
        {"// signal.open \u2014 ready to connect"}
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {CONTACTS.map(({ Icon, label, href }) =>
          href ? (
            <motion.a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" data-cursor="Connect" whileHover={{ y: -3 }} className="glass-card signal-border flex items-center gap-3 px-4 py-3 text-sm transition-all">
              <span style={{ color: "var(--accent)" }}><Icon /></span>
              <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>{label}</span>
            </motion.a>
          ) : (
            <div key={label} className="glass-card flex items-center gap-3 px-4 py-3 text-sm">
              <span style={{ color: "var(--accent)" }}><Icon /></span>
              <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>{label}</span>
            </div>
          )
        )}
      </div>

      <motion.form onSubmit={handleSubmit(onSubmit)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-lg mx-auto space-y-4 text-left mb-8">
        <div>
          <input {...register("name")} placeholder="// your_name" className="w-full px-4 py-3 rounded-lg text-sm font-mono focus:outline-none transition-all" style={inputStyle} />
          {errors.name && <p className="font-mono text-xs mt-1" style={{ color: "var(--danger)" }}>{errors.name.message}</p>}
        </div>
        <div>
          <input {...register("email")} placeholder="// your_email" className="w-full px-4 py-3 rounded-lg text-sm font-mono focus:outline-none transition-all" style={inputStyle} />
          {errors.email && <p className="font-mono text-xs mt-1" style={{ color: "var(--danger)" }}>{errors.email.message}</p>}
        </div>
        <div>
          <textarea {...register("message")} placeholder="// your_message" rows={4} className="w-full px-4 py-3 rounded-lg text-sm font-mono focus:outline-none transition-all resize-none" style={inputStyle} />
          {errors.message && <p className="font-mono text-xs mt-1" style={{ color: "var(--danger)" }}>{errors.message.message}</p>}
        </div>
        <button type="submit" disabled={status === "loading"} data-cursor="Send Signal"
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all disabled:opacity-60"
          style={{ background: "var(--btn-primary)", color: "var(--btn-text)", boxShadow: "0 0 20px var(--glow)" }}>
          <Send className="h-4 w-4" />
          {status === "loading" ? "// transmitting..." : "// send.signal()"}
        </button>
        {status === "success" && <p className="font-mono text-xs text-center" style={{ color: "var(--success)" }}>✓ signal transmitted successfully</p>}
        {status === "error"   && <p className="font-mono text-xs text-center" style={{ color: "var(--danger)" }}>✗ transmission failed — retry</p>}
      </motion.form>

      <div className="flex justify-center gap-3 flex-wrap">
        <a href="/resume.pdf" download data-cursor="Download"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all"
          style={{ background: "var(--btn-primary)", color: "var(--btn-text)", boxShadow: "0 0 20px var(--glow)" }}>
          <Download className="h-4 w-4" /> Download Resume
        </a>
        <a href="mailto:shraddhamore2528@gmail.com" data-cursor="Hire Me"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border transition-all"
          style={{ borderColor: "var(--border-hover)", color: "var(--accent)" }}>
          <Briefcase className="h-4 w-4" /> Hire Me
        </a>
      </div>
    </SectionWrapper>
  );
}
