// src/components/SimpleAvatar.tsx
import React from "react";
import { motion } from "framer-motion";

const SimpleAvatar: React.FC = () => (
  <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} style={{ width: "100%" }}>
    <img src="/assets/David .jpg" alt="Pyke avatar" className="avatar" />
  </motion.div>
);

export default SimpleAvatar;
