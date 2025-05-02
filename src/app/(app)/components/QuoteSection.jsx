import { motion } from "framer-motion";

const QuoteSection = ({ quote, author }) => {
  return (
    <div className="bg-gray-800 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto text-center"
      >
        <blockquote className="text-3xl italic text-white max-w-4xl mx-auto">
          "{quote}"
        </blockquote>
        <p className="mt-6 text-gray-500 text-lg">— {author}</p>
      </motion.div>
    </div>
     
  );
};

export default QuoteSection;
