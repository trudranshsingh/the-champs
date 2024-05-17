import FancyHeader from "../common/FancyHeader";
import { motion } from "framer-motion";
import aboutData from "../../Data/AboutData";

const AboutPageContainerMain = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-28 md:p-24 p-6 grid md:grid-cols-2"
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="flex justify-start">
            <FancyHeader fancy="About Us" />
          </span>
          <h1 className="max-md:text-3xl text-5xl font-bold">
            {aboutData.title}
          </h1>
        </div>
        <p className="font-medium">{aboutData.description}</p>
      </div>
      <div className="max-md:order-first">
        <img src={aboutData.image} alt="about" />
      </div>
    </motion.div>
  );
};

export default AboutPageContainerMain;
