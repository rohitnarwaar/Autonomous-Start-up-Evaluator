import axios from "axios";

export async function evaluateStartup(formData) {
  const prompt = generatePrompt(formData);

  const res = await axios.post(
    "https://localhost:5000/api/evaluate",{prompt})
 

  return res.content;
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
