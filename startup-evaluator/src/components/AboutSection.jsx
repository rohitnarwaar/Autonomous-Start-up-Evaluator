import { useEffect, useRef, useState } from "react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // ✅ Toggle true/false
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-light text-primary mb-6">
            What We Do
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our AI analyzes your startup idea across multiple dimensions including market viability,
            competitive landscape, technical feasibility, and growth potential to provide you with
            actionable insights.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Market Analysis",
              description: "Deep dive into market size, competition, and opportunity assessment",
            },
            {
              title: "Feasibility Check",
              description: "Technical and operational feasibility evaluation with risk assessment",
            },
            {
              title: "Growth Potential",
              description: "Scalability analysis and revenue projection modeling",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 ease-out transform delay-${index * 200} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="text-xl font-medium text-primary mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
