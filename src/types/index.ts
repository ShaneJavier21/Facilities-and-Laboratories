export interface User {
  id: string;
  name?: string;
  email: string;
  role?: string;
  department?: string;
  avatar?: string;
}

export type UserRole = 
  | 'system_admin'
  | 'facility_manager'
  | 'maintenance_personnel'
  | 'equipment_custodian'
  | 'vp_admin'
  | 'office_requester'
  | 'it_av_staff';

export interface Facility {
  id: string;
  name: string;
  type: 'classroom' | 'laboratory' | 'hall' | 'office' | 'outdoor';
  building: string;
  floor?: string;
  capacity: number;
  status: 'available' | 'booked' | 'maintenance' | 'closed';
  amenities: string[];
  photos?: string[];
  description?: string;
  personnelInCharge?: string; // User ID of the personnel in charge
  personnelInChargeName?: string; // Name of the personnel in charge
}

export interface Reservation {
  id: string;
  facilityId: string;
  facilityName: string;
  requesterId: string;
  requesterName: string;
  purpose: string;
  startDateTime: string;
  endDateTime: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  equipmentRequested?: string[];
  notes?: string;
  approvedBy?: string;
  createdAt: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: 'laptop' | 'projector' | 'furniture' | 'av_equipment' | 'other';
  serialNumber?: string;
  status: 'available' | 'checked_out' | 'maintenance' | 'retired';
  location: string;
  assignedTo?: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  qrCode?: string;
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  facilityId?: string;
  equipmentId?: string;
  requesterId: string;
  requesterName: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'assigned' | 'in_progress' | 'completed' | 'closed';
  assignedTo?: string;
  photos?: string[];
  createdAt: string;
  completedAt?: string;
  slaDeadline: string;
}

export interface ServiceRequest {
  id: string;
  title: string;
  category: 'it_support' | 'av_setup' | 'furniture' | 'equipment_support' | 'drrm' | 'other';
  description: string;
  requesterId: string;
  requesterName: string;
  location: string;
  requestedDate: string;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  completedAt?: string;
}

export interface DashboardStats {
  totalFacilities: number;
  availableFacilities: number;
  todayBookings: number;
  pendingMaintenance: number;
  openServiceRequests: number;
  equipmentInUse: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}
export interface VehicleRequest {
  id: string;
  vehicleId: string;
  vehicleName: string;
  requesterId: string;
  requesterName: string;
  purpose: string;
  destination: string;
  startDateTime: string;
  endDateTime: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  driverRequired: boolean;
  assignedDriver?: string;
  notes?: string;
  approvedBy?: string;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'sedan' | 'suv' | 'van' | 'bus' | 'truck';
  plateNumber: string;
  capacity: number;
  status: 'available' | 'in_use' | 'maintenance' | 'retired';
  fuelType: 'gasoline' | 'diesel' | 'hybrid' | 'electric';
  assignedDriver?: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
}