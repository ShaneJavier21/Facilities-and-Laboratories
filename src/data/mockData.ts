import { Facility, Reservation, Equipment, MaintenanceRequest, ServiceRequest, User } from '../types';

// Import mockFacilities to use in approval logic
import { mockFacilities } from './mockData';

export const mockFacilities: Facility[] = [
  {
    id: '1',
    name: 'Computer Lab A',
    type: 'laboratory',
    building: 'ICT Building',
    floor: '2nd Floor',
    capacity: 35,
    status: 'available',
    amenities: ['35 Desktop PCs', 'Air Conditioning', 'Projector', 'Whiteboard', 'Network Access'],
    photos: ['https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg'],
    description: 'Modern computer laboratory equipped with latest hardware for programming and IT courses',
    personnelInCharge: '1',
    personnelInChargeName: 'Dr. Juan Dela Cruz'
  },
  {
    id: '2',
    name: 'Audio-Visual Room',
    type: 'classroom',
    building: 'Main Building',
    floor: '1st Floor',
    capacity: 50,
    status: 'available',
    amenities: ['Projector', 'Sound System', 'Air Conditioning', 'Microphones', 'Stage'],
    photos: ['https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg'],
    description: 'Multimedia presentation room with advanced AV equipment for seminars and conferences',
    personnelInCharge: '2',
    personnelInChargeName: 'Engr. Maria Santos'
  },
  {
    id: '3',
    name: 'Gymnasium',
    type: 'hall',
    building: 'Sports Complex',
    floor: 'Ground Floor',
    capacity: 800,
    status: 'available',
    amenities: ['Basketball Court', 'Sound System', 'Bleachers', 'Stage', 'Lighting'],
    photos: ['https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg'],
    description: 'Multi-purpose gymnasium for sports events, graduations, and large gatherings',
    personnelInCharge: '2',
    personnelInChargeName: 'Engr. Maria Santos'
  },
  {
    id: '4',
    name: 'College of Education Room 204',
    type: 'classroom',
    building: 'Education Building',
    floor: '2nd Floor',
    capacity: 40,
    status: 'booked',
    amenities: ['Projector', 'Air Conditioning', 'Whiteboard', 'Student Desks'],
    photos: ['https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg'],
    description: 'Standard classroom for education courses and teacher training programs',
    personnelInCharge: '4',
    personnelInChargeName: 'Dr. Carmen Reyes'
  },
  {
    id: '5',
    name: 'Board Room',
    type: 'office',
    building: 'Administration Building',
    floor: '3rd Floor',
    capacity: 20,
    status: 'available',
    amenities: ['Conference Table', 'Projector', 'Air Conditioning', 'Video Conferencing'],
    photos: ['https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg'],
    description: 'Executive boardroom for high-level meetings and administrative conferences',
    personnelInCharge: '4',
    personnelInChargeName: 'Dr. Carmen Reyes'
  },
  {
    id: '6',
    name: 'Lecture Hall',
    type: 'hall',
    building: 'Academic Building',
    floor: '1st Floor',
    capacity: 150,
    status: 'maintenance',
    amenities: ['Tiered Seating', 'Projector', 'Sound System', 'Air Conditioning', 'Stage'],
    photos: ['https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg'],
    description: 'Large lecture hall with tiered seating for major academic presentations',
    personnelInCharge: '2',
    personnelInChargeName: 'Engr. Maria Santos'
  },
  {
    id: '7',
    name: 'University Dormitory',
    type: 'office',
    building: 'Dormitory Building',
    floor: 'Multi-floor',
    capacity: 200,
    status: 'available',
    amenities: ['Student Rooms', 'Common Areas', 'Study Hall', 'Laundry Facility', 'Security System', 'Wi-Fi Access'],
    photos: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
    description: 'Student dormitory facility providing accommodation for university students with modern amenities',
    personnelInCharge: '3',
    personnelInChargeName: 'Mr. Roberto Garcia'
  }
];

