import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Search, Filter, Users, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock employee data
const generateEmployees = () => {
  const teamLeads = [
    'John Mitchell', 'Sarah Connor', 'Mike Johnson', 'Lisa Anderson', 
    'David Brown', 'Emma Wilson', 'Tom Harris', 'Anna Davis', 
    'Chris Taylor', 'Rachel Green'
  ];
  
  const names = [
    'Alex Thompson', 'Brian Clark', 'Catherine Lee', 'Daniel Martinez', 'Emily Rodriguez',
    'Frank Wilson', 'Grace Kim', 'Henry Adams', 'Isabella Garcia', 'Jack Nelson',
    'Kate Phillips', 'Liam Parker', 'Maya Singh', 'Nathan Cooper', 'Olivia Turner',
    'Paul Evans', 'Quinn Roberts', 'Ruby White', 'Sam Miller', 'Tara Johnson'
  ];

  const employees = [];
  let id = 1001;

  teamLeads.forEach((lead, leadIndex) => {
    // Add team lead
    employees.push({
      id: `EMP${id++}`,
      name: lead,
      contact: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      teamLead: 'Team Lead',
      ppeStatus: Math.random() > 0.1 ? 'Compliant' : 'Non-Compliant',
      isLead: true
    });

    // Add 5-6 team members per lead
    const teamSize = 5 + Math.floor(Math.random() * 2);
    for (let i = 0; i < teamSize; i++) {
      const randomName = names[Math.floor(Math.random() * names.length)];
      employees.push({
        id: `EMP${id++}`,
        name: `${randomName} ${leadIndex}${i}`,
        contact: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        teamLead: lead,
        ppeStatus: Math.random() > 0.15 ? 'Compliant' : 'Non-Compliant',
        isLead: false
      });
    }
  });

  return employees.slice(0, 60); // Ensure we have exactly what we need
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeamLead, setSelectedTeamLead] = useState('All');
  
  const employees = useMemo(() => generateEmployees(), []);
  const teamLeads = ['All', ...Array.from(new Set(employees.filter(emp => emp.isLead).map(emp => emp.name)))];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeamLead = selectedTeamLead === 'All' || 
                           employee.teamLead === selectedTeamLead ||
                           employee.name === selectedTeamLead;
    return matchesSearch && matchesTeamLead;
  });

  const stats = {
    totalEmployees: employees.length,
    compliant: employees.filter(emp => emp.ppeStatus === 'Compliant').length,
    nonCompliant: employees.filter(emp => emp.ppeStatus === 'Non-Compliant').length,
    teamLeads: teamLeads.length - 1 // Excluding 'All'
  };

  const pieData = [
    { name: 'Compliant', value: stats.compliant, color: '#10B981' },
    { name: 'Non-Compliant', value: stats.nonCompliant, color: '#EF4444' }
  ];

  const teamComplianceData = teamLeads.slice(1).map(lead => {
    const teamMembers = employees.filter(emp => emp.teamLead === lead || emp.name === lead);
    const compliant = teamMembers.filter(emp => emp.ppeStatus === 'Compliant').length;
    return {
      name: lead.split(' ')[0], // First name only for chart
      compliance: Math.round((compliant / teamMembers.length) * 100)
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-20 min-h-screen bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Safety Dashboard
        </motion.h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Employees', value: stats.totalEmployees, icon: Users, color: 'blue' },
            { label: 'PPE Compliant', value: stats.compliant, icon: CheckCircle, color: 'green' },
            { label: 'Non-Compliant', value: stats.nonCompliant, icon: AlertTriangle, color: 'red' },
            { label: 'Team Leads', value: stats.teamLeads, icon: Shield, color: 'amber' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gray-800 p-6 rounded-lg border-l-4 ${
                stat.color === 'blue' ? 'border-blue-500' :
                stat.color === 'green' ? 'border-green-500' :
                stat.color === 'red' ? 'border-red-500' : 'border-amber-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-12 w-12 ${
                  stat.color === 'blue' ? 'text-blue-500' :
                  stat.color === 'green' ? 'text-green-500' :
                  stat.color === 'red' ? 'text-red-500' : 'text-amber-500'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Overall PPE Compliance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-4">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Team Compliance Rates</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamComplianceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  stroke="#9CA3AF"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="compliance" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Employee Management Table */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-800 rounded-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-6">Employee Management</h2>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedTeamLead}
                onChange={(e) => setSelectedTeamLead(e.target.value)}
                className="pl-10 pr-8 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {teamLeads.map(lead => (
                  <option key={lead} value={lead}>{lead}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4">Employee ID</th>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Contact</th>
                  <th className="text-left py-3 px-4">Team Lead</th>
                  <th className="text-left py-3 px-4">PPE Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee, index) => (
                  <motion.tr
                    key={employee.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className={`border-b border-gray-700 hover:bg-gray-700/50 ${
                      employee.isLead ? 'bg-gray-700/30' : ''
                    }`}
                  >
                    <td className="py-3 px-4">{employee.id}</td>
                    <td className="py-3 px-4 font-medium">
                      {employee.name}
                      {employee.isLead && (
                        <span className="ml-2 text-xs bg-amber-500 text-gray-900 px-2 py-1 rounded">
                          LEAD
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">{employee.contact}</td>
                    <td className="py-3 px-4">{employee.teamLead}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                        employee.ppeStatus === 'Compliant' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {employee.ppeStatus === 'Compliant' ? (
                          <CheckCircle className="h-4 w-4 mr-1" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 mr-1" />
                        )}
                        {employee.ppeStatus}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            
            {filteredEmployees.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No employees found matching your search criteria.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;