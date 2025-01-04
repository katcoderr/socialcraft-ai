import { GoogleGenerativeAI } from "@google/generative-ai";
import fileToBase64 from "./helper";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY || "");

export async function generateContent(
  prompt: string,
  platform: string,
  image?: File
) {
  try {
    let model;
    let result;
    let basePrompt = `You are a professional social media content creation agency helping content creators with writing content.`;
    let finalPrompt;
    if (platform === "X") {
      finalPrompt = `${basePrompt}  Generate a tweet  under 200 characters for X/Twitter about ${prompt}`;
    } else if (platform === "Instagram") {
      finalPrompt = `${basePrompt}  Describe the image and generate caption for ${prompt}`;
    } else {
      finalPrompt = `${basePrompt}  Generate a professional post about ${prompt}`;
    }
    if (platform === "Instagram" && image) {
      model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const imageBase64 = await fileToBase64(image);
      const Baseimage64 = imageBase64.split(",")[1];
   
      
      result = await model.generateContent([
        finalPrompt,
        { inlineData: { data: Baseimage64, mimeType: image.type } },
      ]);
    } else {
      model = genAI.getGenerativeModel({ model: "gemini-pro" });
      result = await model.generateContent(finalPrompt);
    }

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

