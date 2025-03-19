import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '../../validation/loginSchema';
import { ArrowRight, Eye, EyeOff, Facebook, Mail, ArrowLeft } from 'lucide-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuth() || {}; 
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include credentials so cookies are sent/stored
        body: JSON.stringify(data)
      });
      const result = await response.json();
      
      if (!response.ok) {
        console.error(result.error || 'Login failed.');
        return;
      }
      
      // Optionally update auth state here if needed
      setAuth({
        email: result.user.email,
        accessToken: result?.accessToken
      });
      
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Error during login:', err);
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#F4F3FF] py-3 px-6 text-center text-sm">
        <span className="text-gray-600">
          Don't have an account yet?
        </span>
        <NavLink to="/register" className="ml-3 text-[#6366F1] font-medium hover:text-[#4F46E5] transition-colors">
          Create an account
        </NavLink>
      </div>

      {/* Form Content */}
      <div className="min-h-screen flex">
        {/* Left Panel */}
        <div className="hidden lg:flex lg:w-[480px] bg-[#1C1B24] text-white p-12 flex-col">
          <div className="mb-20 flex flex-col relative">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
              <text x="0" y="30" fill="white" className="text-2xl font-bold">Cozy Cove</text>
            </svg>
            <hr className="w-[250%] absolute right-[-15%] top-20 opacity-15" />
          </div>

          <div className="flex-1">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Welcome back to your account.
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Sign in to access your dashboard, manage your Sensory Boxes, and continue where you left off.
            </p>
          </div>

          <div className="bg-[#2A2937] p-6 rounded-xl">
            <p className="text-gray-400 text-sm">
              <span className="font-semibold text-gray-300">Need help?</span> If you're having trouble signing in, please contact our support team for assistance.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col">
          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 lg:px-12">
            <div className="w-full max-w-[560px]">
              {/* Logo (mobile only) */}
              <div className="mb-16 lg:hidden">
                <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
                  <text x="0" y="30" fill="#1C1B24" className="text-2xl font-bold">Cozy Cove</text>
                </svg>
              </div>

              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#1C1B24] mb-3">
                  Sign in to your account
                </h2>
                <p className="text-gray-600">
                  Enter your credentials below to access your account
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register('email')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-shadow"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      {...register('password')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-shadow"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <a href="#" className="text-sm text-[#6366F1] hover:underline">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#6366F1] text-white py-4 rounded-lg font-medium hover:bg-[#4F46E5] transition-colors flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
