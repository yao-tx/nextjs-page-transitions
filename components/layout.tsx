import { motion } from "framer-motion";

export default function Layout({
  children,
}: { 
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1}}
      exit={{ y: -80, opacity: 0}}
      transition={{
        ease: [0.17, 0.67, 0.83, 1],
        duration: 0.8,
      }}
    >
      {children}
    </motion.div>
  );
};