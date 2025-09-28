import { motion } from 'framer-motion';
import { useState } from 'react';
import { Upload, Send, CheckCircle, X, FileText, AlertCircle } from 'lucide-react';

interface Enquiry {
  id: string;
  employeeId: string;
  employeeName: string;
  teamLead: string;
  items: { item: string; quantity: number }[];
  documents: File[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
}

const PPEEnquiries = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    teamLead: '',
    contactNumber: ''
  });
  
  const [selectedItems, setSelectedItems] = useState<{ item: string; quantity: number }[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [showAdminView, setShowAdminView] = useState(false);

  const ppeItems = [
    'Hard Hat/Helmet',
    'Safety Vest',
    'Work Gloves',
    'Safety Boots',
    'Safety Goggles',
    'Ear Protection',
    'Respirator Mask',
    'Fall Protection Harness',
    'High-Visibility Clothing',
    'Knee Pads',
    'Cut-Resistant Gloves',
    'Safety Glasses'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addPPEItem = () => {
    setSelectedItems([...selectedItems, { item: '', quantity: 1 }]);
  };

  const updatePPEItem = (index: number, field: string, value: string | number) => {
    const updated = selectedItems.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setSelectedItems(updated);
  };

  const removePPEItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEnquiry: Enquiry = {
      id: `ENQ-${Date.now()}`,
      employeeId: formData.employeeId,
      employeeName: formData.employeeName,
      teamLead: formData.teamLead,
      items: selectedItems.filter(item => item.item && item.quantity > 0),
      documents: uploadedFiles,
      status: 'pending',
      submittedAt: new Date()
    };

    setEnquiries([...enquiries, newEnquiry]);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ employeeId: '', employeeName: '', teamLead: '', contactNumber: '' });
      setSelectedItems([]);
      setUploadedFiles([]);
    }, 3000);
  };

  const updateEnquiryStatus = (id: string, status: 'approved' | 'rejected') => {
    setEnquiries(enquiries.map(enq => 
      enq.id === id ? { ...enq, status } : enq
    ));
  };

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
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6">PPE Enquiries</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Request personal protective equipment for your mining operations. 
            Complete the form below to submit your PPE requirements.
          </p>
        </motion.div>

        {/* Toggle Admin View */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setShowAdminView(false)}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                !showAdminView ? 'bg-amber-500 text-gray-900' : 'text-gray-400 hover:text-white'
              }`}
            >
              Submit Enquiry
            </button>
            <button
              onClick={() => setShowAdminView(true)}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                showAdminView ? 'bg-amber-500 text-gray-900' : 'text-gray-400 hover:text-white'
              }`}
            >
              Admin View ({enquiries.length})
            </button>
          </div>
        </div>

        {!showAdminView ? (
          /* Enquiry Form */
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl space-y-8">
                {/* Employee Information */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Employee Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Employee ID *
                      </label>
                      <input
                        type="text"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="EMP1001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Employee Name *
                      </label>
                      <input
                        type="text"
                        name="employeeName"
                        value={formData.employeeName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Team Lead *
                      </label>
                      <input
                        type="text"
                        name="teamLead"
                        value={formData.teamLead}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Team lead name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* PPE Items */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">PPE Items Requested</h2>
                    <button
                      type="button"
                      onClick={addPPEItem}
                      className="bg-amber-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors duration-200"
                    >
                      Add Item
                    </button>
                  </div>
                  
                  {selectedItems.length === 0 && (
                    <p className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg">
                      No PPE items added yet. Click "Add Item" to get started.
                    </p>
                  )}

                  {selectedItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-700 rounded-lg"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          PPE Item
                        </label>
                        <select
                          value={item.item}
                          onChange={(e) => updatePPEItem(index, 'item', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          <option value="">Select PPE Item</option>
                          {ppeItems.map(ppeItem => (
                            <option key={ppeItem} value={ppeItem}>{ppeItem}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Quantity
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updatePPEItem(index, 'quantity', parseInt(e.target.value))}
                          className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => removePPEItem(index)}
                          className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* File Upload */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Supporting Documents (Optional)</h2>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8">
                    <div className="text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400 mb-4">
                        Upload any supporting documents (e.g., damage reports, replacement requests)
                      </p>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <label
                        htmlFor="file-upload"
                        className="bg-amber-500 text-gray-900 px-6 py-2 rounded-lg cursor-pointer hover:bg-amber-400 transition-colors duration-200"
                      >
                        Choose Files
                      </label>
                    </div>
                    
                    {uploadedFiles.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-300 mb-3">Uploaded Files:</h3>
                        <div className="space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-amber-500 mr-3" />
                                <span className="text-sm">{file.name}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={selectedItems.length === 0}
                    className="bg-amber-500 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-amber-400 disabled:bg-gray-600 disabled:text-gray-400 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>Submit PPE Enquiry</span>
                  </motion.button>
                </div>
              </form>
            ) : (
              /* Success Message */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-800 p-12 rounded-xl text-center"
              >
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-green-400 mb-4">Enquiry Submitted Successfully!</h2>
                <p className="text-gray-400 text-lg mb-6">
                  Your PPE enquiry has been submitted and is now being processed. 
                  You will be notified once it's approved and ready for collection.
                </p>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-300">
                    <strong>Enquiry ID:</strong> ENQ-{Date.now()}
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    <strong>Status:</strong> Pending Review
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* Admin View */
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800 p-8 rounded-xl"
          >
            <h2 className="text-2xl font-bold mb-6">PPE Enquiry Management</h2>
            
            {enquiries.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No PPE enquiries submitted yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {enquiries.map((enquiry, index) => (
                  <motion.div
                    key={enquiry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-700 p-6 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{enquiry.employeeName}</h3>
                        <p className="text-gray-400">ID: {enquiry.employeeId} | Team Lead: {enquiry.teamLead}</p>
                        <p className="text-sm text-gray-500">
                          Submitted: {enquiry.submittedAt.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          enquiry.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          enquiry.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Requested Items:</h4>
                      <div className="space-y-1">
                        {enquiry.items.map((item, itemIndex) => (
                          <p key={itemIndex} className="text-gray-300">
                            • {item.item} - Quantity: {item.quantity}
                          </p>
                        ))}
                      </div>
                    </div>

                    {enquiry.documents.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Documents:</h4>
                        <div className="flex flex-wrap gap-2">
                          {enquiry.documents.map((doc, docIndex) => (
                            <span key={docIndex} className="bg-gray-600 px-3 py-1 rounded text-sm">
                              {doc.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {enquiry.status === 'pending' && (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => updateEnquiryStatus(enquiry.id, 'approved')}
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateEnquiryStatus(enquiry.id, 'rejected')}
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-200"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PPEEnquiries;