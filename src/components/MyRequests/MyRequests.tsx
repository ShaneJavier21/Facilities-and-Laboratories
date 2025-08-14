import React, { useState } from 'react';
import { 
  User, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Calendar,
  MapPin,
  Wrench,
  HeadphonesIcon,
  AlertTriangle,
  Filter,
  Search
} from 'lucide-react';
import { Reservation, MaintenanceRequest, ServiceRequest } from '../../types';
import { mockReservations, mockMaintenanceRequests, mockServiceRequests, mockFacilities } from '../../data/mockData';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-gray-100 text-gray-800',
  open: 'bg-red-100 text-red-800',
  assigned: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  closed: 'bg-gray-100 text-gray-800'
};

export const MyRequests: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'submitted' | 'approval'>('submitted');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get user's submitted requests
  const userReservations = mockReservations.filter(r => r.requesterId === user?.id);
  const userMaintenanceRequests = mockMaintenanceRequests.filter(r => r.requesterId === user?.id);
  const userServiceRequests = mockServiceRequests.filter(r => r.requesterId === user?.id);

  // Get requests requiring user's approval based on role
  const getRequestsForApproval = () => {
    const approvalRequests: any[] = [];
    
    if (!user) return approvalRequests;
    
    // Get reservations for facilities where user is personnel in charge
    const userFacilities = mockFacilities.filter(f => f.personnelInCharge === user?.id);
    const userFacilityIds = userFacilities.map(f => f.id);
    
    // Add reservations for user's assigned facilities
    const facilityReservations = mockReservations.filter(r => 
      (r.status === 'pending' || r.status === 'approved') && userFacilityIds.includes(r.facilityId)
    ).map(r => ({
      ...r,
      type: 'reservation'
    }));
    approvalRequests.push(...facilityReservations);
    
    // Additional role-based approvals
    if (user?.role === 'facility_manager' || user?.role === 'system_admin') {
      // Facility managers and system admins can approve all pending reservations
      const allPendingReservations = mockReservations.filter(r => 
        (r.status === 'pending' || r.status === 'approved') && !userFacilityIds.includes(r.facilityId)
      ).map(r => ({
        ...r,
        type: 'reservation'
      }));
      approvalRequests.push(...allPendingReservations);
    }

    if (user?.role === 'maintenance_personnel' || user?.role === 'facility_manager' || user?.role === 'system_admin') {
      // Maintenance personnel and managers can handle maintenance requests
      const openMaintenance = mockMaintenanceRequests.filter(r => 
        r.status === 'open' || r.status === 'assigned' || r.status === 'in_progress'
      ).map(r => ({
        ...r,
        type: 'maintenance'
      }));
      approvalRequests.push(...openMaintenance);
    }

    if (user?.role === 'it_av_staff' || user?.role === 'system_admin') {
      // IT/AV staff can handle service requests
      const pendingServices = mockServiceRequests.filter(r => 
        r.status === 'pending' || r.status === 'assigned' || r.status === 'in_progress'
      ).map(r => ({
        ...r,
        type: 'service'
      }));
      approvalRequests.push(...pendingServices);
    }

    return approvalRequests;
  };

  const approvalRequests = getRequestsForApproval();

  // Combine all user requests for the submitted tab
  const allUserRequests = [
    ...userReservations.map(r => ({ ...r, type: 'reservation' as const })),
    ...userMaintenanceRequests.map(r => ({ ...r, type: 'maintenance' as const })),
    ...userServiceRequests.map(r => ({ ...r, type: 'service' as const }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Filter requests
  const filterRequests = (requests: any[]) => {
    return requests.filter(request => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
                           request.title?.toLowerCase().includes(searchLower) ||
                           request.purpose?.toLowerCase().includes(searchLower) ||
                           request.facilityName?.toLowerCase().includes(searchLower) ||
                           request.description?.toLowerCase().includes(searchLower);
      const matchesType = filterType === 'all' || request.type === filterType;
      const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  };

  const filteredSubmittedRequests = filterRequests(allUserRequests);
  const filteredApprovalRequests = filterRequests(approvalRequests);

  // Debug logging
  console.log('User:', user);
  console.log('All User Requests:', allUserRequests);
  console.log('Approval Requests:', approvalRequests);

  const handleApprove = (requestId: string, type: string) => {
    // In a real app, this would make an API call
    console.log(`Approving ${type} request ${requestId}`);
    // Show success message or update state
  };

  const handleReject = (requestId: string, type: string) => {
    // In a real app, this would make an API call
    console.log(`Rejecting ${type} request ${requestId}`);
    // Show success message or update state
  };

  const getRequestIcon = (type: string) => {
    switch (type) {
      case 'reservation': return Calendar;
      case 'maintenance': return Wrench;
      case 'service': return HeadphonesIcon;
      default: return User;
    }
  };

  const getRequestTypeLabel = (type: string) => {
    switch (type) {
      case 'reservation': return 'Reservation';
      case 'maintenance': return 'Maintenance';
      case 'service': return 'Service Request';
      default: return 'Request';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
          <p className="text-gray-600">Overview of your submitted requests and approval tasks</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Submitted</p>
              <p className="text-2xl font-bold text-gray-900">{allUserRequests.length}</p>
            </div>
            <User className="w-8 h-8 text-essu-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {allUserRequests.filter(r => r.status === 'pending' || r.status === 'open').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {allUserRequests.filter(r => r.status === 'approved' || r.status === 'completed').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Need Approval</p>
              <p className="text-2xl font-bold text-orange-600">{approvalRequests.length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('submitted')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'submitted'
                  ? 'border-essu-green-500 text-essu-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              My Submitted Requests ({allUserRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('approval')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'approval'
                  ? 'border-essu-green-500 text-essu-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <AlertTriangle className="w-4 h-4 inline mr-2" />
              Pending Approvals ({approvalRequests.length})
            </button>
          </nav>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500"
              >
                <option value="all">All Types</option>
                <option value="reservation">Reservations</option>
                <option value="maintenance">Maintenance</option>
                <option value="service">Service Requests</option>
              </select>
              
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
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Submitted Requests Tab */}
          {activeTab === 'submitted' && (
            <div className="space-y-4">
              {filteredSubmittedRequests.length === 0 ? (
                <div className="text-center py-12">
                  <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
                  <p className="text-gray-600">You haven't submitted any requests yet or none match your filters.</p>
                </div>
              ) : (
                filteredSubmittedRequests.map((request) => {
                  const IconComponent = getRequestIcon(request.type);
                  
                  return (
                    <div key={`${request.type}-${request.id}`} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="p-3 bg-gradient-to-br from-essu-green-50 to-essu-gold-50 rounded-lg">
                            <IconComponent className="w-6 h-6 text-essu-green-600" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {request.title || request.purpose || request.facilityName}
                              </h3>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {getRequestTypeLabel(request.type)}
                              </span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                                {request.status.replace('_', ' ')}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 mb-3">
                              {request.description || request.purpose || 'No description available'}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>
                                  {request.startDateTime 
                                    ? format(new Date(request.startDateTime), 'MMM dd, yyyy HH:mm')
                                    : format(new Date(request.createdAt), 'MMM dd, yyyy HH:mm')
                                  }
                                </span>
                              </div>
                              
                              {request.facilityName && (
                                <div className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-2" />
                                  <span>{request.facilityName}</span>
                                </div>
                              )}
                              
                              {request.location && (
                                <div className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-2" />
                                  <span>{request.location}</span>
                                </div>
                              )}
                              
                              {request.priority && (
                                <div className="flex items-center">
                                  <AlertTriangle className="w-4 h-4 mr-2" />
                                  <span className="capitalize">{request.priority} Priority</span>
                                </div>
                              )}
                            </div>
                            
                            {request.approvedBy && (
                              <div className="mt-2 text-sm text-green-600">
                                <span className="font-medium">Approved by:</span> {request.approvedBy}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Approval Requests Tab */}
          {activeTab === 'approval' && (
            <div className="space-y-4">
              {filteredApprovalRequests.length === 0 ? (
                <div className="text-center py-12">
                  <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No pending approvals</h3>
                  <p className="text-gray-600">There are no requests requiring your approval at this time.</p>
                </div>
              ) : (
                filteredApprovalRequests.map((request) => {
                  const IconComponent = getRequestIcon(request.type);
                  
                  return (
                    <div key={`${request.type}-${request.id}`} className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 hover:shadow-md transition-shadow duration-200">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="p-3 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg">
                            <IconComponent className="w-6 h-6 text-orange-600" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {request.title || request.purpose || request.facilityName}
                              </h3>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                {getRequestTypeLabel(request.type)}
                              </span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                                {request.status.replace('_', ' ')}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 mb-3">
                              {request.description || request.purpose || 'No description available'}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                <span>Requested by: {request.requesterName}</span>
                              </div>
                              
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>
                                  {request.startDateTime 
                                    ? format(new Date(request.startDateTime), 'MMM dd, yyyy HH:mm')
                                    : format(new Date(request.createdAt), 'MMM dd, yyyy HH:mm')
                                  }
                                </span>
                              </div>
                              
                              {request.priority && (
                                <div className="flex items-center">
                                  <AlertTriangle className="w-4 h-4 mr-2" />
                                  <span className="capitalize">{request.priority} Priority</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex space-x-3">
                              <button
                                onClick={() => handleApprove(request.id, request.type)}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => handleReject(request.id, request.type)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                              >
                                <XCircle className="w-4 h-4" />
                                <span>Reject</span>
                              </button>
                              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                                <Eye className="w-4 h-4" />
                                <span>View Details</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};