export const mockReservations: Reservation[] = [
  {
    id: '1',
    facilityId: '1',
    facilityName: 'Computer Lab A',
    requesterId: '5',
    requesterName: 'Prof. Ana Villanueva',
    purpose: 'Programming Workshop for CS Students',
    startDateTime: '2024-01-20T09:00:00',
    endDateTime: '2024-01-20T12:00:00',
    status: 'approved',
    equipmentRequested: ['Projector', 'Microphones'],
    notes: 'Need all PCs to be working properly',
    approvedBy: 'Engr. Maria Santos',
    createdAt: '2024-01-15T10:00:00'
  },
  {
    id: '2',
    facilityId: '2',
    facilityName: 'Audio-Visual Room',
    requesterId: '4',
    requesterName: 'Dr. Carmen Reyes',
    purpose: 'Administrative Staff Meeting',
    startDateTime: '2024-01-22T14:00:00',
    endDateTime: '2024-01-22T16:00:00',
    status: 'pending',
    equipmentRequested: ['Sound System', 'Projector'],
    createdAt: '2024-01-18T08:30:00'
  },
  {
    id: '3',
    facilityId: '3',
    facilityName: 'Gymnasium',
    requesterId: '6',
    requesterName: 'Coach Roberto Martinez',
    purpose: 'Intramural Basketball Finals',
    startDateTime: '2024-01-25T15:00:00',
    endDateTime: '2024-01-25T18:00:00',
    status: 'approved',
    equipmentRequested: ['Sound System', 'Scoreboard'],
    approvedBy: 'Dr. Juan Dela Cruz',
    createdAt: '2024-01-12T14:20:00'
  },
  {
    id: '4',
    facilityId: '4',
    facilityName: 'College of Education Room 204',
    requesterId: '7',
    requesterName: 'Dr. Lisa Santos',
    purpose: 'Teacher Training Seminar',
    startDateTime: '2024-01-23T08:00:00',
    endDateTime: '2024-01-23T17:00:00',
    status: 'approved',
    equipmentRequested: ['Projector', 'Whiteboard'],
    approvedBy: 'Engr. Maria Santos',
    createdAt: '2024-01-16T11:15:00'
  },
  {
    id: '5',
    facilityId: '5',
    facilityName: 'Board Room',
    requesterId: '8',
    requesterName: 'Dean Michael Cruz',
    purpose: 'College Deans Meeting',
    startDateTime: '2024-01-24T10:00:00',
    endDateTime: '2024-01-24T12:00:00',
    status: 'rejected',
    equipmentRequested: ['Video Conferencing'],
    notes: 'Conflict with existing reservation',
    createdAt: '2024-01-19T09:45:00'
  },
  {
    id: '6',
    facilityId: '6',
    facilityName: 'Lecture Hall',
    requesterId: '9',
    requesterName: 'Prof. Sarah Garcia',
    purpose: 'Research Symposium',
    startDateTime: '2024-01-26T13:00:00',
    endDateTime: '2024-01-26T17:00:00',
    status: 'pending',
    equipmentRequested: ['Sound System', 'Projector'],
    createdAt: '2024-01-20T16:30:00'
  },
  {
    id: '7',
    facilityId: '1',
    facilityName: 'Computer Lab A',
    requesterId: '10',
    requesterName: 'Mr. James Wilson',
    purpose: 'Database Management Class',
    startDateTime: '2024-01-27T10:00:00',
    endDateTime: '2024-01-27T12:00:00',
    status: 'approved',
    equipmentRequested: ['Projector'],
    approvedBy: 'Engr. Maria Santos',
    createdAt: '2024-01-17T13:20:00'
  },
  {
    id: '8',
    facilityId: '2',
    facilityName: 'Audio-Visual Room',
    requesterId: '11',
    requesterName: 'Ms. Patricia Lee',
    purpose: 'Student Orientation',
    startDateTime: '2024-01-28T09:00:00',
    endDateTime: '2024-01-28T11:00:00',
    status: 'completed',
    equipmentRequested: ['Sound System', 'Microphones'],
    approvedBy: 'Dr. Juan Dela Cruz',
    createdAt: '2024-01-10T12:00:00'
  },
  {
    id: '9',
    facilityId: '3',
    facilityName: 'Gymnasium',
    requesterId: '12',
    requesterName: 'Student Council President',
    purpose: 'University Week Opening Ceremony',
    startDateTime: '2024-02-01T08:00:00',
    endDateTime: '2024-02-01T12:00:00',
    status: 'pending',
    equipmentRequested: ['Sound System', 'Stage Lighting'],
    createdAt: '2024-01-21T14:45:00'
  },
  {
    id: '10',
    facilityId: '5',
    facilityName: 'Board Room',
    requesterId: '4',
    requesterName: 'Dr. Carmen Reyes',
    purpose: 'Budget Planning Meeting',
    startDateTime: '2024-01-29T14:00:00',
    endDateTime: '2024-01-29T17:00:00',
    status: 'approved',
    equipmentRequested: ['Video Conferencing', 'Projector'],
    approvedBy: 'Dr. Juan Dela Cruz',
    createdAt: '2024-01-18T10:30:00'
  }
];

