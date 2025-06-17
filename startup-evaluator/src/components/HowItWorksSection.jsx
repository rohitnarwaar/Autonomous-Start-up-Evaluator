import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Submit Your Idea",
    description: "Provide details about your startup concept, target market, and business model",
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our advanced algorithms evaluate your idea across multiple success factors",
  },
  {
    number: "03",
    title: "Get Insights",
    description: "Receive detailed feedback, recommendations, and validation score",
  },
];

const HowItWorksSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // ✅ Allow show/hide
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-light text-primary mb-6">How It Works</h2>
          <div className="w-16 h-px bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`text-center transition-all duration-700 ease-out transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }} // ✅ Proper dynamic delay
            >
              <div className="text-6xl font-light text-gray-300 mb-6">{step.number}</div>
              <h3 className="text-xl font-medium text-primary mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
