import React, { useState, useEffect } from 'react';
import { Car, Leaf, MapPin, Star, Clock, Users, Zap, Shield } from 'lucide-react';

import React, { useState, useEffect } from 'react';
import { Car, Leaf, MapPin, Star, Clock, Users, Zap, Shield } from 'lucide-react';

// Hero Background Component
const HeroBackground = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'from-green-400 via-blue-500 to-purple-600',
    eco: 'from-green-300 via-emerald-400 to-teal-500',
    night: 'from-indigo-900 via-purple-900 to-pink-900',
    sunset: 'from-orange-400 via-red-500 to-pink-600'
  };

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${variants[variant]} overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Cars */}
        <div className="absolute top-20 left-10 animate-bounce opacity-20">
          <Car size={40} className="text-white" />
        </div>
        <div className="absolute top-40 right-20 animate-pulse opacity-30">
          <Car size={30} className="text-white transform rotate-45" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-bounce opacity-25" style={{animationDelay: '1s'}}>
          <Car size={35} className="text-white transform -rotate-12" />
        </div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-white opacity-5 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white opacity-15 transform rotate-45 animate-spin" style={{animationDuration: '10s'}}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Dashboard Background Component
const DashboardBackground = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 relative">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m0 0h100v100h-100z' fill='none'/%3E%3Cpath d='m0 0 50 50-50 50v-100z' fill='%23000' fill-opacity='0.02'/%3E%3Cpath d='m50 0 50 50-50 50-50-50z' fill='%23000' fill-opacity='0.01'/%3E%3C/svg%3E")`,
        }}>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 -right-20 w-60 h-60 bg-blue-200 rounded-full opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Map Background Component
const MapBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-100 to-green-100">
      {/* Map-like Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}>
        </div>
      </div>

      {/* Route Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path
          d="M100,200 Q300,100 500,200 T900,300"
          stroke="rgba(34, 197, 94, 0.3)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="10,5"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-30"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M150,400 Q400,300 700,400 T950,500"
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8,4"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;-24"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Auth Background Component
const AuthBackground = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative">
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='%23ffffff' fill-opacity='0.1' points='60,30 90,90 30,90'/%3E%3C/svg%3E")`,
        }}>
        </div>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Booking Background Component
const BookingBackground = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-400 via-cyan-500 to-blue-500 relative">
      {/* Dynamic Road Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="road" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="transparent"/>
              <rect x="45" y="0" width="10" height="25" fill="white" opacity="0.3"/>
              <rect x="45" y="35" width="10" height="25" fill="white" opacity="0.3"/>
              <rect x="45" y="70" width="10" height="25" fill="white" opacity="0.3"/>
            </pattern>
          </defs>
          <path d="M0,500 Q250,300 500,500 T1000,400" stroke="url(#road)" strokeWidth="60" fill="none"/>
          <path d="M0,300 Q300,200 600,300 T1000,200" stroke="url(#road)" strokeWidth="40" fill="none"/>
        </svg>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 animate-float opacity-30">
          <MapPin size={32} className="text-white" />
        </div>
        <div className="absolute top-40 right-32 animate-float opacity-25" style={{animationDelay: '1s'}}>
          <Clock size={28} className="text-white" />
        </div>
        <div className="absolute bottom-40 left-1/3 animate-float opacity-30" style={{animationDelay: '2s'}}>
          <Star size={24} className="text-white" />
        </div>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Profile/Settings Background
const ProfileBackground = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-purple-400 via-pink-500 to-red-500 relative">
      {/* Hexagon Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='40,0 20,20 20,60 40,80 60,60 60,20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}>
        </div>
      </div>

      {/* Profile Related Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-16 animate-pulse opacity-20">
          <Users size={36} className="text-white" />
        </div>
        <div className="absolute top-48 right-24 animate-pulse opacity-25" style={{animationDelay: '1.5s'}}>
          <Shield size={32} className="text-white" />
        </div>
        <div className="absolute bottom-32 right-16 animate-pulse opacity-20" style={{animationDelay: '3s'}}>
          <Zap size={28} className="text-white" />
        </div>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// History/Analytics Background
const HistoryBackground = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 relative">
      {/* Data Visualization Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 800">
          {/* Chart Lines */}
          <polyline
            points="50,600 150,400 250,500 350,300 450,400 550,200 650,350 750,150 850,250 950,100"
            fill="none"
            stroke="rgba(139, 92, 246, 0.3)"
            strokeWidth="2"
            strokeDasharray="5,5"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-20"
              dur="2s"
              repeatCount="indefinite"
            />
          </polyline>
          
          {/* Bar Chart */}
          {[100, 200, 150, 300, 250, 180, 220].map((height, i) => (
            <rect
              key={i}
              x={100 + i * 100}
              y={700 - height}
              width="60"
              height={height}
              fill="rgba(34, 197, 94, 0.2)"
              className="animate-pulse"
              style={{animationDelay: `${i * 0.5}s`}}
            />
          ))}
        </svg>
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}>
        </div>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Demo Component showing all backgrounds
const BackgroundShowcase = () => {
  const [currentBg, setCurrentBg] = useState('hero');

  const backgrounds = {
    hero: { component: HeroBackground, name: 'Hero Landing' },
    dashboard: { component: DashboardBackground, name: 'Dashboard' },
    map: { component: MapBackground, name: 'Map View' },
    auth: { component: AuthBackground, name: 'Authentication' },
    booking: { component: BookingBackground, name: 'Booking' },
    profile: { component: ProfileBackground, name: 'Profile' },
    history: { component: HistoryBackground, name: 'History' }
  };

  const CurrentBackground = backgrounds[currentBg].component;

  return (
    <CurrentBackground>
      <div className="container mx-auto px-6 py-8">
        {/* Background Selector */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white/10 backdrop-blur-md rounded-xl p-4">
          {Object.entries(backgrounds).map(([key, bg]) => (
            <button
              key={key}
              onClick={() => setCurrentBg(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentBg === key
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {bg.name}
            </button>
          ))}
        </div>

        {/* Content Demo */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {backgrounds[currentBg].name} Background
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              This is how your content will look on the {backgrounds[currentBg].name.toLowerCase()} background. 
              The background includes animated elements, gradients, and patterns optimized for this section.
            </p>
            
            {/* Sample Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-xl text-white">
                <Car className="mb-3" size={32} />
                <h3 className="text-xl font-semibold mb-2">Quick Ride</h3>
                <p className="text-green-100">Book a ride in seconds</p>
              </div>
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-xl text-white">
                <MapPin className="mb-3" size={32} />
                <h3 className="text-xl font-semibold mb-2">Live Tracking</h3>
                <p className="text-blue-100">Real-time GPS tracking</p>
              </div>
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-6 rounded-xl text-white">
                <Leaf className="mb-3" size={32} />
                <h3 className="text-xl font-semibold mb-2">Eco Friendly</h3>
                <p className="text-purple-100">Reduce your carbon footprint</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Primary Action
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors">
                Secondary Action
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </CurrentBackground>
  );
};

export default BackgroundShowcase;
