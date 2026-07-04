import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Journey from "@/components/sections/Journey";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import GitHubStats from "@/components/sections/GitHubStats";
import Achievements from "@/components/sections/Achievements";
import Learning from "@/components/sections/Learning";
import Contact from "@/components/sections/Contact";
import { Footer, BackToTop } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Journey />
        <Skills />
        <Projects />
        <GitHubStats />
        <Achievements />
        <Learning />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
