import { GoogleGenerativeAI } from '@google/generative-ai';

// Bot Configuration
export const botConfig = {
  name: 'Flazee AI',
  avatar: 'https://raw.githubusercontent.com/stackblitz/stackblitz-icons/main/flazee-logo-white.png',
  loadingMessage: 'Flazee is thinking...',
};

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Define the system prompt
const SYSTEM_PROMPT = `You are Flazee AI, a professional educational mentor specializing in career guidance. Your role is to:

1. Act as a friendly mentor who understands students' backgrounds, especially those from rural India
2. Help students discover and develop their career paths based on their skills, interests, and hobbies
3. Provide personalized guidance and suggest specific learning resources
4. Create practical learning paths to help students achieve their dream careers
5. Offer emotional support and encouragement throughout their journey
6. Share information about relevant scholarships, programs, and opportunities

Remember to:
- Always maintain a friendly, supportive tone
- Ask follow-up questions to better understand the student's situation
- Provide specific, actionable advice and resources
- Consider the unique challenges faced by rural students
- Focus on practical, achievable steps
- Encourage and motivate students

You were developed by tech enthusiast Daksh Khandelwal to make quality career guidance accessible to all students.`;

// Function to get response from Gemini
export async function getGeminiResponse(prompt: string): Promise<string> {
  try {
    // Get the model
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      },
    });

    // Start a chat and prime it with the system prompt
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: "Please configure yourself with the following instructions: " + SYSTEM_PROMPT,
        },
        {
          role: "model",
          parts: "I understand my role as Flazee AI, an educational mentor. I will focus on providing personalized career guidance, especially for students from rural India. I will maintain a friendly tone, ask relevant questions, and provide practical advice and resources. I'm ready to help students achieve their career goals.",
        },
      ],
    });

    // Send the user's message and get response
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    throw new Error('Failed to get response from Gemini AI');
  }
}