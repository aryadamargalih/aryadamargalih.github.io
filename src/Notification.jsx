import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";

const Notification = ({ message, type, isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.9 }}
          className="fixed top-4 right-4 z-50"
        >
          <div
            className="p-4 rounded-lg backdrop-blur-xl border flex items-center gap-3 min-w-[320px] shadow-2xl"
            style={{
              background: "rgba(15, 23, 42, 0.8)",
              borderColor: type === "success" ? "#22d3ee" : "#ef4444",
              boxShadow: `0 0 20px ${
                type === "success" ? "#22d3ee33" : "#ef444433"
              }`,
            }}
          >
            {type === "success" ? (
              <CheckCircle className="w-6 h-6 text-cyan-400" />
            ) : (
              <XCircle className="w-6 h-6 text-red-400" />
            )}
            <p className="text-white flex-1">{message}</p>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
