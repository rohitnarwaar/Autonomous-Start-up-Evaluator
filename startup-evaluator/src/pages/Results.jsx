import { useEffect, useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Rocket, RefreshCw, Download, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import html2pdf from "html2pdf.js";
import { toast } from "sonner"; 

const CircularProgress = ({ score, size = 120, strokeWidth = 8 }) => {
  const [displayScore, setDisplayScore] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";

  useEffect(() => {
    let current = 0;
    const duration = 1000;
    const increment = score / (duration / 16);

    const interval = setInterval(() => {
      current += increment;
      if (current >= score) {
        current = score;
        clearInterval(interval);
      }
      setDisplayScore(Math.floor(current));
    }, 16);

    return () => clearInterval(interval);
  }, [score]);

  return (
    <div className="relative inline-block">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#374151"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
        {displayScore}
      </div>
    </div>
  );
};

export default function Results() {
  const markdownRef = useRef(null);
  const [fullText, setFullText] = useState("");
  const [score, setScore] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("startupResult");
    if (!data) return setFullText("No result found. Submit a startup first.");
    setFullText(data);

    const totalMatch = data.match(/Total Score:\s*(\d+)/i);
    if (totalMatch) {
      setScore(parseInt(totalMatch[1]));
    }

    const categoryRegex = /\*\*([\w\s]+)\s*\((\d+)\/25\):\*\*[\s\S]*?\n\n/g;
    const matches = [...data.matchAll(categoryRegex)];
    const parsed = matches.map((match) => ({
      name: match[1],
      value: parseInt(match[2]),
    }));
    setCategories(parsed);
  }, []);

  const handleDownloadPDF = () => {
    const element = markdownRef.current;
    if (!element) return;
    const options = {
      margin: 0.5,
      filename: "PitchPilot_Evaluation.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(fullText);
    toast.success("Copied evaluation to clipboard!"); // ✅ toast instead of alert
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between mb-6 items-center">
        <Link to="/form" className="text-gray-400 hover:text-white text-sm flex items-center">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Form
        </Link>

        <Link to="/" className="text-lg font-bold flex items-center space-x-2 hover:text-purple-400 transition-colors">
          <Rocket className="w-5 h-5 text-purple-500" />
          <span>PitchPilot</span> {/* ✅ Now links to home */}
        </Link>

        <Link to="/form" className="text-gray-400 hover:text-white text-sm flex items-center">
          <RefreshCw className="w-4 h-4 mr-1" /> New Evaluation
        </Link>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-light mb-2">Startup Evaluation Results</h1>
        <p className="text-gray-400">Here's your latest startup assessment</p>
      </div>

      <div className="flex flex-col items-center space-y-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <h2 className="text-xl font-semibold mb-2">Overall Score</h2>
          <CircularProgress score={score} />
          <Progress value={score} className="w-48 mt-2 bg-gray-700 [&>div]:bg-cyan-700" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6"
        >
          {categories.map((cat, idx) => (
            <Card key={idx} className="bg-gray-900 border-gray-800 text-white">
              <CardHeader>
                <CardTitle className="text-base">{cat.name}</CardTitle>
                <CardDescription className="text-white/70 text-sm">
                  {cat.value}/25
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={(cat.value / 25) * 100} className="[&>div/]:bg-purple-500" />
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>

      <motion.div
        ref={markdownRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 prose prose-invert max-w-none shadow-xl"
      >
        <ReactMarkdown>{fullText}</ReactMarkdown>
      </motion.div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={handleDownloadPDF}
          className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-all flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </button>

        <button
          onClick={handleShare}
          className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-all flex items-center space-x-2"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}