export const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Epson PowerLite Projector',
    type: 'projector',
    serialNumber: 'EP-2024-001',
    status: 'available',
    location: 'Equipment Storage Room A',
    lastMaintenance: '2024-01-01',
    nextMaintenance: '2024-07-01',
    qrCode: 'QR-EP-001'
  },
  {
    id: '2',
    name: 'Epson PowerLite Projector',
    type: 'projector',
    serialNumber: 'EP-2024-002',
    status: 'checked_out',
    location: 'Audio-Visual Room',
    assignedTo: 'Prof. Ana Villanueva',
    lastMaintenance: '2024-01-01',
    nextMaintenance: '2024-07-01',
    qrCode: 'QR-EP-002'
  },
  {
    id: '3',
    name: 'Epson PowerLite Projector',
    type: 'projector',
    serialNumber: 'EP-2024-003',
    status: 'maintenance',
    location: 'Maintenance Workshop',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-07-15',
    qrCode: 'QR-EP-003'
  },
  {
    id: '4',
    name: 'Dell Latitude Laptop',
    type: 'laptop',
    serialNumber: 'DL-2024-001',
    status: 'available',
    location: 'ICT Office',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-07-10',
    qrCode: 'QR-DL-001'
  },
  {
    id: '5',
    name: 'Dell Latitude Laptop',
    type: 'laptop',
    serialNumber: 'DL-2024-002',
    status: 'checked_out',
    location: 'Computer Lab A',
    assignedTo: 'Mr. James Wilson',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-07-10',
    qrCode: 'QR-DL-002'
  },
  {
    id: '6',
    name: 'Dell Latitude Laptop',
    type: 'laptop',
    serialNumber: 'DL-2024-003',
    status: 'available',
    location: 'ICT Office',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-07-10',
    qrCode: 'QR-DL-003'
  },
  {
    id: '7',
    name: 'Dell Latitude Laptop',
    type: 'laptop',
    serialNumber: 'DL-2024-004',
    status: 'available',
    location: 'ICT Office',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-07-10',
    qrCode: 'QR-DL-004'
  },
  {
    id: '8',
    name: 'Dell Latitude Laptop',
    type: 'laptop',
    serialNumber: 'DL-2024-005',
    status: 'retired',
    location: 'Storage',
    lastMaintenance: '2023-12-01',
    nextMaintenance: 'N/A',
    qrCode: 'QR-DL-005'
  },
  {
    id: '9',
    name: 'Yamaha Sound System',
    type: 'av_equipment',
    serialNumber: 'YM-2024-001',
    status: 'available',
    location: 'Audio-Visual Room',
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-07-05',
    qrCode: 'QR-YM-001'
  },
  {
    id: '10',
    name: 'Yamaha Sound System',
    type: 'av_equipment',
    serialNumber: 'YM-2024-002',
    status: 'checked_out',
    location: 'Gymnasium',
    assignedTo: 'Coach Roberto Martinez',
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-07-05',
    qrCode: 'QR-YM-002'
  },
  {
    id: '11',
    name: 'Wireless Microphone Set',
    type: 'av_equipment',
    serialNumber: 'WM-2024-001',
    status: 'available',
    location: 'Equipment Storage Room A',
    lastMaintenance: '2024-01-08',
    nextMaintenance: '2024-07-08',
    qrCode: 'QR-WM-001'
  },
  {
    id: '12',
    name: 'Plastic Chairs (Set of 50)',
    type: 'furniture',
    serialNumber: 'PC-2024-001',
    status: 'available',
    location: 'Storage Room B',
    lastMaintenance: '2024-01-01',
    nextMaintenance: '2024-12-01',
    qrCode: 'QR-PC-001'
  },
  {
    id: '13',
    name: 'Folding Tables (Set of 10)',
    type: 'furniture',
    serialNumber: 'FT-2024-001',
    status: 'checked_out',
    location: 'Gymnasium',
    assignedTo: 'Student Council President',
    lastMaintenance: '2024-01-01',
    nextMaintenance: '2024-12-01',
    qrCode: 'QR-FT-001'
  },
  {
    id: '14',
    name: 'HDMI Cable Set',
    type: 'av_equipment',
    serialNumber: 'HC-2024-001',
    status: 'available',
    location: 'Equipment Storage Room A',
    lastMaintenance: '2024-01-01',
    nextMaintenance: '2024-12-01',
    qrCode: 'QR-HC-001'
  },
  {
    id: '15',
    name: 'Extension Cord Set',
    type: 'other',
    serialNumber: 'EC-2024-001',
    status: 'available',
    location: 'Equipment Storage Room A',
    lastMaintenance: '2024-01-01',
    nextMaintenance: '2024-12-01',
    qrCode: 'QR-EC-001'
  }
];

