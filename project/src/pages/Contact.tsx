import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Address',
      details: 'contact@visionmines.com',
      link: 'mailto:contact@visionmines.com'
    },
    {
      icon: Phone,
      title: 'Phone Number',
      details: '+1 (555) 123-MINE',
      link: 'tel:+15551234463'
    },
    {
      icon: MapPin,
      title: 'Head Office',
      details: '1234 Mining District, Industrial Zone, City State 12345'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Monday - Friday: 8:00 AM - 6:00 PM'
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
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get in touch with our team for any inquiries about our mining safety solutions
            or PPE management systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Our team is here to help you implement the best safety solutions for your mining operations. 
                Reach out to us through any of the following channels.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                >
                  <item.icon className="h-6 w-6 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    {item.link ? (
                      <a 
                        href={item.link}
                        className="text-gray-400 hover:text-amber-500 transition-colors duration-200"
                      >
                        {item.details}
                      </a>
                    ) : (
                      <p className="text-gray-400">{item.details}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-800 p-8 rounded-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder="Enter your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-amber-500 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-amber-400 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-green-400 mb-2">Message Sent!</h3>
                <p className="text-gray-400">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Map/Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gray-800 p-8 rounded-xl"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Why Choose Vision Mines?</h2>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
              With over a decade of experience in mining safety solutions, we provide comprehensive 
              PPE management systems that ensure compliance, reduce incidents, and protect your most 
              valuable asset - your workforce. Our innovative approach combines cutting-edge technology 
              with deep industry expertise to deliver solutions that make a real difference.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;