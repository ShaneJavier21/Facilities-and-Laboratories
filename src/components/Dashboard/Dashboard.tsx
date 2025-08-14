import React from 'react';
import { useState } from 'react';
import { 
  Building2, 
  Calendar, 
  Wrench, 
  HeadphonesIcon, 
  Package, 
  Users,
  TrendingUp,
  AlertTriangle,
  X,
  Plus
} from 'lucide-react';
import { mockReportsData, mockEquipment, mockFacilities } from '../../data/mockData';
export const Dashboard: React.FC = () => {
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showEquipmentDropdown, setShowEquipmentDropdown] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const data = mockReportsData;
  
  const stats = [
    { name: 'Total Facilities', value: '48', icon: Building2, change: '+2', changeType: 'positive' },
    { name: 'Today\'s Bookings', value: data.monthlyBookings.toString(), icon: Calendar, change: '+3', changeType: 'positive' },
    { name: 'Pending Maintenance', value: data.openMaintenanceIssues.toString(), icon: Wrench, change: '-2', changeType: 'negative' },
    { name: 'Open Requests', value: '15', icon: HeadphonesIcon, change: '+5', changeType: 'positive' },
    { name: 'Equipment In Use', value: '89', icon: Package, change: '+12', changeType: 'positive' },
    { name: 'Active Users', value: '156', icon: Users, change: '+8', changeType: 'positive' },
  ];

  const recentActivity = [
  {
    id: 1,
    type: 'reservation',
    message: 'Conference Room A booked for Board Meeting',
    time: '2 minutes ago',
    status: 'approved'
  },
  {
    id: 2,
    type: 'maintenance',
    message: 'Air conditioning unit repair in Building B',
    time: '15 minutes ago',
    status: 'in_progress'
  },
  {
    id: 3,
    type: 'service',
    message: 'IT support requested for Computer Lab 1',
    time: '1 hour ago',
    status: 'pending'
  },
  {
    id: 4,
    type: 'equipment',
    message: 'Projector checked out for Auditorium',
    time: '2 hours ago',
    status: 'completed'
  }
];

  const upcomingBookings = [
  {
    id: 1,
    facility: 'Auditorium',
    time: '10:00 AM - 12:00 PM',
    purpose: 'Graduation Ceremony Rehearsal',
    requester: 'Office of Student Affairs'
  },
  {
    id: 2,
    facility: 'Conference Room B',
    time: '2:00 PM - 4:00 PM',
    purpose: 'Department Meeting',
    requester: 'College of Engineering'
  },
  {
    id: 3,
    facility: 'Computer Lab 2',
    time: '3:00 PM - 5:00 PM',
    purpose: 'Programming Class',
    requester: 'ICT Department'
  }
  ];

  // Get available equipment (not in maintenance or retired)
  const availableEquipment = mockEquipment.filter(
    equipment => equipment.status === 'available'
  );

  const handleEquipmentChange = (equipmentId: string) => {
    setSelectedEquipment(prev => {
      if (prev.includes(equipmentId)) {
        return prev.filter(id => id !== equipmentId);
      } else {
        return [...prev, equipmentId];
      }
    });
  };

  const handleReservationModalClose = () => {
    setShowReservationModal(false);
    setShowEquipmentDropdown(false);
    setSelectedEquipment([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to ESSU Facilities Management System</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowReservationModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-essu-green-600 to-essu-gold-600 text-white rounded-lg hover:from-essu-green-700 hover:to-essu-gold-700 transition-all duration-200 shadow-md"
          >
            New Reservation
          </button>
          <button 
            onClick={() => setShowIssueModal(true)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md"
          >
            Report Issue
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-essu-green-50 to-essu-gold-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-essu-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className={`w-4 h-4 mr-1 ${
                stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
              }`} />
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'approved' ? 'bg-green-500' :
                    activity.status === 'in_progress' ? 'bg-yellow-500' :
                    activity.status === 'pending' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activity.status === 'approved' ? 'bg-green-100 text-green-800' :
                    activity.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                    activity.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {activity.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Today's Bookings</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{booking.facility}</h4>
                      <p className="text-sm text-gray-600 mt-1">{booking.purpose}</p>
                      <p className="text-xs text-gray-500 mt-1">by {booking.requester}</p>
                    </div>
                    <span className="text-sm font-medium text-essu-green-600">{booking.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
            System Alerts
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Maintenance Overdue</p>
                  <p className="text-xs text-yellow-600">3 equipment items require immediate attention</p>
                </div>
              </div>
              <button className="text-xs font-medium text-yellow-800 hover:text-yellow-900">
                View Details
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-essu-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-essu-green-600" />
                <div>
                  <p className="text-sm font-medium text-essu-green-800">High Booking Volume</p>
                  <p className="text-xs text-essu-green-600">Conference rooms are 90% booked this week</p>
                </div>
              </div>
              <button className="text-xs font-medium text-essu-green-800 hover:text-essu-green-900">
                View Schedule
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Reservation Modal */}
      {showReservationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">New Reservation</h3>
              <button
                onClick={handleReservationModalClose}
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
                  onClick={handleReservationModalClose}
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

      {/* Report Issue Modal */}
      {showIssueModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Report Issue</h3>
              <button
                onClick={() => setShowIssueModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500"
                  placeholder="Brief description of the issue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500">
                  <option>Computer Lab A</option>
                  <option>Audio-Visual Room</option>
                  <option>Gymnasium</option>
                  <option>Board Room</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500"
                  placeholder="Detailed description of the issue"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-essu-green-600 to-essu-gold-600 text-white rounded-lg hover:from-essu-green-700 hover:to-essu-gold-700"
                >
                  Report Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};