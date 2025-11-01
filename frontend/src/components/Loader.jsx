import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, rotate: 360 }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      style={{
        width: 50,
        height: 50,
        border: "5px solid #ccc",
        borderTop: "5px solid #2a9d8f",
        borderRadius: "50%",
        margin: "50px auto",
      }}
    />
  );
}
