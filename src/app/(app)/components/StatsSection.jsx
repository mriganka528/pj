import { motion } from "framer-motion";

const statsData = [
  { 
    number: "100,000+", 
    text: "Join over 100,000 students, faculty, and campus staff in transforming the student experience. The Great Bulletin X Community is a place where innovation, collaboration, and empowerment thrive. Together, we share knowledge, inspire change, and support each other in the pursuit of academic and personal success."
  },
  { 
    number: "1,000+", 
    text: "Over 1,000 academic discussions every week spark new ideas, foster creativity, and build lasting connections across campuses globally."
  },
  { 
    number: "200+", 
    text: "We take pride in our student-driven approach, with over 200 suggestions implemented from our members. Feedback isn’t just welcomed — it’s acted upon. Join us and help shape the future of education."
  }
];

const StatsSection = () => {
  return (
    <div className="bg-gray-800 py-20">
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 pt-10"
      >
        <motion.div 
          className="flex flex-col md:flex-row justify-center items-stretch gap-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {statsData.map((item, idx) => (
            <motion.div 
              key={idx}
              className="flex flex-col items-center justify-start w-full md:w-1/3"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <h3
                className="text-4xl md:text-5xl font-bold text-white mb-4"
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

export default StatsSection;
