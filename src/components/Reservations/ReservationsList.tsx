import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Search, 
  Filter, 
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  Edit,
  X
} from 'lucide-react';
import { Reservation } from '../../types';
import { mockReservations, mockEquipment, mockFacilities } from '../../data/mockData';
import { format } from 'date-fns';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-gray-100 text-gray-800'
};

export const ReservationsList: React.FC = () => {
  const [reservations] = useState<Reservation[]>(mockReservations);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showEquipmentDropdown, setShowEquipmentDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  // Get available equipment (not in maintenance or retired)
  const availableEquipment = mockEquipment.filter(
    equipment => equipment.status === 'available'
  );

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || reservation.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleEquipmentChange = (equipmentId: string) => {
    setSelectedEquipment(prev => {
      if (prev.includes(equipmentId)) {
        return prev.filter(id => id !== equipmentId);
      } else {
        return [...prev, equipmentId];
      }
    });
  };

  const handleModalClose = () => {
    setShowNewModal(false);
    setShowEquipmentDropdown(false);
    setSelectedEquipment([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
          <p className="text-gray-600">Manage facility bookings and reservations</p>
        </div>
        <button 
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-essu-green-600 to-essu-gold-600 text-white rounded-lg hover:from-essu-green-700 hover:to-essu-gold-700 transition-all duration-200 flex items-center space-x-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Reservation</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search reservations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500"
              />
            </div>
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Reservations List */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Facility & Purpose
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {reservation.facilityName}
                      </div>
                      <div className="text-sm text-gray-600">{reservation.purpose}</div>
                      {reservation.equipmentRequested && reservation.equipmentRequested.length > 0 && (
                        <div className="mt-1">
                          <span className="text-xs text-gray-500">Equipment: </span>
                          <span className="text-xs text-gray-600">
                            {reservation.equipmentRequested.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-essu-green-500 to-essu-gold-500 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {reservation.requesterName}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {reservation.requesterId}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <div>
                        <div>{format(new Date(reservation.startDateTime), 'MMM dd, yyyy')}</div>
                        <div className="text-xs text-gray-500">
                          {format(new Date(reservation.startDateTime), 'HH:mm')} - {format(new Date(reservation.endDateTime), 'HH:mm')}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[reservation.status]}`}>
                      {reservation.status}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      {reservation.status === 'pending' && (
                        <>
                          <button className="p-1 text-gray-400 hover:text-green-600 rounded">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600 rounded">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      
                      <button className="p-1 text-gray-400 hover:text-essu-green-600 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredReservations.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reservations found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* New Reservation Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">New Reservation</h3>
              <button
                onClick={handleModalClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facility</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500">
                  <option value="">Select a facility</option>
                  {mockFacilities.map((facility) => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name} - {facility.building}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500"
                  placeholder="Meeting, Class, Event, Workshop..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Needed</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowEquipmentDropdown(!showEquipmentDropdown)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500 bg-white text-left flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-700">
                      {selectedEquipment.length === 0 
                        ? 'Select equipment...' 
                        : `${selectedEquipment.length} item(s) selected`
                      }
                    </span>
                    <svg className={`w-4 h-4 transition-transform ${showEquipmentDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showEquipmentDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {availableEquipment.length === 0 ? (
                        <div className="p-3 text-sm text-gray-500">No equipment available</div>
                      ) : (
                        <div className="p-2">
                          {availableEquipment.map((equipment) => (
                            <label key={equipment.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedEquipment.includes(equipment.id)}
                                onChange={() => handleEquipmentChange(equipment.id)}
                                className="rounded border-gray-300 text-essu-green-600 focus:ring-essu-green-500"
                              />
                              <span className="text-sm text-gray-700">
                                {equipment.name}
                                {equipment.serialNumber && (
                                  <span className="text-gray-500 ml-1">({equipment.serialNumber})</span>
                                )}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500"
                  placeholder="Any special requirements or notes"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-essu-green-600 to-essu-gold-600 text-white rounded-lg hover:from-essu-green-700 hover:to-essu-gold-700"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};