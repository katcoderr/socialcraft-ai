import React from 'react'
import {motion} from 'framer-motion'
import { Instagram, Linkedin, Twitter } from 'lucide-react'
const AnimatedComponent = () => {
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
            With our AI-powered content generator, your social media game will never be the same.
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
      
  )
}

export default AnimatedComponent