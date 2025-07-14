"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

// Animation Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ThisMonthsEvents({ allEvenets }) {
  const featuredEvent = allEvenets
    .filter((event) => event.priority === "High")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

  const otherEvents = allEvenets.filter((event) => event.id !== featuredEvent?.id);

  const hasEvents = allEvenets && allEvenets.length > 0;

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-gray-800" style={{ fontFamily: "'Lora', serif" }}>
            This Month's Events
          </h1>
          <p className="text-gray-500 mt-4">
            Discover exciting events happening this month on campus and beyond.
          </p>
        </motion.div>

        {!hasEvents ? (
          <h1 className="text-center text-xl text-gray-600">No Events</h1>
        ) : (
          <div className="flex flex-col md:flex-row gap-12">
            {/* Featured Event */}
            {featuredEvent ? (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={itemVariants}
                className="md:w-2/3 w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-lg h-[700px]">
                  <Image
                    src="/assets/conference.jpg"
                    alt={featuredEvent.title || "Featured Event"}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8">
                    <h2 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Lora', serif" }}>
                      {featuredEvent.title}
                    </h2>
                    <p className="text-sm text-blue-400 font-semibold mb-4">
                      {new Date(featuredEvent.dateCreated).toDateString()}
                    </p>
                    <p className="text-white mb-6 line-clamp-2">{featuredEvent.content}</p>
                    <Link
                      href={`/notices/${featuredEvent.id}`}
                      className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition w-max"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="md:w-2/3 w-fit relative flex items-center justify-center">
                <Image
                  src="/assets/NoEvents.jpg"
                  alt="No Featured Event"
                  width={500}
                  height={500}
                  className="object-cover rounded-xl"
                />

                <div className="absolute inset-0 bg-transparent flex items-center justify-center rounded-xl">
                  <p className="text-white/70 text-2xl font-sans font-semibold text-center px-4">
                    No Featured Event
                  </p>
                </div>
              </div>

            )}

            {/* Other Events */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
              className="md:w-1/3 w-full flex flex-col gap-6"
            >
              {otherEvents.slice(0, 3).map((event, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{event.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(event.dateCreated).toDateString()}
                    </p>
                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">{event.content}</p>
                  </div>
                  <Link
                    href={`/notices/${event.id}`}
                    className="mt-4 text-blue-600 font-semibold hover:underline self-start"
                  >
                    View Details →
                  </Link>
                </motion.div>
              ))}

              {/* View All Events */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
                <div className="bg-gray-800 text-white py-3 rounded-full hover:bg-gray-900 transition mt-6 flex items-center justify-center">
                  <Link href={`/notices?category=Events`} className="w-full flex justify-center items-center">
                    View All Events
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