export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: '1',
    title: 'Air conditioning not working in AVR',
    description: 'The air conditioning unit in the Audio-Visual Room is not cooling properly. Temperature is too high for comfortable use.',
    facilityId: '2',
    requesterId: '5',
    requesterName: 'Prof. Ana Villanueva',
    priority: 'high',
    status: 'in_progress',
    assignedTo: 'Mr. Roberto Garcia',
    photos: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
    createdAt: '2024-01-18T09:30:00',
    slaDeadline: '2024-01-20T17:00:00'
  },
  {
    id: '2',
    title: 'Broken chair in Room 102',
    description: 'One of the student chairs has a broken leg and is unsafe to use. Needs immediate replacement or repair.',
    facilityId: '4',
    requesterId: '7',
    requesterName: 'Dr. Lisa Santos',
    priority: 'medium',
    status: 'open',
    photos: ['https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg'],
    createdAt: '2024-01-19T14:15:00',
    slaDeadline: '2024-01-22T17:00:00'
  },
  {
    id: '3',
    title: 'Water leak in comfort room',
    description: 'There is a water leak in the comfort room near Computer Lab A. Water is pooling on the floor.',
    facilityId: '1',
    requesterId: '10',
    requesterName: 'Mr. James Wilson',
    priority: 'critical',
    status: 'assigned',
    assignedTo: 'Mr. Roberto Garcia',
    photos: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
    createdAt: '2024-01-20T08:45:00',
    slaDeadline: '2024-01-20T12:00:00'
  },
  {
    id: '4',
    title: 'Projector bulb replacement needed',
    description: 'The projector in the Board Room has a dim display. Bulb needs replacement.',
    facilityId: '5',
    equipmentId: '1',
    requesterId: '4',
    requesterName: 'Dr. Carmen Reyes',
    priority: 'low',
    status: 'completed',
    assignedTo: 'Mr. Roberto Garcia',
    createdAt: '2024-01-15T11:20:00',
    completedAt: '2024-01-17T15:30:00',
    slaDeadline: '2024-01-18T17:00:00'
  },
  {
    id: '5',
    title: 'Network connectivity issues in Computer Lab A',
    description: 'Several computers in Computer Lab A are experiencing network connectivity problems. Internet access is intermittent.',
    facilityId: '1',
    requesterId: '5',
    requesterName: 'Prof. Ana Villanueva',
    priority: 'high',
    status: 'open',
    createdAt: '2024-01-21T10:00:00',
    slaDeadline: '2024-01-23T17:00:00'
  }
];

