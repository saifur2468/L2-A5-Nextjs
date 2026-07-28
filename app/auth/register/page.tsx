// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Home, Building2, UserCheck } from 'lucide-react';

// export default function RegisterPage() {
//   const router = useRouter();

//   // Form States
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'TENANT', 
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleRoleSelect = (role: 'TENANT' | 'LANDLORD') => {
//     setFormData((prev) => ({ ...prev, role }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setLoading(true);
//   setError('');

//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/register`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         role: formData.role, 
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok || !data.success) {
//       throw new Error(data.message || 'Registration failed!');
//     }

    
//     alert('Account created successfully! Please login.');
//     router.push('/');

//   } catch (err: any) {
//     setError(err.message || 'Something went wrong during registration.');
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
//       {/* Top Brand Header */}
//       <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
//         <Link href="/" className="inline-flex items-center gap-2 group">
//           {/* <div className="w-10 h-10 bg-black text-white rounded-2xl flex items-center justify-center font-bold text-xl group-hover:scale-105 transition">
//             R
//           </div>
//           <span className="text-2xl font-black text-gray-900 tracking-tight">
//             Rent<span className="text-blue-600">Nest</span>
//           </span> */}
//           <Link
//               href="/"
//               className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-black transition"
//             >
//               <Home className="w-4 h-4" />
//               <span>Back to Home</span>
//             </Link>
//         </Link>
//         <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//           Create an account
//         </h2>
       
//       </div>

//       {/* Main Register Form Card */}
//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
//         <div className="bg-white py-8 px-6 shadow-xl shadow-gray-200/50 rounded-3xl border border-gray-100 sm:px-10">
          
//           {/* Error Message Alert */}
//           {error && (
//             <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm font-medium">
//               {error}
//             </div>
//           )}

//           <form className="space-y-5" onSubmit={handleSubmit}>
            
//             {/* Account Type Selector (Tenant vs Landlord) */}
//             <div>
//               <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
//                 I want to join as
//               </label>
//               <div className="grid grid-cols-2 gap-3">
//                 <button
//                   type="button"
//                   onClick={() => handleRoleSelect('TENANT')}
//                   className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-sm font-semibold transition ${
//                     formData.role === 'TENANT'
//                       ? 'border-black bg-black text-white shadow-md'
//                       : 'border-gray-200 bg-gray-50/50 text-gray-600 hover:bg-gray-100'
//                   }`}
//                 >
//                   <UserCheck className="w-5 h-5 mb-1" />
//                   Tenant
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => handleRoleSelect('LANDLORD')}
//                   className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-sm font-semibold transition ${
//                     formData.role === 'LANDLORD'
//                       ? 'border-black bg-black text-white shadow-md'
//                       : 'border-gray-200 bg-gray-50/50 text-gray-600 hover:bg-gray-100'
//                   }`}
//                 >
//                   <Building2 className="w-5 h-5 mb-1" />
//                   Landlord
//                 </button>
//               </div>
//             </div>

//             {/* Full Name Field */}
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2"
//               >
//                 Full Name
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
//                   <User className="h-5 w-5" />
//                 </div>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="John Doe"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition bg-gray-50/50 focus:bg-white"
//                 />
//               </div>
//             </div>

//             {/* Email Field */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2"
//               >
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
//                   <Mail className="h-5 w-5" />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="name@example.com"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition bg-gray-50/50 focus:bg-white"
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
//                   <Lock className="h-5 w-5" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   required
//                   minLength={6}
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Minimum 6 characters"
//                   className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition bg-gray-50/50 focus:bg-white"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5" />
//                   ) : (
//                     <Eye className="h-5 w-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="pt-2">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-2xl shadow-lg shadow-black/10 text-sm font-semibold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 transition active:scale-[0.99]"
//               >
//                 {loading ? (
//                   <span>Creating account...</span>
//                 ) : (
//                   <>
//                     <span>Create Account</span>
//                     <ArrowRight className="w-4 h-4" />
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>

//           {/* Quick Back to Home */}
//           <div className="mt-6 pt-6 border-t border-gray-100 text-center">
//              <p className="mt-2 text-sm text-gray-600">
//           Already have an account?{' '}
//           <Link
//             href="/auth/login"
//             className="font-semibold text-blue-600 hover:text-blue-500 transition"
//           >
//             Sign in
//           </Link>
//         </p>
            
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }