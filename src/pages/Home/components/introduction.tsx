import { motion } from "framer-motion";

const Introduction = () => {
  return (
    <section
      id="intro"
      className="bg-gradient-to-b from-blue-500 to-teal-500 py-20 "
    >
      <div className="container mx-auto px-6 pt-10 md:pt-0 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between ">
        <motion.div
          initial={{ opacity: 0, x: "-70px" }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 text-white"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Simplify Your Business <br />
            <span className="text-3xl md:text-5xl">
              Innovate for Excellence
            </span>
          </h1>
          <p className="text-sm md:text-lg lg:text-2xl mb-6 leading-relaxed">
            At{" "}
            <span className="font-semibold cursor-pointer">
              <span className="text-[#212ff5]">KMK</span>{" "}
              <span className="text-[#00e566]">TECHNOLOGY</span>
            </span>
            , We simplify your business operations by streamlining processes and
            reducing complexity, allowing you to focus on core activities.{" "}
            <span className="font-semibold">
              <span className="text-[#212ff5]">KMK</span>{" "}
            </span>
            innovates continuously to deliver cutting-edge solutions and exceed
            industry standards. Through these efforts, we aim to provide
            unparalleled value and foster lasting relationships with our
            clients.
          </p>
          {/* <a
            href="#learn-more"
            className="inline-block bg-white text-blue-500 font-semibold px-8 py-3 rounded-full hover:bg-blue-100 transition duration-300 transform hover:scale-105"
          >
            Learn More
          </a> */}
        </motion.div>
        <div className="md:w-1/2 flex justify-center mt-12 md:mt-0">
          <img
            src={"svg/introduce/manager.svg"}
            alt=""
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 flex justify-center mt-12 md:mt-0">
          <img
            src={"svg/introduce/analyze.svg"}
            alt=""
            className="w-full h-auto"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: "70px" }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 text-white"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Empowering Innovation
            <br />
            <span className="text-3xl md:text-5xl">Ensuring Reliability</span>
          </h1>
          <p className="text-sm md:text-lg lg:text-xl mb-6 leading-relaxed">
            Our vision is to be a leading provider of innovative and reliable
            technology solutions that empower businesses to achieve their full
            potential. We strive to continuously evolve and adapt to the
            ever-changing technological landscape, ensuring that our products
            and services not only meet but exceed the expectations of our
            partners and clients. By fostering a culture of creativity,
            collaboration, and excellence, we aim to build lasting relationships
            and drive sustainable growth for all stakeholders.
          </p>
          {/* <a
            href="#learn-more"
            className="inline-block bg-white text-blue-500 font-semibold px-8 py-3 rounded-full hover:bg-blue-100 transition duration-300 transform hover:scale-105"
          >
            Learn More
          </a> */}
        </motion.div>
      </div>
    </section>
  );
};

export default Introduction;
