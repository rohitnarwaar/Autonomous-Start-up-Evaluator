import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const handleStart = () => {
    const user = auth.currentUser;
    if (user) {
      navigate("/form");
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-primary">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div
          className={`transition-all duration-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
            Ready to Validate?
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Join hundreds of entrepreneurs who have validated their ideas with PitchPilot
          </p>

          <Button
            size="lg"
            onClick={handleStart}
            className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg rounded-md"
          >
            Start Your Evaluation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
