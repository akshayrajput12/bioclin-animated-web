// This service will handle interactions with the Gemini API

// Function to get the Gemini API key from environment variables
const getGeminiApiKey = (): string => {
  // In a production environment, this would come from process.env.GEMINI_API_KEY
  // For development, we'll use a placeholder
  return process.env.GEMINI_API_KEY || "";
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
    
    if (!apiKey) {
      console.warn("Gemini API key not found. Using fallback responses.");
      return getFallbackResponse(prompt);
    }

    // The actual API endpoint for Gemini
    const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
    
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
                Provide concise, accurate, and professional responses. 
                Keep responses under 3 sentences when possible.
                Avoid special characters and keep formatting clean.
                If asked about contact information, mention email: hr@bioclinpharm.com and phone: +1 (484) 630-1569.
                If asked about location, mention USA office: 332 Sugartown Road, Devon, Pennsylvania, 19333 and India office: Konark Orchid, Wagholi, Pune, India-412207.
                
                User query: ${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        }
      }),
    });

    const data = await response.json();
    
    // Extract the generated text from the response
    // Note: This structure might need adjustment based on the actual Gemini API response format
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                          "I'm sorry, I couldn't generate a response at this time.";
    
    return { text: generatedText };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { 
      text: "I'm sorry, I encountered an error. Please try again later or contact our support team directly.",
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
      text: "Our customer support team is available Monday to Friday, 9 AM to 5 PM EST. You can reach us at hr@bioclinpharm.com or call +1 (484) 630-1569."
    };
  } 
  else if (lowercasePrompt.includes("services") || lowercasePrompt.includes("offerings")) {
    return { 
      text: "BioClinPharm offers clinical trial management, data analysis, biostatistics, and regulatory consulting services. Visit our website for more details."
    };
  }
  else if (lowercasePrompt.includes("location") || lowercasePrompt.includes("office")) {
    return { 
      text: "We have offices in the USA (Pennsylvania) and India (Pune). Our teams work collaboratively across these locations to serve clients globally."
    };
  }
  else if (lowercasePrompt.includes("contact") || lowercasePrompt.includes("email") || lowercasePrompt.includes("phone")) {
    return { 
      text: "You can contact us at hr@bioclinpharm.com or call +1 (484) 630-1569 for any inquiries."
    };
  }
  else {
    return { 
      text: "Thank you for your message. BioClinPharm is a leading clinical research organization specializing in data science and healthcare analytics. How can we assist you today?"
    };
  }
};
