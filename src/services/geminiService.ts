// This service handles interactions with the Gemini API for BioClinPharm chatbot

// Function to get the Gemini API key from environment variables
const getGeminiApiKey = (): string => {
  // In a production environment, this would come from import.meta.env.VITE_GEMINI_API_KEY
  // For Vite, environment variables need to be prefixed with VITE_
  return import.meta.env.VITE_GEMINI_API_KEY || "";
};

// Interface for the response from Gemini API
interface GeminiResponse {
  text: string;
  error?: string;
}

/**
 * Generate a response using the Gemini API
 * @param prompt The user's message/prompt
 * @returns A promise that resolves to the generated response
 */
export const generateGeminiResponse = async (prompt: string): Promise<GeminiResponse> => {
  try {
    const apiKey = getGeminiApiKey();

    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      console.warn("Valid Gemini API key not found. Using fallback responses.");
      return getFallbackResponse(prompt);
    }

    // The actual API endpoint for Gemini
    const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    const response = await fetch(`${endpoint}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a helpful customer support assistant for BioClinPharm, a clinical research organization specializing in data science and healthcare analytics.

                ABOUT BIOCLINPHARM:
                BioClinPharm is a leading clinical research organization that provides comprehensive services in clinical trials, data management, biostatistics, and regulatory affairs. We specialize in pharmaceutical, biotechnology, and medical device industries, offering end-to-end solutions for clinical research needs.

                DETAILED COMPANY INFORMATION:
                BioClinPharm is committed to advancing healthcare through innovative clinical research and data analytics. Our team of experienced professionals combines scientific expertise with cutting-edge technology to deliver high-quality, reliable results for our clients. We pride ourselves on our ability to streamline the clinical research process, ensuring compliance with regulatory standards while maintaining the highest level of data integrity.

                INSTRUCTIONS:
                - Provide concise, accurate, and professional responses
                - Keep responses under 3 sentences when possible
                - Avoid special characters and keep formatting clean
                - Be helpful and informative about BioClinPharm's services and expertise
                - For questions outside BioClinPharm's scope, politely redirect to relevant contact

                COMPANY INFORMATION:
                - Email: hr@bioclinpharm.com
                - Phone: +1 (484) 630-1569
                - India Phone: +91-9390281309
                - USA Office: 332 Sugartown Road, Devon, Pennsylvania, 19333
                - India Office: Konark Orchid, Wagholi, Pune, India-412207
                - Services: Clinical trial management, data analysis, biostatistics, regulatory consulting
                - Expertise: Data science, healthcare analytics, clinical research, regulatory compliance
                - Website: https://bioclinpharm.com

                DETAILED SERVICES:
                1. Clinical Trial Management: Protocol development, site selection, patient recruitment, monitoring, and project management.
                2. Data Management: EDC setup, data cleaning, database design, and data validation.
                3. Biostatistics: Statistical analysis plans, sample size calculations, interim analyses, and final statistical reports.
                4. Regulatory Affairs: Regulatory strategy, submissions to FDA/EMA/other agencies, and compliance monitoring.
                5. Medical Writing: Clinical study reports, protocols, investigator brochures, and regulatory documents.
                6. Pharmacovigilance: Safety monitoring, adverse event reporting, and risk management.
                7. Healthcare Analytics: Real-world evidence studies, predictive modeling, and outcomes research.

                RESPONSE GUIDELINES:
                - For customer support queries: Provide specific information about how BioClinPharm can help
                - For technical questions: Explain BioClinPharm's technical capabilities and methodologies
                - For general inquiries: Give brief overview of relevant BioClinPharm services
                - For contact requests: Provide appropriate contact information

                User query: ${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 300,
        }
      }),
    });

    const data = await response.json();

    // Handle potential API errors
    if (data.error) {
      console.error("Gemini API error:", data.error);
      return {
        text: "I'm sorry, I encountered an error processing your request. Please try again later or contact our support team directly at hr@bioclinpharm.com or call +1 (484) 630-1569.",
        error: data.error.message || "Unknown API error"
      };
    }

    // Extract the generated text from the response
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text ||
                          "I'm sorry, I couldn't generate a response at this time. Please contact our team at hr@bioclinpharm.com or call +1 (484) 630-1569 for assistance.";

    return { text: generatedText };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      text: "I'm sorry, I encountered an error. Please try again later or contact our support team directly at hr@bioclinpharm.com or call +1 (484) 630-1569.",
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

/**
 * Get a fallback response when the API is not available
 * @param prompt The user's message/prompt
 * @returns A simulated response
 */
const getFallbackResponse = (prompt: string): GeminiResponse => {
  const lowercasePrompt = prompt.toLowerCase();

  if (lowercasePrompt.includes("customer support") || lowercasePrompt.includes("help")) {
    return {
      text: "Our customer support team is available Monday to Friday, 9 AM to 5 PM IST. You can reach us at hr@bioclinpharm.com or call +1 (484) 630-1569 for immediate assistance."
    };
  }
  else if (lowercasePrompt.includes("services") || lowercasePrompt.includes("offerings")) {
    return {
      text: "BioClinPharm offers comprehensive services including clinical trial management, data analysis, biostatistics, and regulatory consulting. We specialize in pharmaceutical, biotechnology, and medical device industries."
    };
  }
  else if (lowercasePrompt.includes("location") || lowercasePrompt.includes("office") || lowercasePrompt.includes("address")) {
    return {
      text: "We have offices in the USA (332 Sugartown Road, Devon, Pennsylvania, 19333) and India (Konark Orchid, Wagholi, Pune, India-412207). Our teams work collaboratively across these locations to serve clients globally."
    };
  }
  else if (lowercasePrompt.includes("contact") || lowercasePrompt.includes("email") || lowercasePrompt.includes("phone") || lowercasePrompt.includes("whatsapp")) {
    return {
      text: "You can contact us at hr@bioclinpharm.com or call +1 (484) 630-1569 for any inquiries. We're available Monday to Friday, 9 AM to 5 PM IST."
    };
  }
  else if (lowercasePrompt.includes("clinical") || lowercasePrompt.includes("trial") || lowercasePrompt.includes("research")) {
    return {
      text: "BioClinPharm provides end-to-end clinical research services including protocol development, site selection, patient recruitment, data management, and regulatory submissions. Our experienced team ensures high-quality, compliant clinical trials."
    };
  }
  else if (lowercasePrompt.includes("data") || lowercasePrompt.includes("analytics") || lowercasePrompt.includes("statistics")) {
    return {
      text: "BioClinPharm excels in healthcare data analytics, biostatistics, and data management. We use advanced statistical methods and cutting-edge technologies to derive meaningful insights from clinical data."
    };
  }
  else if (lowercasePrompt.includes("regulatory") || lowercasePrompt.includes("compliance")) {
    return {
      text: "Our regulatory affairs team provides comprehensive support for regulatory submissions, compliance monitoring, and quality assurance. We ensure your clinical research meets all applicable regulations and standards."
    };
  }
  else {
    return {
      text: "Thank you for your message. BioClinPharm is a leading clinical research organization specializing in data science and healthcare analytics. How can we assist you with your clinical research needs today?"
    };
  }
};
