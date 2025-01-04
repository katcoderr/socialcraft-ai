import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Coins } from 'lucide-react'
import { Modal } from '@/components/Modal'
import { motion, AnimatePresence } from 'framer-motion'

interface PointsBalanceProps {
  points: number;
  onBuyPoints?: () => void;
}

export default function PointsBalance({ points, onBuyPoints }: PointsBalanceProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
          <Coins className="mr-2 text-yellow-500" />
          Points Balance
        </h2>
        <p className="text-4xl font-bold mb-6 text-blue-600">{points} points</p>
      </div>
      <Button 
        onClick={() =>  setIsModalOpen(true)} 
        className="w-full transition-all duration-200 transform hover:scale-105 rounded-lg bg-gradient-to-r from-green-400 to-blue-500"
      >
        <Coins className="mr-2" />
        Buy Points
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 bg-white rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-center">Hey Curious Human!</h3>
          <p className="text-lg mb-6 text-center">Unfortunately, I haven't integrated payments yet. Thanks for stopping by!</p>
          <div className="flex justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Coins className="w-24 h-24 text-yellow-500" />
            </motion.div>
          </div>
          <Button 
            onClick={() => onBuyPoints && setIsModalOpen(false)} 
            className="mt-6 w-full"
          >
            Got it!
          </Button>
        </div>
      </Modal>
    </div>
  )
}

