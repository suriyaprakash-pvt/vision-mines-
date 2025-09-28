import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Shield, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const features = [
    {
      icon: Shield,
      title: 'PPE Management',
      description: 'Comprehensive tracking and management of personal protective equipment'
    },
    {
      icon: Users,
      title: 'Employee Safety',
      description: 'Monitor and ensure compliance across all mining operations'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Data-driven insights for improved safety performance'
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section with Parallax */}
      <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.pexels.com/photos/162568/coal-mine-dark-mine-162568.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
            }}
          />
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-white">Vision</span>{' '}
            <span className="text-amber-500">Mines</span>
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-4xl font-light mb-6 text-gray-200"
          >
            PPE Management System
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-gray-300 font-light"
          >
            Ensuring Safety Through Innovation and Technology
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
          >
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-amber-500 text-gray-900 font-semibold rounded-lg hover:bg-amber-400 transition-all duration-300 transform hover:scale-105"
            >
              View Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/ppe-enquiries"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              PPE Enquiries
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Comprehensive Safety Solutions</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our integrated platform ensures every worker has access to proper protective equipment
              and maintains the highest safety standards in mining operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-700 p-8 rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
              >
                <feature.icon className="h-12 w-12 text-amber-500 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;