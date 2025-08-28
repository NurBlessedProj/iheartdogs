"use client";

import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer.jsx/page";
import Navbar from "@/components/Navbar/Navbar";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import ShipmentContext from "@/contexts/ShipmentContext";
import { useRouter } from "next/navigation";
import {
  Plus,
  Save,
  Edit2,
  Trash2,
  Search,
  Filter,
  LayoutGrid,
  List,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Eye,
} from "lucide-react";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

function Page() {
  const shipmentContext = useContext(ShipmentContext);
  const selected = shipmentContext?.selected || [];
  const setSelected = shipmentContext?.setSelected || (() => {});
  const [puppies, setPuppies] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const getPost = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/post`);
      const data = await response.json();
      setPuppies(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePost = async (id, updateData) => {
    setIsLoading(true);
    const notyf = new Notyf({
      position: {
        x: "right",
        y: "top",
      },
      duration: 3000,
    });
    try {
      const response = await fetch(`/api/post`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...updateData }),
      });
      if (response.ok) {
        notyf.success("Puppy information updated successfully");
        setEditId(null);
        getPost();
      } else {
        notyf.error("Failed to update puppy information");
      }
    } catch (error) {
      notyf.error("Error updating puppy information");
      console.error("Error updating puppy information:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (id) => {
    setIsLoading(true);
    const notyf = new Notyf({
      position: {
        x: "right",
        y: "top",
      },
      duration: 3000,
    });
    try {
      const response = await fetch(`/api/post`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        notyf.success("Puppy listing deleted successfully");
        setConfirmDelete(null);
        getPost();
      } else {
        notyf.error("Failed to delete puppy listing");
      }
    } catch (error) {
      notyf.error("Error deleting puppy listing");
      console.error("Error deleting puppy listing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (id) => {
    const notyf = new Notyf({
      position: {
        x: "right",
        y: "top",
      },
      duration: 3000,
    });

    if (editData.image instanceof File) {
      const formData = new FormData();
      formData.append("file", editData.image);
      formData.append("upload_preset", "lfg3xanz");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dwoaukreo/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        if (data.error) {
          notyf.error(data.error.message);
          return;
        }
        editData.image = data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        notyf.error("Error uploading image");
        return;
      }
    }
    updatePost(id, editData);
  };

  const filteredPuppies = puppies.filter((puppy) => {
    const matchesStatus =
      filterStatus === "all" ||
      puppy.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      searchTerm === "" ||
      puppy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      puppy.breed.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const cancelEdit = () => {
    setEditId(null);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Jack Russell Terrier Puppies
            </h1>
            <p className="text-gray-600 mt-1">Manage your available puppies</p>
          </div>
          <button
            className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors shadow-sm"
            onClick={() => navigate.push("/pd-page")}
          >
            <Plus size={20} className="mr-2" />
            <span>Add New Puppy</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search puppies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Filter size={18} className="text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">View:</span>
              <button
                className={`p-2 rounded-md ${
                  viewMode === "grid"
                    ? "bg-amber-100 text-amber-600"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setViewMode("grid")}
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                className={`p-2 rounded-md ${
                  viewMode === "list"
                    ? "bg-amber-100 text-amber-600"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setViewMode("list")}
                title="List View"
              >
                <List size={18} />
              </button>
              <button
                className="p-2 rounded-md hover:bg-gray-100 ml-2"
                onClick={getPost}
                title="Refresh"
              >
                <RefreshCw size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : filteredPuppies.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={24} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No puppies found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Add your first Jack Russell Terrier puppy to get started"}
            </p>
            <button
              className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
              onClick={() => navigate.push("/pd-page")}
            >
              <Plus size={18} className="mr-2" />
              <span>Add New Puppy</span>
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPuppies.map((puppy, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all ${
                  editId === puppy._id
                    ? "ring-2 ring-amber-500"
                    : "hover:shadow-md"
                }`}
              >
                {confirmDelete === puppy._id ? (
                  <div className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      <AlertCircle size={40} className="text-red-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-center mb-2">
                      Confirm Deletion
                    </h3>
                    <p className="text-gray-600 text-center mb-4">
                      Are you sure you want to delete {puppy.name}? This action
                      cannot be undone.
                    </p>
                    <div className="flex justify-center space-x-3">
                      <button
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                        onClick={() => setConfirmDelete(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        onClick={() => deletePost(puppy._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative h-64 w-full">
                      <Image
                        src={puppy.image}
                        alt={puppy.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div
                        className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                          puppy.status.toLowerCase() === "available"
                            ? "bg-green-100 text-green-800"
                            : puppy.status.toLowerCase() === "reserved"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {puppy.status}
                      </div>
                    </div>

                    <div className="p-5">
                      {editId === puppy._id ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Name
                            </label>
                            <input
                              type="text"
                              value={editData.name}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  name: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gender
                              </label>
                              <select
                                value={editData.sex}
                                onChange={(e) =>
                                  setEditData({
                                    ...editData,
                                    sex: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                              >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Age
                              </label>
                              <input
                                type="text"
                                value={editData.age}
                                onChange={(e) =>
                                  setEditData({
                                    ...editData,
                                    age: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Color/Type
                              </label>
                              <input
                                type="text"
                                value={editData.breed}
                                onChange={(e) =>
                                  setEditData({
                                    ...editData,
                                    breed: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                              </label>
                              <select
                                value={editData.status}
                                onChange={(e) =>
                                  setEditData({
                                    ...editData,
                                    status: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                              >
                                <option value="Available">Available</option>
                                <option value="Reserved">Reserved</option>
                                <option value="Sold">Sold</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Price
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">
                                  $
                                </span>
                              </div>
                              <input
                                type="text"
                                value={editData.price}
                                onChange={(e) =>
                                  setEditData({
                                    ...editData,
                                    price: e.target.value,
                                  })
                                }
                                className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              value={editData.description}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  description: e.target.value,
                                })
                              }
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Update Photo
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  image: e.target.files[0],
                                })
                              }
                              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                            />
                          </div>

                          <div className="flex justify-end space-x-3 pt-2">
                            <button
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                              onClick={cancelEdit}
                            >
                              Cancel
                            </button>
                            <button
                              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center"
                              onClick={() => handleSave(puppy._id)}
                            >
                              <Save size={16} className="mr-2" />
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h2 className="text-xl font-semibold text-gray-900 mb-1">
                            {puppy.name}
                          </h2>
                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <span>{puppy.breed}</span>
                            <span className="mx-2">•</span>
                            <span>{puppy.sex}</span>
                            <span className="mx-2">•</span>
                            <span>{puppy.age}</span>
                          </div>
                          <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                            {puppy.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="font-semibold text-lg">
                              {puppy.status.toLowerCase() === "sold" ||
                              !puppy.price
                                ? "Not Available"
                                : `$${puppy.price}`}
                            </div>
                            <div className="flex space-x-2">
                              <button
                                className="p-2 text-amber-600 hover:bg-amber-50 rounded-full transition-colors"
                                onClick={() => {
                                  setEditId(puppy._id);
                                  setEditData(puppy);
                                }}
                                title="Edit"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                onClick={() => setConfirmDelete(puppy._id)}
                                title="Delete"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Puppy
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPuppies.map((puppy, index) => (
                    <tr
                      key={index}
                      className={confirmDelete === puppy._id ? "bg-red-50" : ""}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {confirmDelete === puppy._id ? (
                          <div className="flex items-center">
                            <AlertCircle
                              size={20}
                              className="text-red-500 mr-2"
                            />
                            <span className="font-medium text-red-600">
                              Confirm deletion?
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 relative">
                              <Image
                                src={puppy.image}
                                alt={puppy.name}
                                fill
                                className="rounded-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {puppy.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {puppy.breed}
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {confirmDelete === puppy._id ? (
                          <span className="text-sm text-red-600">
                            This action cannot be undone
                          </span>
                        ) : (
                          <div className="text-sm text-gray-900">
                            {puppy.sex} • {puppy.age}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {confirmDelete !== puppy._id && (
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              puppy.status.toLowerCase() === "available"
                                ? "bg-green-100 text-green-800"
                                : puppy.status.toLowerCase() === "reserved"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {puppy.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {confirmDelete !== puppy._id &&
                          (puppy.status.toLowerCase() === "sold" || !puppy.price
                            ? "Not Available"
                            : `$${puppy.price}`)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {confirmDelete === puppy._id ? (
                          <div className="flex justify-end space-x-2">
                            <button
                              className="text-gray-600 hover:text-gray-900"
                              onClick={() => setConfirmDelete(null)}
                            >
                              Cancel
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={() => deletePost(puppy._id)}
                            >
                              Delete
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end space-x-2">
                            <button
                              className="text-amber-600 hover:text-amber-900"
                              onClick={() => {
                                setEditId(puppy._id);
                                setEditData(puppy);
                                setViewMode("grid"); // Switch to grid view for editing
                              }}
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              className="text-gray-600 hover:text-gray-900"
                              onClick={() => {
                                setselected(puppy);
                                navigate.push(
                                  `/available-puppies/${puppy._id}`
                                );
                              }}
                              title="View"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={() => setConfirmDelete(puppy._id)}
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Page;