export const mockServiceRequests: ServiceRequest[] = [
  {
    id: '1',
    title: 'IT setup for Research Symposium',
    category: 'it_support',
    description: 'Need laptop setup, network configuration, and technical support for the upcoming research symposium.',
    requesterId: '9',
    requesterName: 'Prof. Sarah Garcia',
    location: 'Lecture Hall',
    requestedDate: '2024-01-26T13:00:00',
    status: 'assigned',
    assignedTo: 'IT Support Team',
    priority: 'high',
    createdAt: '2024-01-20T16:30:00'
  },
  {
    id: '2',
    title: 'Sound system setup for graduation ceremony',
    category: 'av_setup',
    description: 'Complete sound system setup including microphones, speakers, and audio mixing for graduation ceremony.',
    requesterId: '12',
    requesterName: 'Student Council President',
    location: 'Gymnasium',
    requestedDate: '2024-02-01T08:00:00',
    status: 'pending',
    priority: 'critical',
    createdAt: '2024-01-21T14:45:00'
  },
  {
    id: '3',
    title: 'Tables and chairs for board meeting',
    category: 'furniture',
    description: 'Arrange additional tables and chairs for expanded board meeting with external stakeholders.',
    requesterId: '4',
    requesterName: 'Dr. Carmen Reyes',
    location: 'Board Room',
    requestedDate: '2024-01-29T14:00:00',
    status: 'completed',
    assignedTo: 'Logistics Team',
    priority: 'medium',
    createdAt: '2024-01-18T10:30:00',
    completedAt: '2024-01-29T13:30:00'
  },
  {
    id: '4',
    title: 'Equipment delivery to Computer Lab A',
    category: 'equipment_support',
    description: 'Deliver and install new desktop computers and peripherals to Computer Lab A.',
    requesterId: '1',
    requesterName: 'Dr. Juan Dela Cruz',
    location: 'Computer Lab A',
    requestedDate: '2024-01-25T09:00:00',
    status: 'in_progress',
    assignedTo: 'Equipment Team',
    priority: 'medium',
    createdAt: '2024-01-22T11:15:00'
  },
  {
    id: '5',
    title: 'Projector setup for workshop',
    category: 'av_setup',
    description: 'Install and configure projector for programming workshop including screen adjustment and cable management.',
    requesterId: '5',
    requesterName: 'Prof. Ana Villanueva',
    location: 'Computer Lab A',
    requestedDate: '2024-01-20T09:00:00',
    status: 'completed',
    assignedTo: 'AV Support Team',
    priority: 'medium',
    createdAt: '2024-01-15T10:00:00',
    completedAt: '2024-01-20T08:30:00'
  },
  {
    id: '6',
    title: 'Network troubleshooting',
    category: 'it_support',
    description: 'Diagnose and fix network connectivity issues affecting multiple computers in the lab.',
    requesterId: '10',
    requesterName: 'Mr. James Wilson',
    location: 'Computer Lab A',
    requestedDate: '2024-01-23T10:00:00',
    status: 'assigned',
    assignedTo: 'Network Team',
    priority: 'high',
    createdAt: '2024-01-21T10:00:00'
  },
  {
    id: '7',
    title: 'Furniture arrangement for seminar',
    category: 'furniture',
    description: 'Rearrange seating and setup additional tables for teacher training seminar.',
    requesterId: '7',
    requesterName: 'Dr. Lisa Santos',
    location: 'College of Education Room 204',
    requestedDate: '2024-01-23T08:00:00',
    status: 'completed',
    assignedTo: 'Logistics Team',
    priority: 'low',
    createdAt: '2024-01-16T11:15:00',
    completedAt: '2024-01-23T07:30:00'
  },
  {
    id: '8',
    title: 'Video conferencing setup',
    category: 'av_setup',
    description: 'Configure video conferencing equipment for remote meeting with partner universities.',
    requesterId: '8',
    requesterName: 'Dean Michael Cruz',
    location: 'Board Room',
    requestedDate: '2024-01-24T10:00:00',
    status: 'cancelled',
    priority: 'medium',
    createdAt: '2024-01-19T09:45:00'
  },
  {
    id: '9',
    title: 'Emergency evacuation drill setup',
    category: 'drrm',
    description: 'Setup emergency evacuation signage and coordinate with safety personnel for quarterly drill.',
    requesterId: '2',
    requesterName: 'Engr. Maria Santos',
    location: 'All Buildings',
    requestedDate: '2024-01-30T08:00:00',
    status: 'pending',
    priority: 'high',
    createdAt: '2024-01-22T09:15:00'
  },
  {
    id: '10',
    title: 'Fire extinguisher inspection',
    category: 'drrm',
    description: 'Monthly inspection and maintenance of fire extinguishers across all university buildings.',
    requesterId: '3',
    requesterName: 'Mr. Roberto Garcia',
    location: 'Campus-wide',
    requestedDate: '2024-01-25T10:00:00',
    status: 'assigned',
    assignedTo: 'Safety Team',
    priority: 'medium',
    createdAt: '2024-01-20T14:30:00'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Juan Dela Cruz',
    email: 'admin@essu.edu.ph',
    role: 'system_admin',
    department: 'ICT Office',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  },
  {
    id: '2',
    name: 'Engr. Maria Santos',
    email: 'facilities@essu.edu.ph',
    role: 'facility_manager',
    department: 'Physical Plant Office',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
  },
  {
    id: '3',
    name: 'Mr. Roberto Garcia',
    email: 'maintenance@essu.edu.ph',
    role: 'maintenance_personnel',
    department: 'Maintenance Unit',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
  },
  {
    id: '4',
    name: 'Dr. Carmen Reyes',
    email: 'vpadmin@essu.edu.ph',
    role: 'vp_admin',
    department: 'Office of VP for Administration',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
  },
  {
    id: '5',
    name: 'Prof. Ana Villanueva',
    email: 'requester@essu.edu.ph',
    role: 'office_requester',
    department: 'College of Engineering',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg'
  }
];

// Administrative Affairs Mock Data
export const mockOOMDocuments = [
  {
    id: '1',
    title: 'Office Operations Manual 2024',
    description: 'Complete operations manual for administrative procedures',
    fileUrl: '/documents/oom-2024.pdf',
    uploadDate: '2024-01-01',
    category: 'Operations Manual'
  },
  {
    id: '2',
    title: 'Facilities Management Policy',
    description: 'Guidelines for facility usage and maintenance procedures',
    fileUrl: '/documents/facilities-policy.pdf',
    uploadDate: '2024-01-05',
    category: 'Policy'
  },
  {
    id: '3',
    title: 'Equipment Handling Procedures',
    description: 'Standard procedures for equipment check-in/check-out',
    fileUrl: '/documents/equipment-procedures.pdf',
    uploadDate: '2024-01-10',
    category: 'Procedures'
  }
];

export const mockPersonnelData = [
  {
    id: '1',
    name: 'Ms. Jennifer Cruz',
    position: 'Administrative Assistant',
    department: 'VP Administration Office',
    email: 'j.cruz@essu.edu.ph',
    phone: '+63 912 345 6789',
    dateHired: '2020-03-15',
    employeeId: 'ESSU-2020-001'
  },
  {
    id: '2',
    name: 'Mr. Carlos Mendoza',
    position: 'Records Officer',
    department: 'VP Administration Office',
    email: 'c.mendoza@essu.edu.ph',
    phone: '+63 912 345 6790',
    dateHired: '2019-08-20',
    employeeId: 'ESSU-2019-045'
  },
  {
    id: '3',
    name: 'Ms. Rosa Fernandez',
    position: 'Budget Analyst',
    department: 'VP Administration Office',
    email: 'r.fernandez@essu.edu.ph',
    phone: '+63 912 345 6791',
    dateHired: '2021-01-10',
    employeeId: 'ESSU-2021-003'
  },
  {
    id: '4',
    name: 'Mr. Antonio Reyes',
    position: 'Procurement Officer',
    department: 'VP Administration Office',
    email: 'a.reyes@essu.edu.ph',
    phone: '+63 912 345 6792',
    dateHired: '2018-11-05',
    employeeId: 'ESSU-2018-078'
  },
  {
    id: '5',
    name: 'Ms. Patricia Gonzales',
    position: 'HR Specialist',
    department: 'VP Administration Office',
    email: 'p.gonzales@essu.edu.ph',
    phone: '+63 912 345 6793',
    dateHired: '2022-02-28',
    employeeId: 'ESSU-2022-012'
  }
];

// Reports Mock Data
export const mockReportsData = {
  monthlyBookings: 45,
  openMaintenanceIssues: 3,
  slaComplianceRate: 87,
  topRequestedFacilities: [
    { name: 'Computer Lab A', bookings: 12 },
    { name: 'Audio-Visual Room', bookings: 8 },
    { name: 'Gymnasium', bookings: 6 },
    { name: 'Board Room', bookings: 5 },
    { name: 'Lecture Hall', bookings: 4 }
  ],
  equipmentUtilization: [
    { name: 'Projectors', utilization: 75 },
    { name: 'Laptops', utilization: 60 },
    { name: 'Sound Systems', utilization: 45 },
    { name: 'Microphones', utilization: 30 }
  ],
  maintenanceByStatus: [
    { status: 'Open', count: 2 },
    { status: 'In Progress', count: 1 },
    { status: 'Completed', count: 15 },
    { status: 'Assigned', count: 1 }
  ]
};
export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Toyota Hiace',
    type: 'van',
    plateNumber: 'ABC-123',
    capacity: 15,
    status: 'available',
    fuelType: 'diesel',
    assignedDriver: 'Mr. Juan Santos',
    lastMaintenance: '2024-01-01',
    nextMaintenance: '2024-07-01'
  },
  {
    id: '2',
    name: 'Isuzu D-Max',
    type: 'truck',
    plateNumber: 'DEF-456',
    capacity: 5,
    status: 'available',
    fuelType: 'diesel',
    assignedDriver: 'Mr. Pedro Cruz',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-07-15'
  },
  {
    id: '3',
    name: 'Toyota Coaster',
    type: 'bus',
    plateNumber: 'GHI-789',
    capacity: 30,
    status: 'in_use',
    fuelType: 'diesel',
    assignedDriver: 'Mr. Carlos Reyes',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-07-10'
  },
  {
    id: '4',
    name: 'Honda City',
    type: 'sedan',
    plateNumber: 'JKL-012',
    capacity: 5,
    status: 'available',
    fuelType: 'gasoline',
    assignedDriver: 'Ms. Maria Garcia',
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-07-05'
  },
  {
    id: '5',
    name: 'Ford Everest',
    type: 'suv',
    plateNumber: 'MNO-345',
    capacity: 7,
    status: 'maintenance',
    fuelType: 'diesel',
    assignedDriver: 'Mr. Roberto Martinez',
    lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-07-20'
  },
  {
    id: '6',
    name: 'Mitsubishi L300',
    type: 'van',
    plateNumber: 'PQR-678',
    capacity: 12,
    status: 'available',
    fuelType: 'gasoline',
    assignedDriver: 'Mr. Antonio Lopez',
    lastMaintenance: '2024-01-12',
    nextMaintenance: '2024-07-12'
  }
];

