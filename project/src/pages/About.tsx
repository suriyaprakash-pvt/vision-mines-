import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, Shield, Cog } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Safety is our top priority in every operation and decision we make.'
    },
    {
      icon: Users,
      title: 'Team Excellence',
      description: 'Our dedicated professionals ensure the highest standards of performance.'
    },
    {
      icon: Cog,
      title: 'Innovation',
      description: 'We leverage cutting-edge technology to improve mining operations.'
    },
    {
      icon: Award,
      title: 'Quality Standards',
      description: 'We maintain exceptional quality in all our processes and deliverables.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-20 min-h-screen bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">About Vision Mines</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Leading the future of mining operations through innovative safety management 
            and cutting-edge technology solutions.
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-96 mb-16 rounded-2xl overflow-hidden"
        >
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop')`
            }}
          />
        </motion.div>

        {/* Mission and Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-800 p-8 rounded-xl"
          >
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-amber-500 mr-4" />
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              To revolutionize mining safety through comprehensive PPE management systems, 
              ensuring every worker returns home safely while maintaining operational excellence 
              and environmental responsibility.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gray-800 p-8 rounded-xl"
          >
            <div className="flex items-center mb-6">
              <Eye className="h-8 w-8 text-amber-500 mr-4" />
              <h2 className="text-3xl font-bold">Our Vision</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              To be the global leader in mining safety technology, setting new standards 
              for worker protection and operational efficiency through innovative digital 
              solutions and data-driven insights.
            </p>
          </motion.div>
        </div>

        {/* Project Objectives */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Project Objectives</h2>
          <div className="bg-gray-800 p-8 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-amber-500">Primary Goals</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Implement comprehensive PPE tracking and management system
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Monitor real-time compliance across all mining operations
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Reduce workplace incidents through proactive safety measures
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Streamline PPE procurement and distribution processes
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-amber-500">Key Features</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Digital employee management dashboard
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Automated PPE compliance reporting
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Online PPE requisition and tracking system
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Advanced analytics and performance insights
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-700 transition-colors duration-300"
              >
                <value.icon className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;