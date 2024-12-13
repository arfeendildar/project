import React, { useState } from 'react';
import { Plus, Filter, Search } from 'lucide-react';

// Mock certification data
const mockCertifications = [
  {
    id: '1',
    title: 'React Professional',
    issuer: 'Udemy',
    dateEarned: '2023-06-15',
    status: 'verified'
  },
  {
    id: '2',
    title: 'Data Science Essentials',
    issuer: 'Coursera',
    dateEarned: '2023-09-20',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Cloud Computing Fundamentals',
    issuer: 'Google Cloud',
    dateEarned: '2024-01-10',
    status: 'verified'
  },
  {
    id: '4',
    title: 'Machine Learning Specialist',
    issuer: 'Stanford Online',
    dateEarned: '2023-11-05',
    status: 'draft'
  }
];

// Certification Card Component
const CertificationCard = ({ certification, onView }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition-shadow">
      <div>
        <h3 className="text-lg font-semibold">{certification.title}</h3>
        <p className="text-gray-600">{certification.issuer}</p>
        <p className="text-sm text-gray-500">Earned on: {new Date(certification.dateEarned).toLocaleDateString()}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(certification.status)}`}>
          {certification.status.charAt(0).toUpperCase() + certification.status.slice(1)}
        </span>
        <button 
          onClick={() => onView(certification.id)}
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const Certifications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);

  const filteredCertifications = mockCertifications.filter(certification => {
    const matchesStatus = statusFilter === 'all' || certification.status === statusFilter;
    const matchesSearch = 
      certification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certification.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCreateCertification = (data) => {
    console.log('Creating certification:', data);
    setShowForm(false);
  };

  const handleViewCertification = (id) => {
    console.log('Viewing certification:', id);
    // Future: Implement modal or navigation to certification details
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Certifications</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add Certification
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search certifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredCertifications.map(certification => (
          <CertificationCard
            key={certification.id}
            certification={certification}
            onView={handleViewCertification}
          />
        ))}
      </div>

      {filteredCertifications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No certifications found matching your criteria.</p>
        </div>
      )}

      {/* Future: Implement certification form when showForm is true */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Add Certification</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleCreateCertification({
                title: e.target.title.value,
                issuer: e.target.issuer.value,
                dateEarned: e.target.dateEarned.value,
                status: e.target.status.value
              });
            }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  required 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Issuer</label>
                <input 
                  type="text" 
                  name="issuer" 
                  required 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date Earned</label>
                <input 
                  type="date" 
                  name="dateEarned" 
                  required 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select 
                  name="status" 
                  required 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                >
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certifications;