export const mockVehicleRequests: VehicleRequest[] = [
  {
    id: '1',
    vehicleId: '1',
    vehicleName: 'Toyota Hiace',
    requesterId: '5',
    requesterName: 'Prof. Ana Villanueva',
    purpose: 'Field Trip to Science Museum',
    destination: 'Manila Science Museum',
    startDateTime: '2024-01-25T08:00:00',
    endDateTime: '2024-01-25T18:00:00',
    status: 'approved',
    driverRequired: true,
    assignedDriver: 'Mr. Juan Santos',
    notes: 'Need to pick up students from dormitory',
    approvedBy: 'Dr. Carmen Reyes',
    createdAt: '2024-01-20T10:00:00'
  },
  {
    id: '2',
    vehicleId: '4',
    vehicleName: 'Honda City',
    requesterId: '4',
    requesterName: 'Dr. Carmen Reyes',
    purpose: 'Meeting with CHED Officials',
    destination: 'CHED Regional Office, Tacloban',
    startDateTime: '2024-01-22T09:00:00',
    endDateTime: '2024-01-22T16:00:00',
    status: 'pending',
    driverRequired: true,
    notes: 'Important meeting regarding accreditation',
    createdAt: '2024-01-21T14:30:00'
  },
  {
    id: '3',
    vehicleId: '2',
    vehicleName: 'Isuzu D-Max',
    requesterId: '2',
    requesterName: 'Engr. Maria Santos',
    purpose: 'Equipment Transport',
    destination: 'Supplier Warehouse, Catbalogan',
    startDateTime: '2024-01-23T07:00:00',
    endDateTime: '2024-01-23T15:00:00',
    status: 'approved',
    driverRequired: true,
    assignedDriver: 'Mr. Pedro Cruz',
    approvedBy: 'Dr. Carmen Reyes',
    createdAt: '2024-01-18T11:20:00'
  },
  {
    id: '4',
    vehicleId: '6',
    vehicleName: 'Mitsubishi L300',
    requesterId: '7',
    requesterName: 'Dr. Lisa Santos',
    purpose: 'Teacher Training Seminar',
    destination: 'Borongan City Convention Center',
    startDateTime: '2024-01-24T06:00:00',
    endDateTime: '2024-01-24T19:00:00',
    status: 'completed',
    driverRequired: true,
    assignedDriver: 'Mr. Antonio Lopez',
    approvedBy: 'Dr. Carmen Reyes',
    createdAt: '2024-01-15T09:45:00'
  },
  {
    id: '5',
    vehicleId: '3',
    vehicleName: 'Toyota Coaster',
    requesterId: '12',
    requesterName: 'Student Council President',
    purpose: 'University Week Activities',
    destination: 'Various locations in Borongan',
    startDateTime: '2024-02-01T08:00:00',
    endDateTime: '2024-02-01T17:00:00',
    status: 'rejected',
    driverRequired: true,
    notes: 'Vehicle already reserved for official university business',
    createdAt: '2024-01-19T16:20:00'
  }
];