import {
  FileText,
  Twitter,
  Linkedin,
  Instagram,
  Copy,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { motion } from "framer-motion";

interface Content {
  platform: string;
  prompt: string;
  content: string | string[];
}

interface ContentDetailsProps {
  content: Content;
  onClose: () => void;
}

export default function ContentDetails({ content, onClose }: ContentDetailsProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const getCopyButtonText = (platform: string) => {
    switch (platform) {
      case "X":
        return "Copy Tweet";
      case "LinkedIn":
        return "Copy Post";
      case "Instagram":
        return "Copy Caption";
      default:
        return "Copy Content";
    }
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-xl shadow-lg mt-6 relative"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold flex items-center text-gray-800">
          <FileText className="mr-2 text-green-500" />
          Generated Content
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            {getPlatformIcon(content.platform)}
            {content.platform === "X" ? (
              ""
            ) : (
              <span className="ml-2 font-medium">{content.platform}</span>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="mb-2">
            <strong>Prompt:</strong> {content.prompt}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-semibold mb-2">Generated Content:</p>
          {content.platform === "X" && Array.isArray(content.content) ? (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {content.content.map((tweet, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-2">
                    <Twitter className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="font-medium text-gray-700">
                      Tweet {index + 1}
                    </span>
                  </div>
                  <ReactMarkdown>{tweet}</ReactMarkdown>
                  {/* <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => copyToClipboard(tweet)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Tweet
                  </Button> */}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <ReactMarkdown>
                {Array.isArray(content.content)
                  ? content.content.join("\n\n")
                  : content.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
      <motion.div
        className="mt-4"
        initial={false}
        animate={copied ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() =>
            copyToClipboard(
              Array.isArray(content.content)
                ? content.content.join("\n\n")
                : content.content
            )
          }
          className="w-full"
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              {getCopyButtonText(content.platform)}
            </>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}
