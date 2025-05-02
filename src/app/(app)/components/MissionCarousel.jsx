import { motion } from "framer-motion";
import { useState } from "react";

const MissionVisionValues = () => {
  const items = [
    {
      image: (
        <img
          src="/assets/room.jpg"
          alt="Mission Image"
          className="w-full h-full object-cover rounded-2xl"
        />
      ),
      title: "Our Mission",
      description: [
        "Our mission is to simplify and enhance every aspect of student life by providing an all-in-one platform that offers easy, intuitive access to essential academic and campus resources. From class schedules and exam dates to campus events and support services, we are dedicated to making sure that students stay informed, organized, and connected throughout their academic journey. By bridging the gap between students, faculty, and administration, we seek to eliminate barriers to information and communication, creating a more transparent and collaborative environment. Our goal is to equip students with everything they need to succeed — academically, personally, and socially — by providing timely updates, personalized experiences, and an unwavering commitment to serving their evolving needs in a fast-paced educational world.",
      ],
    },
    {
      image: (
        <img
          src="/assets/grad.jpg"
          alt="Vision Image"
          className="w-full h-full object-cover rounded-2xl"
        />
      ),
      title: "Our Vision",
      description: [
        "Our vision is to revolutionize the way students interact with their academic environment by creating an accessible, connected, and empowered community. We aspire to build a future where students no longer struggle to find critical information or navigate disjointed systems. Instead, we see a world where information flows seamlessly, students are consistently supported, and everyone has the tools they need to reach their fullest potential. By fostering a culture of openness, collaboration, and innovation, we aim to transform the student experience into one that is not only easier to manage but also deeply enriching, socially connected, and empowering for future success.",
      ],
    },
    {
      image: (
        <img
          src="/assets/mission2.jpg"
          alt="Values Image"
          className="w-full h-full object-cover rounded-2xl"
        />
      ),
      title: "Our Values",
      description: [
        "At the core of everything we do are the values that guide our mission and shape our vision for the future. We value Accessibility, ensuring that every student can easily access the information they need without unnecessary hurdles or confusion. Empowerment drives us to create tools that give students more control over their education and personal growth, inspiring confidence and self-sufficiency. Connectivity is fundamental; we believe that fostering strong connections between students, faculty, and administration leads to a more informed and engaged community. Our commitment to Innovation means we are constantly pushing boundaries and embracing new technologies to improve the student experience. We are relentlessly Student-Centric, listening carefully to the needs, challenges, and aspirations of students, and designing solutions that truly serve them. Lastly, Transparency underpins all of our actions, as we believe that trust and clarity are essential for building strong, lasting relationships within the academic community. Through these values, we aim to create a platform — and a culture — where students can thrive today and be prepared for the opportunities of tomorrow.",
      ],
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <section className="container mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen relative">
      <div className="relative w-full max-w-[1200px] h-[650px] flex items-center justify-center">


        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800 shadow-2xl rounded-3xl p-10 w-full h-full flex flex-col items-center justify-start text-center overflow-hidden"
        >
          <div className="w-full h-64 mb-6">{items[current].image}</div>

          <h2 className="text-3xl font-bold text-white mt-4">
            {items[current].title}
          </h2>

          <div className="mt-4 overflow-y-auto px-2 max-h-48">
            {items[current].description.map((text, index) => (
              <p key={index} className="mt-4 text-gray-300 text-base">
                {text}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-3 shadow-md"
        >
          <span className="text-3xl text-gray-800">◁</span>
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-3 shadow-md"
        >
          <span className="text-3xl text-gray-800">▷</span>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {items.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-4 h-4 rounded-full cursor-pointer transition-colors ${
              index === current ? "bg-gray-900" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default MissionVisionValues;
