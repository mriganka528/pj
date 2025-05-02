"use client";

import { motion } from "framer-motion";

const statsData = [
  { 
    number: "100+", 
    text: "Notices shared every week — from campus updates and event announcements to job opportunities and important alerts. The bulletin board is your central hub for everything happening on and around campus."
  },
  { 
    number: "1,000+", 
    text: "Students, faculty, and staff actively using the platform to stay informed, connect with peers, and never miss a moment. It’s more than just a noticeboard — it’s the pulse of campus life."
  },
  { 
    number: "200+", 
    text: "We take pride in our student-driven approach, with over 200 suggestions implemented from our members. Feedback isn’t just welcomed — it’s acted upon. Join us and help shape the future of education."
  }
];

// Animation Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const Stats = () => {
  return (
    <div className="bg-gray-800 py-20">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="container mx-auto px-6 pt-10"
      >
        <motion.div 
          className="flex flex-col md:flex-row justify-center items-stretch gap-10 text-center"
        >
          {statsData.map((item, idx) => (
            <motion.div 
              key={idx}
              className="flex flex-col items-center justify-start w-full md:w-1/3"
              variants={itemVariants}
              transition={{ duration: 0.6 }}
            >
              <h3
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {item.number}
              </h3>
              <p className="text-gray-300 text-lg">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Stats;
