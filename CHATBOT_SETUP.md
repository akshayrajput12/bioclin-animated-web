# BioClinPharm AI Chatbot Setup

This document provides instructions for setting up the BioClinPharm AI Chatbot with Google's Gemini API.

## Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click on "Get API key" or "Create API key"
4. Copy the generated API key

## Setting Up the Environment Variable

1. Create a `.env` file in the root directory of the project (if it doesn't exist already)
2. Add your Gemini API key to the `.env` file:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

3. Replace `your_gemini_api_key_here` with the actual API key you obtained from Google AI Studio

## Configuring Vite to Use Environment Variables

The project is already set up to use environment variables with Vite. If you need to make any changes, you can edit the `vite.config.ts` file.

## Testing the Chatbot

1. After adding your API key, restart the development server:

```
npm run dev
```

2. Open the website and test the chatbot by clicking on the chat icon in the bottom left corner
3. Try asking different questions to ensure the Gemini API is working correctly

## Customizing the Chatbot

You can customize the chatbot's behavior by modifying the following files:

- `src/components/ChatBot.tsx`: The main chatbot component
- `src/services/geminiService.ts`: The service that handles API calls to Gemini

## Troubleshooting

If you encounter any issues:

1. Make sure your API key is correct and properly set in the `.env` file
2. Check the browser console for any error messages
3. Ensure you have an active internet connection
4. Verify that you haven't exceeded your Gemini API quota

For more information about the Gemini API, visit [Google AI Studio documentation](https://ai.google.dev/docs).
