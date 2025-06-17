import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import HALO from "vanta/src/vanta.halo";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const vantaRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    const user = auth.currentUser;
    if (user) {
      navigate("/form");
    } else {
      navigate("/signup");
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const vantaEffect = HALO({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      baseColor: 0x0d0d0d,
      backgroundColor: 0x000000,
      size: 1.3,
      amplitudeFactor: 1.6,
      xOffset: 0,
      yOffset: 0,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <section
      ref={vantaRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div
        ref={sectionRef}
        className={`max-w-4xl mx-auto px-6 text-center relative z-20 fade-in-section ${
          isVisible ? "is-visible" : ""
        }`}
      >
        <h1 className="text-6xl md:text-7xl font-light text-white mb-8 leading-tight">
          Your Startup's Co-Pilot
          <br />
          <span className="font-medium bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
            to Success
          </span>
        </h1>

        <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
          Get AI-powered insights and validation for your startup concept.
          Make data-driven decisions before you build.
        </p>

        <Button
          size="lg"
          onClick={handleStart}
          className="bg-white text-black hover:bg-gray-100 border-0 px-8 py-4 text-lg rounded-lg shadow-2xl transition-all duration-300 hover:scale-105"
        >
          Start Evaluation
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
