"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Twitter, Linkedin, Instagram, Upload } from "lucide-react";
import { generateContent } from "@/lib/gemeni";
import { saveGeneratedContent, updateUserPoints } from "@/utils/db/actions";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

const loadingPhrases = [
  "This could be your next viral content!",
  "Generating your valuable content...",
  "Crafting social media magic...",
  "Unleashing creativity for your followers...",
  "Brewing up some engaging content...",
];

interface GeneratedContent {
  id: number;
  prompt: string;
  platform: string;
  content: string | string[];
  createdAt: string;
}

interface ContentGeneratorProps {
  onGenerate: (content: GeneratedContent) => void;
  points: number;
  onPointsUpdate: (points: number) => void;
}

export default function ContentGenerator({
  onGenerate,
  points,
  onPointsUpdate,
}: ContentGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("X");
  const [isGenerating, setIsGenerating] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [loadingPhrase, setLoadingPhrase] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();

  const handleGenerate = async () => {
    if (points < 10) return;
    setIsGenerating(true);
    setLoadingPhrase(
      loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)]
    );
    try {
      let content: string | string[];
      if (platform === "X") {
        content = await generateContent(prompt, platform, image || undefined);
      } else {
        content = await generateContent(prompt, platform, image || undefined);
        if (platform === "LinkedIn") {
          content = content.slice(0, 3000);
        } else if (platform === "Instagram") {
          content = content.slice(0, 2200);
        }
      }

      const savedContent = await saveGeneratedContent(
        //@ts-ignore
        user.id,
        Array.isArray(content) ? content.join("\n\n") : content,
        prompt,
        platform
      );
      //@ts-ignore
      await updateUserPoints(user.id, -10);
      onPointsUpdate(points - 10);

      onGenerate({
        //@ts-ignore
        id: savedContent.id,
        prompt,
        platform,
        content,
        //@ts-ignore
        createdAt: savedContent.createdAt,
      });
      setPrompt("");
      setImage(null);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
      <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
        <Sparkles className="mr-2 text-yellow-500" />
        Generate Content
      </h2>
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
        className="mb-4 h-32 transition-all duration-200 focus:ring-2 focus:ring-blue-500 rounded-lg resize-none"
      />
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger className="w-full sm:w-[180px] rounded-lg">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="X">
              <div className="flex items-center">
                <Twitter className="mr-2 text-blue-400" />X (Twitter)
              </div>
            </SelectItem>
            <SelectItem value="LinkedIn">
              <div className="flex items-center">
                <Linkedin className="mr-2 text-blue-700" />
                LinkedIn
              </div>
            </SelectItem>
            <SelectItem value="Instagram">
              <div className="flex items-center">
                <Instagram className="mr-2 text-pink-600" />
                Instagram
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={handleGenerate}
          disabled={!prompt || isGenerating || points < 10}
          className="w-full sm:w-auto transition-all duration-200 transform hover:scale-105 rounded-lg"
        >
          {isGenerating ? (
            <>
              <Sparkles className="mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2" />
              Generate
            </>
          )}
        </Button>
        {platform === "Instagram" && (
          <>
            <Button
              onClick={handleUploadClick}
              className="w-full sm:w-auto transition-all duration-200 transform hover:scale-105 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <Upload className="mr-2" />
              {image ? "Change Image" : "Upload Image"}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </>
        )}
      </div>
      {image && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Selected image: {image.name}</p>
        </div>
      )}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center rounded-xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg font-semibold text-gray-800">
                {loadingPhrase}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
