import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp,
  Building2,
  Package,
  Wrench,
  HeadphonesIcon
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockReportsData } from '../../data/mockData';

const COLORS = ['#16a34a', '#f59e0b', '#dc2626', '#2563eb', '#7c3aed'];

export const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const data = mockReportsData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">System performance and utilization insights</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-essu-green-500 focus:border-essu-green-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="px-4 py-2 bg-gradient-to-r from-essu-green-600 to-essu-gold-600 text-white rounded-lg hover:from-essu-green-700 hover:to-essu-gold-700 transition-all duration-200 flex items-center space-x-2 shadow-md">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{data.monthlyBookings}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% vs last month
              </p>
            </div>
            <Calendar className="w-8 h-8 text-essu-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">{data.openMaintenanceIssues}</p>
              <p className="text-sm text-red-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                -2 vs last month
              </p>
            </div>
            <Wrench className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">SLA Compliance</p>
              <p className="text-2xl font-bold text-gray-900">{data.slaComplianceRate}%</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +5% vs last month
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-essu-gold-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900">2.4h</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                -0.3h vs last month
              </p>
            </div>
            <HeadphonesIcon className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Requested Facilities */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Requested Facilities</h3>
            <Building2 className="w-5 h-5 text-essu-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.topRequestedFacilities}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Equipment Utilization */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Equipment Utilization</h3>
            <Package className="w-5 h-5 text-essu-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.equipmentUtilization}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
              <Bar dataKey="utilization" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Maintenance Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Maintenance Requests by Status</h3>
            <Wrench className="w-5 h-5 text-essu-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.maintenanceByStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, count }) => `${status}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {data.maintenanceByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Statistics */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">System Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Total Facilities</span>
              <span className="text-lg font-bold text-gray-900">48</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Active Equipment</span>
              <span className="text-lg font-bold text-gray-900">156</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Total Users</span>
              <span className="text-lg font-bold text-gray-900">89</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Avg Booking Duration</span>
              <span className="text-lg font-bold text-gray-900">3.2h</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Peak Usage Time</span>
              <span className="text-lg font-bold text-gray-900">10-11 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <Download className="w-5 h-5 text-essu-green-600" />
              <div>
                <h4 className="font-medium text-gray-900">Facility Usage Report</h4>
                <p className="text-sm text-gray-600">Detailed facility booking statistics</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <Download className="w-5 h-5 text-essu-green-600" />
              <div>
                <h4 className="font-medium text-gray-900">Maintenance Report</h4>
                <p className="text-sm text-gray-600">SLA compliance and response times</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <Download className="w-5 h-5 text-essu-green-600" />
              <div>
                <h4 className="font-medium text-gray-900">Equipment Report</h4>
                <p className="text-sm text-gray-600">Asset utilization and inventory</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};