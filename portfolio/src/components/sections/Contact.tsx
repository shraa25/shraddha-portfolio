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
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type FormData = z.infer<typeof schema>;

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_wjspo3n";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_aqdgx68";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "e5tzBNxGDZLvI58ML";

const CONTACTS = [
  { Icon: Mail, label: "shraddhamore2528@gmail.com", href: "mailto:shraddhamore2528@gmail.com" },
  { Icon: Phone, label: "+91 7700924001", href: "tel:+917700924001" },
  { Icon: GithubIcon, label: "github.com/shraa25", href: "https://github.com/shraa25" },
  { Icon: LinkedinIcon, label: "linkedin.com/in/shraddha-more", href: "https://www.linkedin.com/in/shraddha-more-2528" },
  { Icon: MapPin, label: "Thane, Maharashtra", href: null },
];

const inputCls = "w-full px-4 py-3 rounded-lg text-sm font-mono focus:outline-none transition-all";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
        { from_name: data.name, from_email: data.email, message: data.message },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success"); reset();
    } catch { setStatus("error"); }
  };

  return (
    <SectionWrapper id="contact" className="py-24 px-6 md:px-[8%] text-center">
      <TransmitText text="Get In Touch" as="h2" className="text-4xl font-bold text-center mb-4" />
      <p className="text-center font-mono text-xs mb-12 tracking-widest" style={{ color: "rgba(34,211,238,0.5)" }}>
        {"// signal.open — ready to connect"}
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {CONTACTS.map(({ Icon, label, href }) =>
          href ? (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              data-cursor="Connect"
              whileHover={{ y: -3 }}
              className="glass-card signal-border flex items-center gap-3 px-4 py-3 text-sm transition-all"
            >
              <span style={{ color: "#22D3EE" }}><Icon /></span>
              <span className="font-mono text-xs" style={{ color: "rgba(226,232,240,0.7)" }}>{label}</span>
            </motion.a>
          ) : (
            <div key={label} className="glass-card flex items-center gap-3 px-4 py-3 text-sm">
              <span style={{ color: "#22D3EE" }}><Icon /></span>
              <span className="font-mono text-xs" style={{ color: "rgba(226,232,240,0.7)" }}>{label}</span>
            </div>
          )
        )}
      </div>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-lg mx-auto space-y-4 text-left mb-8"
        noValidate
      >
        <div>
          <input
            {...register("name")}
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="// your_name"
            aria-label="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputCls}
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(124,58,237,0.2)", color: "#e2e8f0" }}
          />
          {errors.name && <p id="name-error" className="text-red-400 font-mono text-xs mt-1" role="alert">{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register("email")}
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="// your_email"
            aria-label="Your email address"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputCls}
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(124,58,237,0.2)", color: "#e2e8f0" }}
          />
          {errors.email && <p id="email-error" className="text-red-400 font-mono text-xs mt-1" role="alert">{errors.email.message}</p>}
        </div>
        <div>
          <textarea
            {...register("message")}
            id="contact-message"
            autoComplete="off"
            placeholder="// your_message"
            rows={4}
            aria-label="Your message"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`${inputCls} resize-none`}
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(124,58,237,0.2)", color: "#e2e8f0" }}
          />
          {errors.message && <p id="message-error" className="text-red-400 font-mono text-xs mt-1" role="alert">{errors.message.message}</p>}
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          data-cursor="Send Signal"
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #7C3AED, #3B82F6)", color: "#fff", boxShadow: "0 0 20px rgba(124,58,237,0.3)" }}
        >
          <Send className="h-4 w-4" />
          {status === "loading" ? "// transmitting..." : "// send.signal()"}
        </button>
        {status === "success" && (
          <p className="font-mono text-xs text-center" style={{ color: "#22D3EE" }} role="status">
            ✓ signal transmitted successfully
          </p>
        )}
        {status === "error" && (
          <p className="font-mono text-xs text-center text-red-400" role="alert">
            ✗ transmission failed — retry
          </p>
        )}
      </motion.form>

      <div className="flex justify-center gap-3 flex-wrap">
        <a
          href="/resume.pdf"
          download
          data-cursor="Download"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all"
          style={{ background: "linear-gradient(135deg, #7C3AED, #3B82F6)", color: "#fff", boxShadow: "0 0 20px rgba(124,58,237,0.3)" }}
        >
          <Download className="h-4 w-4" /> Download Resume
        </a>
        <a
          href="mailto:shraddhamore2528@gmail.com"
          data-cursor="Hire Me"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border transition-all"
          style={{ borderColor: "rgba(124,58,237,0.4)", color: "#22D3EE" }}
        >
          <Briefcase className="h-4 w-4" /> Hire Me
        </a>
      </div>
    </SectionWrapper>
  );
}
