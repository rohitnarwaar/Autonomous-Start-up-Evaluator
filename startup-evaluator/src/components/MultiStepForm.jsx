import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { db, auth } from "../firebase";
import { doc, collection, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Rocket } from "lucide-react";

// --- Startup Evaluation Logic ---
async function evaluateStartup(formData) {
  const prompt = generatePrompt(formData);
  const res = await axios.post("http://localhost:5000/api/evaluate", { prompt });
  return res.data;
}

function generatePrompt(data) {
  return `
You are a senior venture capitalist at a top-tier Silicon Valley VC firm. Your task is to write a professional internal investment memo evaluating the following startup.

Analyze and score these four categories (out of 25 each):
1. **Market Size** — How big is the TAM? Is it growing?
2. **Team Capability** — Does the team have the expertise to build and scale?
3. **Product Differentiation** — What makes it stand out from competitors?
4. **Technical Feasibility** — Can this be built reliably with the given stack?

Provide:
- Individual scores with reasoning
- A final total score out of 100
- A professional summary (1 paragraph)
- Your investment verdict: "Yes", "No", or "Maybe — needs refinement"

---

### 📦 Startup Data:

**Name:** ${data.startupName}  
**Pitch:** ${data.oneLinerPitch}  
**Description:** ${data.description}  
**Market Size:** ${data.marketSize}  
**Founders:** ${data.founderLevel}, Team of ${data.teamSize}  
**Tech Stack:** ${data.techStack}  
**Competitors:** ${data.competitors}  
**Differentiator:** ${data.differentiation}

Respond in **clean, professional Markdown** format.
`;
}



const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    startupName: "",
    oneLinerPitch: "",
    description: "",
    marketSize: "",
    founderLevel: "",
    teamSize: "",
    techStack: "",
    competitors: "",
    differentiation: "",
  });

  const totalSteps = 4;
  const navigate = useNavigate();

  function updateFormData(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function nextStep() {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  }

  function prevStep() {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await evaluateStartup(formData);
      const user = auth.currentUser;

      if (!user) {
        alert("Please sign in first.");
        return;
      }

      const userResultsRef = doc(collection(db, "users", user.uid, "results"));
      await setDoc(userResultsRef, {
        result: result.content,
        createdAt: new Date(),
        formData
      });

      localStorage.setItem("startupResult", result.content); 

      navigate("/results");
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong while evaluating your startup. Please try again later.");
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light text-white mb-2">Tell us about your startup</h2>
              <p className="text-gray-400">Let's start with the basics</p>
            </div>

            <div>
              <Label htmlFor="startupName" className="text-gray-300">Startup Name</Label>
              <Input
                id="startupName"
                type="text"
                placeholder="Enter your startup name"
                value={formData.startupName}
                onChange={(e) => updateFormData("startupName", e.target.value)}
                className="mt-2 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="oneLinerPitch" className="text-gray-300">One-liner Pitch</Label>
              <Input
                id="oneLinerPitch"
                type="text"
                placeholder="Describe your startup in one sentence"
                value={formData.oneLinerPitch}
                onChange={(e) => updateFormData("oneLinerPitch", e.target.value)}
                className="mt-2 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-300">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of your startup"
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                className="mt-2 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-gray-500 min-h-[100px]"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light text-white mb-2">Market & Founder Info</h2>
              <p className="text-gray-400">Help us understand your market and experience</p>
            </div>

            <div>
              <Label htmlFor="marketSize" className="text-gray-300">Estimated Market Size</Label>
              <Input
                id="marketSize"
                type="text"
                placeholder="e.g., $50B, 10M potential users"
                value={formData.marketSize}
                onChange={(e) => updateFormData("marketSize", e.target.value)}
                className="mt-2 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="founderLevel" className="text-gray-300">Founder Experience Level</Label>
              <Select value={formData.founderLevel} onValueChange={(value) => updateFormData("founderLevel", value)}>
                <SelectTrigger className="mt-2 bg-gray-800/50 border-gray-700 text-white focus:border-gray-500">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="beginner" className="text-white hover:bg-gray-700">Beginner</SelectItem>
                  <SelectItem value="intermediate" className="text-white hover:bg-gray-700">Intermediate</SelectItem>
                  <SelectItem value="expert" className="text-white hover:bg-gray-700">Expert</SelectItem>
                  <SelectItem value="serial" className="text-white hover:bg-gray-700">Serial Entrepreneur</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="teamSize" className="text-gray-300">Team Size</Label>
              <Input
                id="teamSize"
                type="text"
                placeholder="e.g., 3 people, Solo founder"
                value={formData.teamSize}
                onChange={(e) => updateFormData("teamSize", e.target.value)}
                className="mt-2 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-gray-500"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light text-white mb-2">Technical & Competitive Landscape</h2>
              <p className="text-gray-400">Tell us about your tech and competition</p>
            </div>

            <div>
              <Label htmlFor="techStack" className="text-gray-300">Tech Stack</Label>
              <Textarea
                id="techStack"
                placeholder="e.g., React, Node.js, PostgreSQL, AWS"
                value={formData.techStack}
                onChange={(e) => updateFormData("techStack", e.target.value)}
                className="mt-2 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-gray-500 min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="competitors" className="text-gray-300">Known Competitors</Label>
              <Textarea
                id="competitors"
                placeholder="List your main competitors and their strengths"
                value={formData.competitors}
                onChange={(e) => updateFormData("competitors", e.target.value)}
                className="mt-2 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-gray-500 min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="differentiation" className="text-gray-300">What Makes You Different?</Label>
              <Textarea
                id="differentiation"
                placeholder="Describe your unique value proposition and competitive advantages"
                value={formData.differentiation}
                onChange={(e) => updateFormData("differentiation", e.target.value)}
                className="mt-2 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-gray-500 min-h-[100px]"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light text-white mb-2">Review & Submit</h2>
              <p className="text-gray-400">Please review your information before submitting</p>
            </div>

            <div className="space-y-4 bg-gray-800/30 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Startup Name</p>
                  <p className="text-white">{formData.startupName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Market Size</p>
                  <p className="text-white">{formData.marketSize}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Founder Level</p>
                  <p className="text-white capitalize">{formData.founderLevel}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Team Size</p>
                  <p className="text-white">{formData.teamSize}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm">One-liner Pitch</p>
                <p className="text-white">{formData.oneLinerPitch}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Description</p>
                <p className="text-white text-sm">{formData.description}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 via-gray-800/30 to-gray-900/30 animate-pulse"></div>
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float animation-delay-2000"></div>

      <div className="w-full max-w-2xl mx-auto px-6 relative z-10">
        <div className="transition-all duration-1000 opacity-100 translate-y-0">
          <div className="text-center mb-8">
            <Link to="/" className="text-3xl font-semibold text-white hover:text-gray-300 transition-colors flex items-center justify-center gap-2">
              <Rocket className="w-8 h-8" />
              PitchPilot
            </Link>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Step {currentStep} of {totalSteps}</span>
              <span className="text-gray-400 text-sm">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 shadow-2xl">
            <form onSubmit={handleSubmit}>
              <div className="min-h-[400px]">
                <div key={currentStep} className="animate-fade-in">
                  {renderStep()}
                </div>
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
                <Button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  variant="ghost"
                  className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-white text-black hover:bg-gray-100 transition-all duration-300"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-white text-black hover:bg-gray-100 transition-all duration-300"
                  >
                    Submit Application
                    <Rocket className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
