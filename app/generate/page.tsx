//@ts-nocheck

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PointsBalance from "@/components/generate/PointsBalance";
import History from "@/components/generate/History";
import ContentGenerator from "@/components/generate/ContentGenerator";
import ContentDetails from "@/components/generate/ContentDetails";
import { getGeneratedContentHistory, getUserPoints } from "@/utils/db/actions";
import { useUser } from "@clerk/nextjs";
import { Modal } from "@/components/Modal";
import { Instagram, Linkedin, Twitter } from "lucide-react";

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [points, setPoints] = useState(0);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newlyGeneratedContent, setNewlyGeneratedContent] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (user || points) {
      fetchHistory();
      fetchPoints();
    }
  }, [user, points]);

  const fetchHistory = async () => {
    const fetchedHistory = await getGeneratedContentHistory(user.id);
    setHistory(fetchedHistory);
  };

  const fetchPoints = async () => {
    const fetchedPoints = await getUserPoints(user.id);
    setPoints(fetchedPoints);
  };

  const handleContentGeneration = (newContent) => {
    setHistory([newContent, ...history]);
    setNewlyGeneratedContent(newContent);
    setIsModalOpen(true);
  };

  const handlePointsUpdate = (newPoints) => {
    setPoints(newPoints);
  };

  const handleSelectContent = (content) => {
    setSelectedContent(content);
  };

  const handleCloseContent = () => {
    setSelectedContent(null);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ContentGenerator
            onGenerate={handleContentGeneration}
            points={points}
            onPointsUpdate={handlePointsUpdate}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <PointsBalance
            points={points}
            onBuyPoints={() => setPoints(points + 50)}
          />
        </motion.div>
        <motion.div
          className="md:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <History history={history} onSelectContent={handleSelectContent} />
          <AnimatePresence>
            {selectedContent && (
              <ContentDetails
                content={selectedContent}
                onClose={handleCloseContent}
              />
            )}
          </AnimatePresence>
          <AnimatedExtraComponent />
        </motion.div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {newlyGeneratedContent && (
          <ContentDetails
            content={newlyGeneratedContent}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
}

function AnimatedExtraComponent() {
  return (
    <motion.div
      className="mt-8 p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-xl shadow-lg text-white text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        className="text-2xl font-bold mb-4"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Unleash Your Social Media Potential!
      </motion.h3>
      <p className="text-lg mb-4">
        With our AI-powered content generator, your social media game will never
        be the same.
      </p>
      <motion.div
        className="flex justify-center space-x-4"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Twitter className="w-8 h-8" />
        <Linkedin className="w-8 h-8" />
        <Instagram className="w-8 h-8" />
      </motion.div>
    </motion.div>
  );
}
