# BioClinPharm AI Chatbot Setup

This document provides instructions for setting up and customizing the BioClinPharm AI Chatbot with Google's Gemini API.

## Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click on "Get API key" or "Create API key"
4. Copy the generated API key

## Setting Up the Environment Variable

1. Create a `.env` file in the root directory of the project (if it doesn't exist already)
2. Add your Gemini API key to the `.env` file:

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

3. Replace `your_gemini_api_key_here` with the actual API key you obtained from Google AI Studio

> **Important**: For Vite applications, environment variables must be prefixed with `VITE_` to be accessible in the client-side code.

## Testing the Chatbot

1. After adding your API key, restart the development server:

```
npm run dev
```

2. Open the website and test the chatbot by clicking on the chat icon in the bottom left corner
3. Try asking different questions to ensure the Gemini API is working correctly

## Customizing the Chatbot

You can customize the chatbot's behavior by modifying the following files:

### Main Components

- `src/components/chatbot/ChatBot.tsx`: The main chatbot component
- `src/components/chatbot/ChatMessage.tsx`: Component for rendering individual chat messages
- `src/components/chatbot/ChatInput.tsx`: Component for the chat input field

### Gemini API Integration

- `src/services/geminiService.ts`: The service that handles API calls to Gemini

### Customizing the Prompt

To customize how the chatbot responds to user queries, edit the prompt in `src/services/geminiService.ts`. Look for the following section:

```typescript
text: `You are a helpful customer support assistant for BioClinPharm...`
```

You can modify this prompt to change the chatbot's personality, knowledge, and response style.

### Customizing the UI

To change the appearance of the chatbot, edit the CSS classes in the component files. The chatbot uses Tailwind CSS for styling.

## Troubleshooting

If you encounter any issues:

1. Make sure your API key is correct and properly set in the `.env` file
2. Check that the environment variable is prefixed with `VITE_` (required for Vite applications)
3. Check the browser console for any error messages
4. Ensure you have an active internet connection
5. Verify that you haven't exceeded your Gemini API quota

For more information about the Gemini API, visit [Google AI Studio documentation](https://ai.google.dev/docs).
