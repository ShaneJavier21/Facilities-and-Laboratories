import React, { useState } from 'react';
import { 
  FileText, 
  Users, 
  Download, 
  Upload, 
  Eye,
  Edit,
  Trash2,
  Plus,
  Building2,
  Phone,
  Mail,
  Calendar,
  X
} from 'lucide-react';
import { mockOOMDocuments, mockPersonnelData } from '../../data/mockData';

export const AdminAffairs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'documents' | 'personnel' | 'orgchart'>('documents');
  const [showAddDocModal, setShowAddDocModal] = useState(false);
  const [documents] = useState(mockOOMDocuments);
  const [personnel] = useState(mockPersonnelData);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Administrative Affairs</h1>
          <p className="text-gray-600">VP Administration Office Management</p>
        </div>
        <button 
          onClick={() => setShowAddDocModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-essu-green-600 to-essu-gold-600 text-white rounded-lg hover:from-essu-green-700 hover:to-essu-gold-700 transition-all duration-200 flex items-center space-x-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Document</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'documents'
                  ? 'border-essu-green-500 text-essu-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Documents & OOM
            </button>
            <button
              onClick={() => setActiveTab('personnel')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'personnel'
                  ? 'border-essu-green-500 text-essu-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Personnel & PDS
            </button>
            <button
              onClick={() => setActiveTab('orgchart')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orgchart'
                  ? 'border-essu-green-500 text-essu-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Building2 className="w-4 h-4 inline mr-2" />
              Organizational Chart
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Office Operations Manual & Documents</h2>
                <button className="px-3 py-2 bg-essu-green-600 text-white rounded-lg hover:bg-essu-green-700 transition-colors flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload Document</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                  <div key={doc.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-gradient-to-br from-essu-green-50 to-essu-gold-50 rounded-lg">
                        <FileText className="w-6 h-6 text-essu-green-600" />
                      </div>
                      <div className="flex space-x-1">
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-essu-green-600 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">{doc.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>{doc.category}</span>
                      <span>{doc.uploadDate}</span>
                    </div>
                    
                    <button className="w-full px-3 py-2 bg-gradient-to-r from-essu-green-600 to-essu-gold-600 text-white rounded-lg hover:from-essu-green-700 hover:to-essu-gold-700 transition-all duration-200 flex items-center justify-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personnel Tab */}
          {activeTab === 'personnel' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Personnel Data Sheet (PDS)</h2>
                <button className="px-3 py-2 bg-essu-green-600 text-white rounded-lg hover:bg-essu-green-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Personnel</span>
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Position
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date Hired
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {personnel.map((person) => (
                        <tr key={person.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-essu-green-500 to-essu-gold-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-sm font-medium text-white">
                                  {person.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                <div className="text-sm text-gray-500">{person.employeeId}</div>
                              </div>
                            </div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{person.position}</div>
                            <div className="text-sm text-gray-500">{person.department}</div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                              <Mail className="w-3 h-3 mr-1" />
                              {person.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="w-3 h-3 mr-1" />
                              {person.phone}
                            </div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="w-4 h-4 mr-2" />
                              {new Date(person.dateHired).toLocaleDateString()}
                            </div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-essu-green-600 rounded">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Organizational Chart Tab */}
          {activeTab === 'orgchart' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Organizational Structure</h2>
                <button className="px-3 py-2 bg-essu-green-600 text-white rounded-lg hover:bg-essu-green-700 transition-colors flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Update Chart</span>
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 text-center">
                <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">VP for Administration Office</h3>
                <p className="text-gray-600 mb-6">Organizational Chart and Structure</p>
                
                <div className="bg-white rounded-lg p-6 border border-gray-200 max-w-2xl mx-auto">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-essu-green-50 to-essu-gold-50 p-4 rounded-lg border border-essu-green-200">
                      <h4 className="font-semibold text-essu-green-800">Dr. Carmen Reyes</h4>
                      <p className="text-sm text-essu-green-600">Vice President for Administration</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <h5 className="font-medium text-gray-800">Administrative Services</h5>
                        <ul className="text-sm text-gray-600 mt-2 space-y-1">
                          <li>• Records Management</li>
                          <li>• Personnel Services</li>
                          <li>• Budget & Finance</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <h5 className="font-medium text-gray-800">Support Services</h5>
                        <ul className="text-sm text-gray-600 mt-2 space-y-1">
                          <li>• Facilities Management</li>
                          <li>• Procurement</li>
                          <li>• General Services</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center space-x-4">
                  <button className="px-4 py-2 bg-gradient-to-r from-essu-green-600 to-essu-gold-600 text-white rounded-lg hover:from-essu-green-700 hover:to-essu-gold-700 transition-all duration-200 flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download Chart</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>View Full Chart</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Document Modal */}
      {showAddDocModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Document</h3>
              <button
                onClick={() => setShowAddDocModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500"
                  placeholder="e.g., Office Operations Manual 2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500">
                  <option>Operations Manual</option>
                  <option>Policy</option>
                  <option>Procedures</option>
                  <option>Forms</option>
                  <option>Reports</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500"
                  placeholder="Brief description of the document"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Document</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, DOC, DOCX</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddDocModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-essu-green-600 to-essu-gold-600 text-white rounded-lg hover:from-essu-green-700 hover:to-essu-gold-700"
                >
                  Upload Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};