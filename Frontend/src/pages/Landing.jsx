// import React, { useEffect } from "react";
// import { motion, useAnimation } from "framer-motion";
// import { useInView } from "react-intersection-observer";

// const FeatureCard = ({ title, description, icon, index }) => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({
//     threshold: 0.1,
//     triggerOnce: true,
//   });

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     }
//   }, [controls, inView]);

//   const variants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, delay: index * 0.1 },
//     },
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={controls}
//       variants={variants}
//       className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 hover:border-blue-400 transition-all duration-300"
//     >
//       <div className="text-blue-400 text-3xl mb-4">{icon}</div>
//       <h3 className="text-xl font-bold text-white">{title}</h3>
//       <p className="text-gray-400 mt-2">{description}</p>
//     </motion.div>
//   );
// };

// const LandingPage = () => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({
//     threshold: 0.1,
//     triggerOnce: true,
//   });

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     }
//   }, [controls, inView]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1, delayChildren: 0.3 },
//     },
//   };

//   const features = [
//     {
//       title: "Smart Meal Tracking",
//       description: "AI-powered meal tracking with predictive analytics",
//       icon: "🍽️",
//     },
//     {
//       title: "Expense Insights",
//       description: "Real-time expense monitoring with visual dashboards",
//       icon: "📊",
//     },
//     {
//       title: "Automated Bill Payments",
//       description: "Smart reminders and automated payment tracking",
//       icon: "💳",
//     },
//     {
//       title: "Role-Based Access",
//       description: "Granular permissions with multi-level admin controls",
//       icon: "👥",
//     },
//     {
//       title: "Advanced Reporting",
//       description: "Customizable reports with data export options",
//       icon: "📈",
//     },
//     {
//       title: "Instant Notifications",
//       description: "Push notifications for important updates and alerts",
//       icon: "🔔",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden relative">
//       {/* Hero Section */}
//       <header className="relative text-center py-32 bg-gradient-to-br from-gray-900 to-blue-900">
//         <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-gradient-to-br from-blue-900 to-purple-900"></div>

//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="relative z-10 max-w-4xl mx-auto px-6"
//         >
//           <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
//             Next-Gen Mess Management
//           </h1>
//           <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//             Harness the power of AI to transform your mess operations with predictive analytics and real-time insights.
//           </p>
//           <div className="mt-10 flex justify-center">
//             <motion.a
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               href="/signup"
//               className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
//             >
//               Get Started Free
//             </motion.a>
//           </div>
//         </motion.div>
//       </header>

//       {/* Features Section */}
//       <section className="relative py-20 px-6 max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
//             Smart Features for Modern Messes
//           </h2>
//           <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//             Our platform combines cutting-edge technology with intuitive design to deliver unparalleled efficiency.
//           </p>
//         </motion.div>

//         <motion.div
//           ref={ref}
//           initial="hidden"
//           animate={controls}
//           variants={containerVariants}
//           className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
//         >
//           {features.map((feature, index) => (
//             <FeatureCard
//               key={index}
//               title={feature.title}
//               description={feature.description}
//               icon={feature.icon}
//               index={index}
//             />
//           ))}
//         </motion.div>
//       </section>

//       {/* About Section */}
//       <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-blue-900/30 relative overflow-hidden">
//         <div className="absolute top-0 left-0 w-full h-full opacity-10">
//           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="max-w-5xl mx-auto text-center relative z-10"
//         >
//           <h2 className="text-4xl font-bold mb-8">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
//               The Future of Mess Management
//             </span>
//           </h2>
//           <p className="text-xl text-gray-300 mb-10">
//             Our AI-powered platform is transforming how hostels, dormitories, and shared accommodations manage their daily operations. 
//             With predictive analytics, automated reporting, and real-time monitoring, we bring tomorrow's technology to today's mess management.
//           </p>
//           <div className="grid md:grid-cols-3 gap-8 mt-12">
//             <motion.div 
//               whileHover={{ y: -10 }}
//               className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
//             >
//               <div className="text-blue-400 text-4xl mb-4">📱</div>
//               <h3 className="text-xl font-bold mb-2">Mobile First</h3>
//               <p className="text-gray-400">Fully responsive design works seamlessly on all devices</p>
//             </motion.div>
//             <motion.div 
//               whileHover={{ y: -10 }}
//               className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
//             >
//               <div className="text-purple-400 text-4xl mb-4">🤖</div>
//               <h3 className="text-xl font-bold mb-2">AI Powered</h3>
//               <p className="text-gray-400">Smart predictions and automated suggestions</p>
//             </motion.div>
//             <motion.div 
//               whileHover={{ y: -10 }}
//               className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
//             >
//               <div className="text-green-400 text-4xl mb-4">🔒</div>
//               <h3 className="text-xl font-bold mb-2">Secure</h3>
//               <p className="text-gray-400">Enterprise-grade security with end-to-end encryption</p>
//             </motion.div>
//           </div>
//         </motion.div>
//       </section>
//     </div>
//   );
// };

// export default LandingPage;


import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FeatureCard = ({ title, description, icon, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 hover:border-blue-400 transition-all duration-300"
    >
      <div className="text-blue-400 text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-400 mt-2">{description}</p>
    </motion.div>
  );
};

const LandingPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const features = [
    { title: "Smart Meal Tracking", description: "AI-powered meal tracking with predictive analytics", icon: "🍽️" },
    { title: "Expense Insights", description: "Real-time expense monitoring with visual dashboards", icon: "📊" },
    { title: "Automated Bill Payments", description: "Smart reminders and automated payment tracking", icon: "💳" },
    { title: "Role-Based Access", description: "Granular permissions with multi-level admin controls", icon: "👥" },
    { title: "Advanced Reporting", description: "Customizable reports with data export options", icon: "📈" },
    { title: "Instant Notifications", description: "Push notifications for important updates and alerts", icon: "🔔" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden relative">
      <header className="relative text-center py-32 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-gradient-to-br from-blue-900 to-purple-900"></div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-6"
        >
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
            Next-Gen Mess Management
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Harness the power of AI to transform your mess operations with predictive analytics and real-time insights.
          </p>
          <div className="mt-10 flex justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/signup"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Get Started Free
            </motion.a>
          </div>
        </motion.div>
      </header>

      <section className="relative py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Smart Features for Modern Messes
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with intuitive design to deliver unparalleled efficiency.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </motion.div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-blue-900/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl font-bold mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              The Future of Mess Management
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Our AI-powered platform is transforming how hostels, dormitories, and shared accommodations manage their daily operations. With predictive analytics, automated reporting, and real-time monitoring, we bring tomorrow's technology to today's mess management.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <motion.div whileHover={{ y: -10 }} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <div className="text-blue-400 text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">Mobile First</h3>
              <p className="text-gray-400">Fully responsive design works seamlessly on all devices</p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <div className="text-purple-400 text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">AI Powered</h3>
              <p className="text-gray-400">Smart predictions and automated suggestions</p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <div className="text-green-400 text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">Secure</h3>
              <p className="text-gray-400">Enterprise-grade security with end-to-end encryption</p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
