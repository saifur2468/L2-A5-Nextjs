// 'use client';

// import { useState, useEffect } from 'react';
// import { Building2, MapPin, Tag } from 'lucide-react';
// import { Property } from '@/types';

// export default function MyPropertiesPage() {
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch('https://prisma-project-tau-dun.vercel.app/landlord/properties', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result = await res.json();
//       if (result.success) {
//         const data = Array.isArray(result.data) ? result.data : [result.data];
//         setProperties(data.filter(Boolean));
//       }
//     } catch (err) {
//       console.error('Failed to fetch properties', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
//         <h1 className="text-2xl font-bold tracking-tight text-slate-900 text-center">My Properties</h1>
//         <p className="text-sm text-slate-500 mt-1 text-center">Manage and view all your listed properties.</p>
//       </div>

//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//         {loading ? (
//           <p className="text-slate-400">Loading properties...</p>
//         ) : properties.length === 0 ? (
//           <div className="col-span-full py-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-100">
//             <Building2 size={40} className="mx-auto mb-2 opacity-40" />
//             <p>No properties found.</p>
//           </div>
//         ) : (
//           properties.map((property) => (
//             <div key={property.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4 flex flex-col justify-between">
//               <div className="space-y-2">
//                 {property.imageUrl && (
//                   <img src={property.imageUrl} alt={property.title} className="w-full h-40 object-cover rounded-xl mb-3" />
//                 )}
//                 <div className="flex items-center justify-between">
//                   <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
//                     <Tag size={12} /> {property.category?.name || 'General'}
//                   </span>
//                   <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
//                     property.isAvailable ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
//                   }`}>
//                     {property.isAvailable ? 'Available' : 'Rented'}
//                   </span>
//                 </div>
//                 <h3 className="font-bold text-slate-800 text-base">{property.title}</h3>
//                 <p className="text-xs text-slate-500 line-clamp-2">{property.description}</p>
//                 <div className="flex items-center gap-1 text-xs text-slate-400 pt-1">
//                   <MapPin size={14} />
//                   <span>{property.location}</span>
//                 </div>
//               </div>
//               <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
//                 <span className="text-sm font-bold text-indigo-600">
//                   ৳{property.pricePerMonth?.toLocaleString()}/mo
//                 </span>
//                 <span className="text-xs font-medium text-slate-400">ID: {property.id.slice(0, 6)}...</span>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }





'use client';

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash2, Edit, MapPin, Building2 } from 'lucide-react';
import Swal from 'sweetalert2';
export default function MyPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Update Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);


  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://prisma-project-tau-dun.vercel.app/landlord/properties', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setProperties(data.data);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Delete Handler
  // const handleDelete = async (id: string) => {
  //   if (!confirm('Are you sure you want to delete this property?')) return;

  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await fetch(`https://prisma-project-tau-dun.vercel.app/landlord/properties/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });

  //     if (response.ok) {

  //       setProperties(properties.filter((item) => (item.id || item._id) !== id));
  //       toast.success('Property removed successfully!');
  //     } else {
  //       toast.error('Failed to delete property');
  //     }
  //   } catch (error) {
  //     console.error('Delete error:', error);
  //     toast.error('Something went wrong!');
  //   }
  // };

  const handleDelete = async (id: string) => {

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://prisma-project-tau-dun.vercel.app/landlord/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setProperties(properties.filter((item) => (item.id || item._id) !== id));
        toast.success('Property removed successfully!');
      } else {
        toast.error('Failed to delete property');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Something went wrong!');
    }
  };

  // Open Update Modal
  const handleOpenUpdateModal = (property: any) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  // Update Submit Handler
  // Update Submit Handler
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = selectedProperty.id || selectedProperty._id;


    const updateData = {
      title: selectedProperty.title,
      pricePerMonth: Number(selectedProperty.price || selectedProperty.pricePerMonth),
      location: selectedProperty.location,
      description: selectedProperty.description || '',
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://prisma-project-tau-dun.vercel.app/landlord/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Property updated successfully!');
        setIsModalOpen(false);
        fetchProperties(); // লিস্ট রিফ্রেশ করার জন্য
      } else {
        toast.error(result.message || 'Failed to update property');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Something went wrong!');
    }
  };
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
        <h1 className="text-2xl font-bold text-slate-800">My Properties</h1>
        <p className="text-sm text-slate-500 mt-1">Manage and view all your listed properties.</p>
      </div>

      {/* Properties Grid */}
      {loading ? (
        <p className="text-center text-slate-500">Loading properties...</p>
      ) : properties.length === 0 ? (
        <p className="text-center text-slate-500">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => {
            const propId = property.id || property._id;

            // ক্যাটাগরি অবজেক্ট বা স্ট্রিং যাই হোক না কেন তা সেফলি হ্যান্ডেল করার জন্য
            const categoryName =
              typeof property.category === 'object' && property.category !== null
                ? property.category.name || property.category.title || 'House'
                : property.category || 'House';

            return (
              <div key={propId} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg flex items-center gap-1">
                      <Building2 size={12} /> {categoryName}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-green-50 text-green-600 rounded-lg">
                      {property.status || 'Available'}
                    </span>
                  </div>

                  <h2 className="font-bold text-slate-800 text-lg">{property.title}</h2>
                  <p className="text-xs text-slate-500 line-clamp-2">{property.description || property.comment || 'No description'}</p>

                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin size={13} /> {property.location}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-indigo-600">৳{property.price || property.totalPrice}/mo</span>

                  {/* Action Buttons: Update & Delete */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenUpdateModal(property)}
                      className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition cursor-pointer"
                      title="Update Property"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(propId)}
                      className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition cursor-pointer"
                      title="Delete Property"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Update Modal */}
      {isModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full space-y-4">
            <h2 className="text-lg font-bold text-slate-800">Update Property</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600">Title</label>
                <input
                  type="text"
                  value={selectedProperty.title || ''}
                  onChange={(e) => setSelectedProperty({ ...selectedProperty, title: e.target.value })}
                  className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Price</label>
                <input
                  type="number"
                  value={selectedProperty.price || selectedProperty.totalPrice || ''}
                  onChange={(e) => setSelectedProperty({ ...selectedProperty, price: Number(e.target.value) })}
                  className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Location</label>
                <input
                  type="text"
                  value={selectedProperty.location || ''}
                  onChange={(e) => setSelectedProperty({ ...selectedProperty, location: e.target.value })}
                  className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}