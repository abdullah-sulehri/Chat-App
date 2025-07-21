import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User,Sparkles } from "lucide-react"
import { useState } from 'react';
import { Link } from "react-router-dom"
import AuthImagePattern from "../components/AuthImagePattern"
import toast from "react-hot-toast"


const LoginPage = () => {
    const {login,isLoggingIn} = useAuthStore();
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState({
        email:"",
        password:"",
    })

   
    const validateForm = () => {
   
    if(!formData.email.trim()){
        return toast.error("Email is required")
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        return toast.error("Invalid email format");
    }
    if (!formData.password) {
        return toast.error("Password is required");

    }
    
   return true;
  }
     const handleSubmit = async(e)=>{
        e.preventDefault();
        const success=validateForm();
        if(success==true){
                login(formData);    
        }
    };
    return (
     <div className="min-h-screen grid lg:grid-cols-2 bg-base-100">
      {/* Left side - Enhanced Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 pointer-events-none"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* Enhanced Logo Section */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-4 group">
              <div className="relative">
                <div className="size-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <MessageSquare className="size-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="size-5 text-primary animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-base-content to-base-content/80 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-base-content/60 text-lg">Sign in to your account</p>
              </div>
            </div>
          </div>

          {/* Enhanced Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content/80">Email</span>
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 transition-colors group-focus-within:text-primary">
                  <Mail className="w-5 h-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border-2 border-base-300 bg-base-100 py-3 pl-12 pr-4 text-base transition-all duration-200 focus:outline-none focus:ring-0 focus:border-primary hover:border-base-content/20 placeholder:text-base-content/40"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content/80">Password</span>
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 transition-colors group-focus-within:text-primary">
                  <Lock className="w-5 h-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-xl border-2 border-base-300 bg-base-100 py-3 pl-12 pr-12 text-base transition-all duration-200 focus:outline-none focus:ring-0 focus:border-primary hover:border-base-content/20 placeholder:text-base-content/40"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-base-200/50 rounded-r-xl transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40 hover:text-base-content/60 transition-colors" />
                  ) : (
                    <Eye className="size-5 text-base-content/40 hover:text-base-content/60 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                 <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center pt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-base-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-base-100 text-base-content/60">Don't have an account?</span>
              </div>
            </div>
            <div className="mt-4">
              <Link
                to="/Signup"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors duration-200 hover:underline decoration-2 underline-offset-4"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  )
}

export default LoginPage
