// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Mail, Lock, Eye, EyeOff, ArrowRight, Home } from 'lucide-react';

// export default function LoginPage() {
//   const router = useRouter();

//   // Form States
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // API Call to Backend
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         throw new Error(data.message || 'Login failed! Check your credentials.');
//       }

//       // Backend response payload schema:
//       // { success: true, message: "...", data: { token: "JWT...", user: { role: "TENANT" } } }
//       const token = data.data.token;
//       const userRole = data.data.user?.role || data.data.role; // ব্যাকএন্ডের ইউজার রোল (TENANT / LANDLORD / ADMIN)

//       // Save token and role in localStorage
//       localStorage.setItem('token', token);
//       if (userRole) {
//         localStorage.setItem('role', userRole);
//       }

//       // Save token and role in Cookies (middleware / server component checking-এর জন্য)
//       document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
//       if (userRole) {
//         document.cookie = `role=${userRole}; path=/; max-age=86400; SameSite=Lax`;
//       }

//       // Redirect user after successful login
//       router.push('/properties');
      
//     } catch (err: any) {
//       setError(err.message || 'Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
//       {/* Top Brand Header */}
//       <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
//         <Link
//           href="/"
//           className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-black transition mb-4"
//         >
//           <Home className="w-4 h-4" />
//           <span>Back to Home</span>
//         </Link>
//         <h2 className="text-3xl font-extrabold text-gray-900">
//           Welcome back
//         </h2>
//       </div>

//       {/* Main Login Form Card */}
//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
//         <div className="bg-white py-8 px-6 shadow-xl shadow-gray-200/50 rounded-3xl border border-gray-100 sm:px-10">
          
//           {/* Error Message Alert */}
//           {error && (
//             <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm font-medium">
//               {error}
//             </div>
//           )}

//           <form className="space-y-5" onSubmit={handleSubmit}>
            
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
//               <div className="flex justify-between items-center mb-2">
//                 <label
//                   htmlFor="password"
//                   className="block text-xs font-bold text-gray-700 uppercase tracking-wider"
//                 >
//                   Password
//                 </label>
//                 <Link
//                   href="/auth/forgot-password"
//                   className="text-xs font-semibold text-gray-500 hover:text-black transition"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
//                   <Lock className="h-5 w-5" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="••••••••"
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
//                 className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-2xl shadow-lg shadow-black/10 text-sm font-semibold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 transition active:scale-[0.99] cursor-pointer"
//               >
//                 {loading ? (
//                   <span>Signing in...</span>
//                 ) : (
//                   <>
//                     <span>Sign In</span>
//                     <ArrowRight className="w-4 h-4" />
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>

//           {/* Create Account Link */}
//           <div className="mt-6 pt-6 border-t border-gray-100 text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{' '}
//               <Link
//                 href="/auth/register"
//                 className="font-semibold text-blue-600 hover:text-blue-500 transition"
//               >
//                 Create an account
//               </Link>
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }