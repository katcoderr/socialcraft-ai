import { Clock, Twitter, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface HistoryItem {
  id: number;
  content: string;
  prompt: string;
  contentType: string;
  createdAt: string;
}

interface HistoryProps {
  history: HistoryItem[];
  onSelectContent: (content: HistoryItem) => void;
}

export default function History({ history, onSelectContent }: HistoryProps) {
  const [selectedContent, setSelectedContent] = useState(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Copied to clipboard");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "X":
        return <Twitter className="w-6 h-6 text-blue-400" />;
      case "LinkedIn":
        return <Linkedin className="w-6 h-6 text-blue-700" />;
      case "Instagram":
        return <Instagram className="w-6 h-6 text-pink-600" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
          <Clock className="mr-2 text-blue-500" />
          History
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="relative cursor-pointer hover:bg-gray-100 p-4 rounded-lg transition duration-200 border border-gray-200 transform hover:scale-105 shadow hover:shadow-md"
              onClick={() => onSelectContent(item)}
            >
              <div className="flex items-center justify-between mb-2">
                {getPlatformIcon(item.contentType)}
                <p className="text-sm font-medium text-gray-600">
                  {item.contentType === "X" ? "Twitter" : item.contentType}
                </p>
              </div>
              <p className="font-semibold text-lg mb-2">
                {item.prompt.substring(0, 50)}...
              </p>
              <p className="text-xs text-gray-400 flex items-center">
                <Clock className="mr-1 w-3 h-3" />
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
