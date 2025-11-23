import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Calendar, Home, Trophy, Flame, Check, X, Star, Target, Clock, Tag, Sparkles, Zap, User, Mail, Lock, Eye, EyeOff, Award, TrendingUp, LogOut, Loader2, AlertCircle, Menu, Bell, Download } from 'lucide-react';

// API Configuration
const API_URL = 'https://task-manager-backend-x6h1.onrender.com/api';

const api = {
  setToken: (token) => localStorage.setItem('token', token),
  getToken: () => localStorage.getItem('token'),
  clearToken: () => localStorage.removeItem('token'),

  headers: () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${api.getToken()}`
  }),

  // Auth
  signup: async (name, email, password) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Signup failed');
    return data;
  },

  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  },

  getMe: async () => {
    const res = await fetch(`${API_URL}/auth/me`, { headers: api.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to get user');
    return data;
  },

  // Sections
  getSections: async () => {
    const res = await fetch(`${API_URL}/sections`, { headers: api.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to get sections');
    return data;
  },

  createSection: async (data) => {
    const res = await fetch(`${API_URL}/sections`, {
      method: 'POST',
      headers: api.headers(),
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to create section');
    return result;
  },

  deleteSection: async (id) => {
    const res = await fetch(`${API_URL}/sections/${id}`, {
      method: 'DELETE',
      headers: api.headers()
    });
    if (!res.ok) throw new Error('Failed to delete section');
  },

  // Subsections
  createSubsection: async (sectionId, data) => {
    const res = await fetch(`${API_URL}/sections/${sectionId}/subsections`, {
      method: 'POST',
      headers: api.headers(),
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to create subsection');
    return result;
  },

  deleteSubsection: async (id) => {
    const res = await fetch(`${API_URL}/subsections/${id}`, {
      method: 'DELETE',
      headers: api.headers()
    });
    if (!res.ok) throw new Error('Failed to delete subsection');
  },

  // Tasks
  createTask: async (data) => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: api.headers(),
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to create task');
    return result;
  },

  completeTask: async (id) => {
    const res = await fetch(`${API_URL}/tasks/${id}/complete`, {
      method: 'POST',
      headers: api.headers()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to complete task');
    return data;
  },

  deleteTask: async (id) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: api.headers()
    });
    if (!res.ok) throw new Error('Failed to delete task');
  },

  getTasksByDate: async (date) => {
    const res = await fetch(`${API_URL}/tasks/date/${date}`, { headers: api.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to get tasks');
    return data;
  },

  getCalendarStats: async (year, month) => {
    const res = await fetch(`${API_URL}/tasks/calendar/${year}/${month}`, { headers: api.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to get calendar stats');
    return data;
  },

  // Stats & Achievements
  getStats: async () => {
    const res = await fetch(`${API_URL}/stats`, { headers: api.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to get stats');
    return data;
  },

  getWeeklyStats: async () => {
    const res = await fetch(`${API_URL}/stats/weekly`, { headers: api.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to get weekly stats');
    return data;
  },

  getAchievements: async () => {
    const res = await fetch(`${API_URL}/achievements`, { headers: api.headers() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to get achievements');
    return data;
  }
};

// Confetti Component - Enhanced
const Confetti = ({ active }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (active) {
      setParticles(Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2.5 + Math.random() * 2,
        color: ['rgb(0, 212, 255)', 'rgb(123, 97, 255)', 'rgb(255, 107, 157)', 'rgb(255, 217, 61)', 'rgb(107, 203, 119)', 'rgb(255, 140, 66)', 'rgb(255, 71, 133)', 'rgb(139, 92, 246)'][Math.floor(Math.random() * 8)],
        size: 8 + Math.random() * 10,
        rotation: Math.random() * 360,
        shape: Math.random() > 0.5 ? 'square' : 'circle'
      })));
      const timer = setTimeout(() => setParticles([]), 4000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: '-20px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            animation: `confettiFall ${p.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${p.delay}s forwards`,
            transform: `rotate(${p.rotation}deg)`,
            boxShadow: `0 0 ${p.size}px ${p.color}40`
          }}
        />
      ))}
    </div>
  );
};

// Progress Ring
const ProgressRing = ({ percent, size = 60, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;
  const hue = 120 * (percent / 100);

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={`hsl(${hue}, 70%, 50%)`}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        className="fill-white text-xs font-bold"
        style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}
      >
        {percent}%
      </text>
    </svg>
  );
};

// Glass Card - Enhanced with liquid effects
const GlassCard = ({ children, className = '', onClick, hover3D = true, glowColor = 'cyan' }) => {
  const [transform, setTransform] = useState('');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!hover3D) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform(`perspective(1000px) rotateY(${(x - 0.5) * 10}deg) rotateX(${(0.5 - y) * 10}deg) scale3d(1.03, 1.03, 1.03)`);
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const glowColors = {
    cyan: '0, 212, 255',
    purple: '123, 97, 255',
    green: '107, 203, 119'
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setTransform('');
        setGlowPos({ x: 50, y: 50 });
      }}
      className={`relative overflow-hidden rounded-3xl cursor-pointer backdrop-blur-xl border border-white/10 transition-all duration-300 active:scale-[0.98] ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
        transform,
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease'
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(${glowColors[glowColor]}, 0.2) 0%, transparent 50%)`,
          transition: 'background 0.3s ease'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
      </div>
      {children}
    </div>
  );
};

// Modal
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
      />
      <div
        onClick={e => e.stopPropagation()}
        className={`relative w-full ${sizes[size]} rounded-3xl p-6 max-h-[85vh] overflow-y-auto transition-all duration-500 backdrop-blur-2xl border border-white/10 ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
          }`}
        style={{
          background: 'linear-gradient(145deg, rgba(15,25,50,0.98) 0%, rgba(8,16,35,0.99) 100%)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,212,255,0.1)'
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 transition-all duration-300 hover:rotate-90"
          >
            <X size={22} className="text-white/70" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Task Card
const TaskCard = ({ task, onComplete, onDelete, sectionName, sectionIcon, subsectionName, compact = false }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const isCompleted = task.status === 'completed';
  const priorityColors = {
    high: 'from-red-500 to-orange-500',
    medium: 'from-yellow-500 to-amber-500',
    low: 'from-green-500 to-emerald-500'
  };

  const date = task.type === 'daily'
    ? (task.targetDate ? new Date(task.targetDate).toLocaleDateString() : 'Today')
    : (task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline');

  const handleDelete = async (e) => {
    console.log('TaskCard handleDelete called!');
    e.stopPropagation();
    // Temporarily removed confirmation for debugging  
    // if (window.confirm('Delete this task?')) {
    setIsDeleting(true);
    // Wait for animation to complete before actually deleting
    setTimeout(() => {
      onDelete(task.id || task._id);
    }, 800);
    // }
  };

  return (
    <GlassCard
      className={`p-5 sm:p-6 ${isCompleted ? 'opacity-50' : ''} ${isDeleting ? 'animate-magic-delete' : ''}`}
      hover3D={!isCompleted && !isDeleting}
      glowColor={isCompleted ? 'green' : 'cyan'}
    >
      {isDeleting && (
        <>
          {/* Sparkle particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"
              style={{
                left: `${50 + Math.cos(i * 30 * Math.PI / 180) * 40}%`,
                top: `${50 + Math.sin(i * 30 * Math.PI / 180) * 40}%`,
                animation: `sparkle-out 0.8s ease-out forwards`,
                animationDelay: `${i * 0.05}s`,
                boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)'
              }}
            />
          ))}
        </>
      )}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${priorityColors[task.priority]} rounded-t-3xl opacity-60`} />
      <div className="flex items-start gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!isCompleted) onComplete(task.id || task._id);
          }}
          className={`flex-shrink-0 w-12 h-12 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${isCompleted
            ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/40 scale-110'
            : 'bg-white/10 hover:bg-cyan-500/30 hover:scale-110'
            }`}
        >
          <Check
            size={18}
            className={`text-white transition-all duration-300 ${isCompleted ? 'opacity-100' : 'opacity-0'
              }`}
          />
        </button>
        <div className="flex-1 min-w-0">
          <h4
            className={`font-semibold text-white text-xl sm:text-lg transition-all duration-300 ${isCompleted ? 'line-through opacity-60' : ''
              }`}
          >
            {task.title}
          </h4>
          {sectionName && (
            <p className="text-sm text-white/50 mt-1">
              {sectionIcon} {sectionName}
              {subsectionName && ` → ${subsectionName}`}
            </p>
          )}
          <div className="flex flex-wrap gap-3 mt-4 sm:mt-3">
            <span
              className={`px-4 py-2 sm:px-3 sm:py-1 rounded-full text-sm sm:text-xs font-semibold flex items-center gap-1 ${task.type === 'daily'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                }`}
            >
              {task.type === 'daily' ? (
                <>
                  <Clock size={12} />
                  Daily
                </>
              ) : (
                <>
                  <Target size={12} />
                  Deadline
                </>
              )}
            </span>
            <span className="px-4 py-2 sm:px-3 sm:py-1 rounded-full text-sm sm:text-xs bg-white/10 text-white/70 border border-white/10">
              {date}
            </span>
            <span
              className={`px-4 py-2 sm:px-3 sm:py-1 rounded-full text-sm sm:text-xs font-semibold capitalize ${task.priority === 'high'
                ? 'bg-red-500/20 text-red-300'
                : task.priority === 'medium'
                  ? 'bg-yellow-500/20 text-yellow-300'
                  : 'bg-green-500/20 text-green-300'
                }`}
            >
              {task.priority}
            </span>
          </div>
          {!compact && task.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {task.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded-lg text-xs bg-white/5 text-white/40 flex items-center gap-1"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {onDelete && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 rounded-xl hover:bg-red-500/20 transition-all duration-300 disabled:opacity-50"
          >
            <X size={18} className="text-red-400" />
          </button>
        )}
      </div>
      <style>{`
        @keyframes magic-delete {
          0% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1) rotate(5deg);
          }
          100% {
            opacity: 0;
            transform: scale(0.3) rotate(20deg) translateY(-100px);
          }
        }
        @keyframes sparkle-out {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx, 50px), var(--ty, -50px)) scale(0);
          }
        }
        .animate-magic-delete {
          animation: magic-delete 0.8s ease-out forwards;
        }
      `}</style>
    </GlassCard >
  );
};

// Section Card
const SectionCard = ({ section, onClick, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    console.log('SectionCard handleDelete called!', section);
    e.stopPropagation();
    console.log('After stopPropagation');
    // Temporarily removed confirmation for debugging
    // if (window.confirm('Delete this section and all its tasks?')) {
    console.log('Starting delete animation');
    setIsDeleting(true);
    setTimeout(() => {
      console.log('Calling onDelete with id:', section.id || section._id);
      onDelete(section.id || section._id);
    }, 800);
    // }
  };

  return (
    <GlassCard onClick={onClick} className={`p-6 sm:p-6 group ${isDeleting ? 'animate-magic-delete' : ''}`}>
      {isDeleting && (
        <>
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-br from-cyan-300 to-purple-400 rounded-full"
              style={{
                left: `${50 + Math.cos(i * 24 * Math.PI / 180) * 45}%`,
                top: `${50 + Math.sin(i * 24 * Math.PI / 180) * 45}%`,
                animation: `sparkle-out 0.8s ease-out forwards`,
                animationDelay: `${i * 0.04}s`,
                boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)'
              }}
            />
          ))}
        </>
      )}
      <div className="flex items-center gap-5">
        <div className="text-6xl sm:text-5xl transform group-hover:scale-110 transition-transform duration-500">
          {section.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
            {section.title}
          </h3>
          <p className="text-sm text-white/50 mt-1">
            {section.subsections?.length || 0} subsections • {section.tasks?.length || 0} tasks
          </p>
        </div>
        <ProgressRing percent={section.completionPercent} size={65} strokeWidth={5} />
        {onDelete && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 rounded-xl hover:bg-red-500/20 transition-all duration-300 hover:scale-110 disabled:opacity-50"
          >
            <X size={18} className="text-red-400" />
          </button>
        )}
      </div>
    </GlassCard>
  );
};

// Subsection Card
const SubsectionCard = ({ subsection, onClick, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    console.log('SubsectionCard handleDelete called!');
    e.stopPropagation();
    // Temporarily removed confirmation for debugging
    // if (window.confirm('Delete this subsection and all its tasks?')) {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(subsection.id || subsection._id);
    }, 800);
    // }
  };

  return (
    <GlassCard onClick={onClick} className={`p-6 sm:p-5 group ${isDeleting ? 'animate-magic-delete' : ''}`} glowColor="purple">
      {isDeleting && (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full"
              style={{
                left: `${50 + Math.cos(i * 36 * Math.PI / 180) * 40}%`,
                top: `${50 + Math.sin(i * 36 * Math.PI / 180) * 40}%`,
                animation: `sparkle-out 0.8s ease-out forwards`,
                animationDelay: `${i * 0.05}s`,
                boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)'
              }}
            />
          ))}
        </>
      )}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center border border-purple-500/20">
          <Sparkles size={22} className="text-purple-300" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-white text-xl sm:text-lg">{subsection.title}</h4>
          <p className="text-sm text-white/50">{subsection.tasks?.length || 0} tasks</p>
        </div>
        <div className="flex-shrink-0">
          <ProgressRing percent={subsection.completionPercent} size={50} strokeWidth={4} />
        </div>
        {onDelete && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 rounded-xl hover:bg-red-500/20 transition-all duration-300 hover:scale-110 disabled:opacity-50"
          >
            <X size={18} className="text-red-400" />
          </button>
        )}
      </div>
    </GlassCard>
  );
};

// Calendar View
const CalendarView = ({ onDateClick, currentDate, setCurrentDate, calendarStats }) => {
  const getDaysInMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1).getDay();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const today = new Date();
  const days = [];

  for (let i = 0; i < getFirstDayOfMonth(currentDate); i++) {
    days.push(null);
  }
  for (let i = 1; i <= getDaysInMonth(currentDate); i++) {
    days.push(i);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
        >
          <ChevronLeft size={22} className="text-white" />
        </button>
        <h3 className="text-xl font-bold text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
        >
          <ChevronLeft size={22} className="text-white rotate-180" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-3">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="text-center text-sm text-white/50 py-2 font-medium">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, i) => {
          if (!day) return <div key={i} />;

          const stats = calendarStats[day] || { t: 0, c: 0 };
          const percent = stats.t > 0 ? Math.round((stats.c / stats.t) * 100) : 0;
          const isToday = day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
          const hue = 120 * (percent / 100);
          const lightness = 20 + percent / 3;
          const bgColor = stats.t > 0 ? `hsl(${hue}, 70%, ${lightness}%)` : 'rgba(255,255,255,0.03)';

          return (
            <button
              key={i}
              onClick={() => {
                const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                onDateClick(dateStr, stats);
              }}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:z-10 ${isToday ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#0a1628]' : ''
                }`}
              style={{
                backgroundColor: bgColor,
                boxShadow: stats.t > 0 ? `0 4px 20px ${bgColor}40` : 'none'
              }}
            >
              <span className={`font-bold text-lg ${stats.t > 0 && percent > 30 ? 'text-white' : 'text-white/60'}`}>
                {day}
              </span>
              {stats.t > 0 && (
                <span className="text-[10px] text-white/80 font-medium">
                  {stats.c}/{stats.t}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Add Form
const AddForm = ({ type, onSubmit, loading, currentSection }) => {
  const [formData, setFormData] = useState(
    type === 'section' ? { title: '', icon: '📁' } :
      type === 'subsection' ? { title: '' } :
        { title: '', type: 'daily', deadline: '', priority: 'medium', tags: '' }
  );

  const icons = ['📁', '🧮', '💼', '📚', '🎯', '💡', '🚀', '⚡', '🔥', '✨', '🏆', '💪', '🎨', '🔧', '📝', '🌟'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData };

    if (type === 'task') {
      if (data.tags) {
        data.tags = data.tags.split(',').map(t => t.trim()).filter(Boolean);
      } else {
        data.tags = [];
      }

      if (data.type === 'daily') {
        data.targetDate = new Date().toISOString();
        delete data.deadline;
      } else {
        delete data.targetDate;
      }

      data.sectionId = currentSection.id || currentSection._id;
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {type === 'section' && (
        <div>
          <label className="block text-sm text-white/70 mb-3 font-medium">Choose Icon</label>
          <div className="flex flex-wrap gap-2">
            {icons.map(icon => (
              <button
                key={icon}
                type="button"
                onClick={() => setFormData({ ...formData, icon })}
                className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all duration-300 ${formData.icon === icon
                  ? 'bg-gradient-to-br from-cyan-500/40 to-purple-500/40 ring-2 ring-cyan-400 scale-110'
                  : 'bg-white/10 hover:bg-white/20 hover:scale-105'
                  }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm text-white/70 mb-2 font-medium">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
          placeholder={`Enter ${type} title...`}
        />
      </div>

      {type === 'task' && (
        <>
          <div>
            <label className="block text-sm text-white/70 mb-3 font-medium">Task Type</label>
            <div className="flex gap-3">
              {[
                { v: 'daily', l: 'Daily Task', d: 'For today', icon: Clock },
                { v: 'deadline', l: 'Deadline Task', d: 'With due date', icon: Target }
              ].map(t => (
                <button
                  key={t.v}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: t.v })}
                  className={`flex-1 py-4 px-4 rounded-xl text-sm font-medium transition-all duration-300 flex flex-col items-center gap-1 ${formData.type === t.v
                    ? 'bg-gradient-to-br from-cyan-500/30 to-purple-500/30 text-cyan-300 ring-2 ring-cyan-500/50'
                    : 'bg-white/10 text-white/70 hover:bg-white/15'
                    }`}
                >
                  <t.icon size={20} />
                  <span>{t.l}</span>
                  <span className="text-xs opacity-60">{t.d}</span>
                </button>
              ))}
            </div>
          </div>

          {formData.type === 'deadline' && (
            <div>
              <label className="block text-sm text-white/70 mb-2 font-medium">Deadline Date</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                required
                className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-white/70 mb-3 font-medium">Priority Level</label>
            <div className="flex gap-3">
              {[
                { v: 'low', c: 'green', bg: 'rgba(34,197,94,0.3)', text: '#86efac' },
                { v: 'medium', c: 'yellow', bg: 'rgba(234,179,8,0.3)', text: '#fde047' },
                { v: 'high', c: 'red', bg: 'rgba(239,68,68,0.3)', text: '#fca5a5' }
              ].map(p => (
                <button
                  key={p.v}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: p.v })}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold capitalize ${formData.priority === p.v ? '' : 'bg-white/10 text-white/70 hover:bg-white/15'
                    }`}
                  style={
                    formData.priority === p.v
                      ? { background: p.bg, color: p.text, boxShadow: `0 0 20px ${p.bg}` }
                      : {}
                  }
                >
                  {p.v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-2 font-medium">
              Tags <span className="opacity-50">(comma separated)</span>
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
              placeholder="leetcode, arrays, easy"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg hover:opacity-90 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Creating...
          </>
        ) : (
          `Create ${type.charAt(0).toUpperCase() + type.slice(1)}`
        )}
      </button>
    </form>
  );
};

// Stats Bar
// Stats Bar - Redesigned for Mobile
const StatsBar = ({ stats }) => (
  <div className="grid grid-cols-3 gap-3 sm:gap-6">
    <GlassCard className="p-4 sm:p-6 flex flex-col items-center justify-center gap-2" hover3D={false}>
      <div className="p-2 rounded-xl bg-yellow-500/20 mb-1">
        <Trophy size={20} className="text-yellow-400" />
      </div>
      <div className="text-center">
        <span className="font-bold text-white text-lg sm:text-xl block leading-none mb-1">
          {stats.points?.toLocaleString() || 0}
        </span>
        <p className="text-[10px] sm:text-xs text-white/50 font-medium uppercase tracking-wider">Points</p>
      </div>
    </GlassCard>

    <GlassCard className="p-4 sm:p-6 flex flex-col items-center justify-center gap-2" hover3D={false}>
      <div className="p-2 rounded-xl bg-orange-500/20 mb-1">
        <Flame size={20} className="text-orange-400" />
      </div>
      <div className="text-center">
        <span className="font-bold text-white text-lg sm:text-xl block leading-none mb-1">
          {stats.streak || 0}
        </span>
        <p className="text-[10px] sm:text-xs text-white/50 font-medium uppercase tracking-wider">Streak</p>
      </div>
    </GlassCard>

    <GlassCard className="p-4 sm:p-6 flex flex-col items-center justify-center gap-2" hover3D={false}>
      <div className="p-2 rounded-xl bg-cyan-500/20 mb-1">
        <Zap size={20} className="text-cyan-400" />
      </div>
      <div className="text-center">
        <span className="font-bold text-white text-lg sm:text-xl block leading-none mb-1">
          {stats.tasksCompleted || 0}/{stats.totalTasks || 0}
        </span>
        <p className="text-[10px] sm:text-xs text-white/50 font-medium uppercase tracking-wider">Done</p>
      </div>
    </GlassCard>
  </div>
);

// Weekly Heatmap - Enhanced with clickable days
const WeeklyHeatmap = ({ weeklyData, onDateClick }) => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex gap-2 sm:gap-3">
      {weeklyData.map((day, i) => {
        const date = new Date(day.date);
        const dayName = dayNames[date.getDay()];
        const hue = 120 * (day.percent / 100);
        const lightness = 25 + day.percent / 3;
        const isToday = new Date().toDateString() === date.toDateString();

        return (
          <button
            key={i}
            onClick={() => {
              if (onDateClick) {
                const dateStr = date.toISOString().split('T')[0];
                onDateClick(dateStr, { t: day.total, c: day.completed });
              }
            }}
            className="flex-1 flex flex-col items-center gap-2 group"
          >
            <div
              className={`w-full aspect-square rounded-xl transition-all duration-500 hover:scale-110 cursor-pointer relative overflow-hidden ${isToday ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#0a1628]' : ''
                }`}
              style={{
                backgroundColor: `hsl(${hue}, 70%, ${lightness}%)`,
                boxShadow: `0 4px 15px hsl(${hue}, 70%, 25%, 0.4)`
              }}
              title={`${day.completed}/${day.total} tasks completed`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white/90">{day.completed}/{day.total}</span>
              </div>
            </div>
            <span className="text-xs text-white/60 font-medium group-hover:text-white/90 transition-colors">{dayName}</span>
          </button>
        );
      })}
    </div>
  );
};

// Logo Component - Enhanced
const Logo = ({ size = 'large', animated = true }) => {
  const sizes = {
    small: { container: 'w-12 h-12', icon: 24, text: 'text-xl' },
    medium: { container: 'w-16 h-16', icon: 32, text: 'text-2xl' },
    large: { container: 'w-24 h-24', icon: 48, text: 'text-4xl' }
  };

  const config = sizes[size];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative group">
        {/* Animated glow rings */}
        {animated && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-700" style={{ animationDelay: '0.5s' }} />
          </>
        )}

        {/* Main logo container */}
        <div className={`relative ${config.container} rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-2xl shadow-blue-500/50 ${animated ? 'transform group-hover:scale-110 group-hover:rotate-6' : ''} transition-all duration-700`}>
          {/* Inner glow */}
          <div className="absolute inset-1 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-2xl" />

          {/* Icon */}
          <div className="relative">
            <Zap size={config.icon} className="text-white drop-shadow-2xl" strokeWidth={2.5} />
            {animated && (
              <>
                <Sparkles size={config.icon * 0.4} className="absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
                <div className="absolute inset-0 bg-white/20 rounded-full blur-md animate-pulse" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* App name */}
      <div className="text-center">
        <h1 className={`${config.text} font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg`}>
          ProductiFlow
        </h1>
        {size === 'large' && (
          <p className="text-sm text-white/60 mt-1 font-medium">Elevate Your Productivity</p>
        )}
      </div>
    </div>
  );
};

// Auth Page - Completely Redesigned
const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const data = await api.login(formData.email, formData.password);
        api.setToken(data.token);
        onLogin(data.user);
      } else {
        const data = await api.signup(formData.name, formData.email, formData.password);
        api.setToken(data.token);
        onLogin(data.user);
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #0f1f3d 25%, #0a1628 50%, #1a2744 75%, #0a1628 100%)'
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl animate-blob animation-delay-4000" />

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: Math.random() * 2 + 's'
            }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Logo */}
        <div className="mb-8">
          <Logo size="large" animated={true} />
        </div>

        {/* Main card */}
        <div
          className="relative overflow-hidden rounded-3xl p-8 backdrop-blur-2xl border border-white/10 shadow-2xl"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,212,255,0.15), inset 0 1px 0 rgba(255,255,255,0.2)'
          }}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-indigo-500/10 opacity-50" />

          <div className="relative">
            {/* Tab switcher */}
            <div className="flex mb-8 p-1.5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              {['Login', 'Sign Up'].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => {
                    setIsLogin(i === 0);
                    setError('');
                  }}
                  className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all duration-500 relative overflow-hidden ${(i === 0 ? isLogin : !isLogin)
                    ? 'text-white shadow-lg'
                    : 'text-white/50 hover:text-white/80'
                    }`}
                >
                  {(i === 0 ? isLogin : !isLogin) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 animate-gradient" />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {i === 0 ? <User size={16} /> : <Sparkles size={16} />}
                    {tab}
                  </span>
                </button>
              ))}
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-sm flex items-center gap-3 animate-shake">
                <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                <p className="text-red-300 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="relative group">
                  <div className="relative flex items-center">
                    <User size={20} className="absolute left-4 text-white/40 group-focus-within:text-slate-400 transition-colors" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required={!isLogin}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-slate-700/70 focus:border-slate-600/70 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Full Name"
                    />
                  </div>
                </div>
              )}

              <div className="relative group">
                <div className="relative flex items-center">
                  <Mail size={20} className="absolute left-4 text-white/40 group-focus-within:text-slate-400 transition-colors" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-slate-700/70 focus:border-slate-600/70 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Email Address"
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="relative flex items-center">
                  <Lock size={20} className="absolute left-4 text-white/40 group-focus-within:text-slate-400 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-slate-700/70 focus:border-slate-600/70 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-white/40 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-lg text-white relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </>
                  ) : (
                    <>
                      {isLogin ? (
                        <>
                          <User size={20} />
                          Sign In
                        </>
                      ) : (
                        <>
                          <Sparkles size={20} />
                          Create Account
                        </>
                      )}
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Footer text */}
            <div className="mt-6 text-center">
              <p className="text-white/40 text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                {' '}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-white/30 text-xs">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/30" />
            <Sparkles size={12} className="animate-pulse" />
            <span>Secure & Encrypted</span>
            <Sparkles size={12} className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/30" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease;
        }
      `}</style>
    </div>
  );
};

// App Header Component - Enhanced with new Logo
const AppHeader = ({ user, onLogout }) => (
  <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
    <div className="flex items-center gap-4">
      <Logo size="medium" animated={true} />
    </div>
    <button
      onClick={onLogout}
      className="p-3 sm:p-4 rounded-xl bg-white/10 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 transition-all duration-300 hover:scale-105 group"
      title="Sign Out"
    >
      <LogOut size={20} className="text-white/70 group-hover:text-red-400 transition-colors" />
    </button>
  </div>
);

// Rewards Page
const RewardsPage = ({ stats, achievements }) => (
  <div className="space-y-8">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white mb-2">Your Rewards</h1>
      <p className="text-white/50">Track your achievements and milestones</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <GlassCard className="p-6 text-center" hover3D={false}>
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-yellow-500/30 to-orange-500/30 flex items-center justify-center mb-4">
          <Trophy size={32} className="text-yellow-400" />
        </div>
        <p className="text-3xl font-bold text-white">{stats.points?.toLocaleString() || 0}</p>
        <p className="text-white/50 text-sm">Total Points</p>
      </GlassCard>

      <GlassCard className="p-6 text-center" hover3D={false}>
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-500/30 to-red-500/30 flex items-center justify-center mb-4">
          <Flame size={32} className="text-orange-400" />
        </div>
        <p className="text-3xl font-bold text-white">{stats.streak || 0}</p>
        <p className="text-white/50 text-sm">Day Streak</p>
      </GlassCard>

      <GlassCard className="p-6 text-center" hover3D={false}>
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center mb-4">
          <TrendingUp size={32} className="text-green-400" />
        </div>
        <p className="text-3xl font-bold text-white">
          {stats.totalTasks > 0 ? Math.round((stats.tasksCompleted / stats.totalTasks) * 100) : 0}%
        </p>
        <p className="text-white/50 text-sm">Completion Rate</p>
      </GlassCard>
    </div>

    <div>
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Award size={24} className="text-purple-400" />
        Achievements
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map(a => (
          <GlassCard
            key={a.id}
            className={`p-5 ${!a.unlocked ? 'opacity-50' : ''}`}
            hover3D={a.unlocked}
            glowColor={a.unlocked ? 'purple' : 'cyan'}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${a.unlocked
                  ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30'
                  : 'bg-white/10'
                  }`}
              >
                {a.unlocked ? a.icon : '🔒'}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white">{a.title}</h3>
                <p className="text-sm text-white/50">{a.desc}</p>
              </div>
              <div className="text-right">
                <span
                  className={`text-lg font-bold ${a.unlocked ? 'text-yellow-400' : 'text-white/30'
                    }`}
                >
                  +{a.points}
                </span>
                <p className="text-xs text-white/40">points</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  </div>
);

// Install Prompt Component
const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent)) {
        setIsMobile(true);
      }
    };
    checkMobile();

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Check if user has already dismissed or installed
      const hasInstalled = localStorage.getItem('appInstalled');
      const hasDismissed = localStorage.getItem('installPromptDismissed');

      if (!hasInstalled && !hasDismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      localStorage.setItem('appInstalled', 'true');
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('installPromptDismissed', 'true');
    // Reset dismissal after 7 days (optional logic could go here)
  };

  if (!showPrompt || !isMobile) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 animate-slide-up">
      <GlassCard className="p-4 flex items-center justify-between gap-4 shadow-2xl border-cyan-500/30" glowColor="cyan">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <img src="/icon-192.png" alt="App Icon" className="w-10 h-10 object-contain" onError={(e) => e.target.style.display = 'none'} />
            <Zap size={24} className="text-white absolute" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">Install App</h3>
            <p className="text-white/60 text-xs">Add to home screen for better experience</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDismiss}
            className="p-2 rounded-lg hover:bg-white/10 text-white/50 transition-colors"
          >
            <X size={20} />
          </button>
          <button
            onClick={handleInstall}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all hover:scale-105 flex items-center gap-2"
          >
            <Download size={16} />
            Install
          </button>
        </div>
      </GlassCard>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

// Main App
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');
  const [sections, setSections] = useState([]);
  const [stats, setStats] = useState({ points: 0, streak: 0, tasksCompleted: 0, totalTasks: 0 });
  const [achievements, setAchievements] = useState([]);
  const [currentSection, setCurrentSection] = useState(null);
  const [currentSubsection, setCurrentSubsection] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [modalOpen, setModalOpen] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateTasks, setDateTasks] = useState([]);
  const [dateStats, setDateStats] = useState({ t: 0, c: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [weeklyData, setWeeklyData] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [calendarStats, setCalendarStats] = useState({});
  const [newAchievements, setNewAchievements] = useState([]);
  const [deletingItems, setDeletingItems] = useState(new Set());

  // Check authentication on mount
  useEffect(() => {
    const token = api.getToken();
    if (token) {
      loadUserData();
    }
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await api.getMe();
      setUser(userData.user);
      setIsAuthenticated(true);
      await Promise.all([
        loadSections(),
        loadStats(),
        loadAchievements(),
        loadWeeklyStats()
      ]);
    } catch (err) {
      api.clearToken();
      setIsAuthenticated(false);
    }
  };

  const loadSections = async () => {
    try {
      const data = await api.getSections();
      setSections(data);
    } catch (err) {
      setError('Failed to load sections');
    }
  };

  const loadStats = async () => {
    try {
      const data = await api.getStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const loadAchievements = async () => {
    try {
      const data = await api.getAchievements();
      setAchievements(data);
    } catch (err) {
      console.error('Failed to load achievements:', err);
    }
  };

  const loadWeeklyStats = async () => {
    try {
      const data = await api.getWeeklyStats();
      setWeeklyData(data);
    } catch (err) {
      console.error('Failed to load weekly stats:', err);
    }
  };

  const loadCalendarStats = async (year, month) => {
    try {
      const data = await api.getCalendarStats(year, month);
      setCalendarStats(data);
    } catch (err) {
      console.error('Failed to load calendar stats:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated && view === 'calendar') {
      loadCalendarStats(calendarDate.getFullYear(), calendarDate.getMonth() + 1);
    }
  }, [isAuthenticated, view, calendarDate]);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    loadUserData();
  };

  const handleLogout = () => {
    api.clearToken();
    setIsAuthenticated(false);
    setUser(null);
    setSections([]);
    setStats({ points: 0, streak: 0, tasksCompleted: 0, totalTasks: 0 });
    setView('home');
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const result = await api.completeTask(taskId);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      if (result.newAchievements && result.newAchievements.length > 0) {
        setNewAchievements(result.newAchievements);
        setTimeout(() => {
          setNewAchievements([]);
        }, 5000);
      }

      await Promise.all([
        loadSections(),
        loadStats(),
        loadAchievements(),
        loadWeeklyStats()
      ]);

      if (currentSection) {
        const updated = await api.getSections();
        const section = updated.find(s => (s.id || s._id) === (currentSection.id || currentSection._id));
        setCurrentSection(section);

        if (currentSubsection) {
          const subsection = section?.subsections.find(
            sub => (sub.id || sub._id) === (currentSubsection.id || currentSubsection._id)
          );
          setCurrentSubsection(subsection);
        }
      }

      if (selectedDate) {
        const tasks = await api.getTasksByDate(selectedDate);
        setDateTasks(tasks);
        const completed = tasks.filter(t => t.status === 'completed').length;
        setDateStats({ t: tasks.length, c: completed });
      }

      // Auto-delete completed task after 2 seconds
      setTimeout(() => {
        handleDeleteTask(taskId);
      }, 2000);
    } catch (err) {
      console.error('Complete task error:', err);
      setError(err.message || 'Failed to complete task');
    }
  };

  const handleDateClick = async (date, stats) => {
    setSelectedDate(date);
    setDateStats(stats);
    try {
      const tasks = await api.getTasksByDate(date);
      setDateTasks(tasks);
      setModalOpen('dateTasks');
    } catch (err) {
      setError('Failed to load tasks for this date');
    }
  };

  const handleAddSection = async (data) => {
    setLoading(true);
    try {
      const newSection = await api.createSection(data);
      await loadSections();
      setModalOpen(null);
    } catch (err) {
      setError(err.message || 'Failed to create section');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubsection = async (data) => {
    setLoading(true);
    try {
      const sectionId = currentSection.id || currentSection._id;
      await api.createSubsection(sectionId, data);
      await loadSections();

      const updated = sections.find(s => (s.id || s._id) === sectionId);
      setCurrentSection(updated);
      setModalOpen(null);
    } catch (err) {
      setError(err.message || 'Failed to create subsection');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (data) => {
    setLoading(true);
    try {
      data.sectionId = currentSection.id || currentSection._id;
      if (currentSubsection) {
        data.subsectionId = currentSubsection.id || currentSubsection._id;
      }

      await api.createTask(data);
      await Promise.all([loadSections(), loadStats()]);

      const updated = await api.getSections();
      const section = updated.find(s => (s.id || s._id) === data.sectionId);
      setCurrentSection(section);

      if (currentSubsection) {
        const subsection = section?.subsections.find(
          sub => (sub.id || sub._id) === data.subsectionId
        );
        setCurrentSubsection(subsection);
      }

      setModalOpen(null);
    } catch (err) {
      setError(err.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSection = async (id) => {
    try {
      console.log('Deleting section:', id);

      // Immediately update UI by removing the section
      setSections(prevSections => prevSections.filter(s => (s.id || s._id) !== id));

      // Then call the API
      await api.deleteSection(id);
      console.log('Section deleted successfully');

      // Reload to ensure consistency
      await loadSections();
    } catch (err) {
      console.error('Delete section error:', err);
      setError('Failed to delete section: ' + err.message);
      // Reload sections to restore state if delete failed
      await loadSections();
    }
  };

  const handleDeleteSubsection = async (id) => {
    try {
      console.log('Deleting subsection:', id);

      // Immediately update UI
      if (currentSection) {
        const updatedSection = {
          ...currentSection,
          subsections: currentSection.subsections.filter(sub => (sub.id || sub._id) !== id)
        };
        setCurrentSection(updatedSection);
      }

      await api.deleteSubsection(id);
      console.log('Subsection deleted successfully');

      await loadSections();
      const updated = await api.getSections();
      const section = updated.find(s => (s.id || s._id) === (currentSection.id || currentSection._id));
      setCurrentSection(section);
    } catch (err) {
      console.error('Delete subsection error:', err);
      setError('Failed to delete subsection: ' + err.message);
      await loadSections();
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      console.log('Deleting task:', id);

      // Immediately update UI by removing the task from current section/subsection
      if (currentSection) {
        const updatedSection = { ...currentSection };

        if (currentSubsection) {
          // Remove from subsection
          updatedSection.subsections = updatedSection.subsections.map(sub => {
            if ((sub.id || sub._id) === (currentSubsection.id || currentSubsection._id)) {
              return {
                ...sub,
                tasks: sub.tasks.filter(t => (t.id || t._id) !== id)
              };
            }
            return sub;
          });

          const updatedSubsection = updatedSection.subsections.find(
            sub => (sub.id || sub._id) === (currentSubsection.id || currentSubsection._id)
          );
          setCurrentSubsection(updatedSubsection);
        } else {
          // Remove from section
          updatedSection.tasks = updatedSection.tasks.filter(t => (t.id || t._id) !== id);
        }

        setCurrentSection(updatedSection);
      }

      // Update sections list
      setSections(prevSections => prevSections.map(section => {
        if ((section.id || section._id) === (currentSection?.id || currentSection?._id)) {
          return currentSection;
        }
        return section;
      }));

      await api.deleteTask(id);
      console.log('Task deleted successfully');

      await Promise.all([loadSections(), loadStats()]);

      if (currentSection) {
        const updated = await api.getSections();
        const section = updated.find(s => (s.id || s._id) === (currentSection.id || currentSection._id));
        setCurrentSection(section);

        if (currentSubsection) {
          const subsection = section?.subsections.find(
            sub => (sub.id || sub._id) === (currentSubsection.id || currentSubsection._id)
          );
          setCurrentSubsection(subsection);
        }
      }

      if (selectedDate) {
        const tasks = await api.getTasksByDate(selectedDate);
        setDateTasks(tasks);
      }
    } catch (err) {
      console.error('Delete task error:', err);
      setError('Failed to delete task: ' + err.message);
      // Reload to restore state if delete failed
      await loadSections();
    }
  };

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  const renderHome = () => (
    <div className="space-y-8">
      <AppHeader user={user} onLogout={handleLogout} />

      <StatsBar stats={stats} />

      {weeklyData.length > 0 && (
        <GlassCard className="p-6" hover3D={false}>
          <h3 className="text-lg font-semibold text-white/80 mb-4">This Week's Progress</h3>
          <WeeklyHeatmap weeklyData={weeklyData} onDateClick={handleDateClick} />
        </GlassCard>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Your Sections</h2>
        <button
          onClick={() => setModalOpen('addSection')}
          className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-500 hover:scale-110"
        >
          <Plus size={24} className="text-white" />
        </button>
      </div>

      {sections.length === 0 ? (
        <GlassCard className="p-12 text-center" hover3D={false}>
          <Star size={64} className="text-white/15 mx-auto mb-4" />
          <p className="text-white/50 text-lg mb-4">No sections yet. Create your first section to get started!</p>
          <button
            onClick={() => setModalOpen('addSection')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-all"
          >
            Create First Section
          </button>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {sections.map(section => (
            <SectionCard
              key={section.id || section._id}
              section={section}
              onClick={() => {
                setCurrentSection(section);
                setView('section');
              }}
              onDelete={handleDeleteSection}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderSection = () => {
    if (!currentSection) return null;
    const hasSubsections = currentSection.subsections?.length > 0;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setView('home');
              setCurrentSection(null);
            }}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <div className="flex-1 flex items-center gap-4">
            <span className="text-5xl">{currentSection.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-white">{currentSection.title}</h1>
              <p className="text-white/50">{currentSection.completionPercent}% complete</p>
            </div>
          </div>
          <ProgressRing percent={currentSection.completionPercent} size={70} strokeWidth={6} />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setModalOpen('addSubsection')}
            className="flex-1 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white/70 font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Plus size={18} /> Add Subsection
          </button>
          {!hasSubsections && (
            <button
              onClick={() => setModalOpen('addTask')}
              className="flex-1 py-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-cyan-300 font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <Plus size={18} /> Add Task
            </button>
          )}
        </div>

        {hasSubsections ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white/80">Subsections</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {currentSection.subsections.map(sub => (
                <SubsectionCard
                  key={sub.id || sub._id}
                  subsection={sub}
                  onClick={() => {
                    setCurrentSubsection(sub);
                    setView('subsection');
                  }}
                  onDelete={handleDeleteSubsection}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white/80">Tasks</h2>
            {currentSection.tasks?.length === 0 ? (
              <GlassCard className="p-12 text-center" hover3D={false}>
                <Star size={48} className="text-white/20 mx-auto mb-4" />
                <p className="text-white/50 text-lg">No tasks yet. Add your first task!</p>
              </GlassCard>
            ) : (
              <div className="grid gap-4">
                {currentSection.tasks?.map(task => (
                  <TaskCard
                    key={task.id || task._id}
                    task={task}
                    onComplete={handleCompleteTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderSubsection = () => {
    if (!currentSubsection) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setView('section');
              setCurrentSubsection(null);
            }}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <div className="flex-1">
            <p className="text-sm text-white/50 mb-1">
              {currentSection.icon} {currentSection.title}
            </p>
            <h1 className="text-3xl font-bold text-white">{currentSubsection.title}</h1>
          </div>
          <ProgressRing percent={currentSubsection.completionPercent} size={70} strokeWidth={6} />
        </div>

        <button
          onClick={() => setModalOpen('addTask')}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-cyan-300 font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01]"
        >
          <Plus size={18} /> Add Task
        </button>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white/80">Tasks</h2>
          {currentSubsection.tasks?.length === 0 ? (
            <GlassCard className="p-12 text-center" hover3D={false}>
              <Star size={48} className="text-white/20 mx-auto mb-4" />
              <p className="text-white/50 text-lg">No tasks yet. Add your first task!</p>
            </GlassCard>
          ) : (
            <div className="grid gap-4">
              {currentSubsection.tasks?.map(task => (
                <TaskCard
                  key={task.id || task._id}
                  task={task}
                  onComplete={handleCompleteTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCalendar = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Calendar View</h1>
        <p className="text-white/50">Track your daily progress</p>
      </div>

      <GlassCard className="p-6" hover3D={false}>
        <CalendarView
          onDateClick={handleDateClick}
          currentDate={calendarDate}
          setCurrentDate={setCalendarDate}
          calendarStats={calendarStats}
        />
      </GlassCard>

      <div className="flex items-center justify-center gap-6 text-sm text-white/60">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg" style={{ backgroundColor: 'hsl(0, 70%, 25%)' }} />
          <span>0%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg" style={{ backgroundColor: 'hsl(60, 70%, 40%)' }} />
          <span>50%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg" style={{ backgroundColor: 'hsl(120, 70%, 50%)' }} />
          <span>100%</span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: 'linear-gradient(180deg, #050A1A 0%, #0A1628 50%, #061122 100%)'
      }}
    >
      <Confetti active={showConfetti} />
      <InstallPrompt />

      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }
        * { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }

        /* Prevent horizontal overflow */
        body { overflow-x: hidden; }
      `}</style>

      {/* Achievement Notifications */}
      {newAchievements.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-3">
          {newAchievements.map((ach, idx) => (
            <div
              key={idx}
              className="px-6 py-4 rounded-2xl backdrop-blur-xl border border-yellow-500/30 shadow-2xl shadow-yellow-500/20 animate-pulse"
              style={{
                background: 'linear-gradient(135deg, rgba(234,179,8,0.2) 0%, rgba(202,138,4,0.3) 100%)'
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{ach.icon}</span>
                <div>
                  <p className="text-yellow-300 font-bold">Achievement Unlocked!</p>
                  <p className="text-white text-sm">{ach.title} (+{ach.points} points)</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <div className="px-6 py-4 rounded-2xl backdrop-blur-xl border border-red-500/30 shadow-2xl flex items-center gap-3"
            style={{
              background: 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(220,38,38,0.3) 100%)'
            }}
          >
            <AlertCircle size={20} className="text-red-400" />
            <p className="text-white">{error}</p>
            <button onClick={() => setError('')} className="ml-4">
              <X size={18} className="text-white/70 hover:text-white" />
            </button>
          </div>
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:flex flex-col w-20 p-4 items-center gap-4 border-r border-white/5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mb-4">
            <Zap size={24} className="text-white" />
          </div>
          {[
            { v: 'home', i: Home },
            { v: 'calendar', i: Calendar },
            { v: 'rewards', i: Trophy }
          ].map(({ v, i: Icon }) => (
            <button
              key={v}
              onClick={() => {
                setView(v);
                setCurrentSection(null);
                setCurrentSubsection(null);
              }}
              className={`p-4 rounded-2xl transition-all duration-500 ${view === v
                ? 'bg-gradient-to-br from-cyan-500/30 to-purple-500/30 text-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}
            >
              <Icon size={24} />
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-5 sm:p-6 lg:p-8 pb-32 lg:pb-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto w-full">
            {view === 'home' && renderHome()}
            {view === 'section' && renderSection()}
            {view === 'subsection' && renderSubsection()}
            {view === 'calendar' && renderCalendar()}
            {view === 'rewards' && <RewardsPage stats={stats} achievements={achievements} />}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 sm:p-4 z-40">
        <div
          className="flex items-center justify-around py-3 sm:py-4 px-4 sm:px-6 rounded-3xl mx-auto max-w-md backdrop-blur-2xl border border-white/10 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(15,25,50,0.98) 0%, rgba(8,16,35,0.99) 100%)',
            boxShadow: '0 -8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(0,212,255,0.1)'
          }}
        >
          {[
            { v: 'home', i: Home, l: 'Home' },
            { v: 'calendar', i: Calendar, l: 'Calendar' },
            { v: 'rewards', i: Trophy, l: 'Rewards' }
          ].map(({ v, i: Icon, l }) => (
            <button
              key={v}
              onClick={() => {
                setView(v);
                setCurrentSection(null);
                setCurrentSubsection(null);
              }}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-500 min-w-[60px] ${view === v ? 'text-cyan-400' : 'text-white/40'
                }`}
            >
              <div className={`p-2 rounded-xl transition-all duration-500 ${view === v ? 'bg-cyan-500/20 shadow-lg shadow-cyan-500/30' : ''}`}>
                <Icon size={22} />
              </div>
              <span className="text-xs font-medium">{l}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={modalOpen === 'addSection'} onClose={() => setModalOpen(null)} title="Create New Section">
        <AddForm type="section" onSubmit={handleAddSection} loading={loading} />
      </Modal>

      <Modal isOpen={modalOpen === 'addSubsection'} onClose={() => setModalOpen(null)} title="Create Subsection">
        <AddForm type="subsection" onSubmit={handleAddSubsection} loading={loading} />
      </Modal>

      <Modal isOpen={modalOpen === 'addTask'} onClose={() => setModalOpen(null)} title="Create New Task">
        <AddForm type="task" onSubmit={handleAddTask} loading={loading} currentSection={currentSection} />
      </Modal>

      <Modal isOpen={modalOpen === 'dateTasks'} onClose={() => setModalOpen(null)} title={`Tasks for ${selectedDate}`} size="lg">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${dateStats.t > 0 ? (dateStats.c / dateStats.t) * 100 : 0}%`,
                background: `linear-gradient(90deg, hsl(${120 * (dateStats.c / Math.max(dateStats.t, 1))}, 70%, 50%), hsl(${120 * (dateStats.c / Math.max(dateStats.t, 1)) + 20}, 70%, 60%))`
              }}
            />
          </div>
          <span className="text-white font-bold">{dateStats.c}/{dateStats.t} completed</span>
        </div>

        {dateTasks.length === 0 ? (
          <div className="text-center py-16">
            <Calendar size={64} className="text-white/15 mx-auto mb-4" />
            <p className="text-white/50 text-lg">No tasks scheduled for this day</p>
            <p className="text-white/30 text-sm mt-2">Select a different date or add new tasks</p>
          </div>
        ) : (
          <div className="grid gap-4 max-h-96 overflow-y-auto pr-2">
            {dateTasks.map(task => (
              <TaskCard
                key={task.id || task._id}
                task={task}
                onComplete={handleCompleteTask}
                onDelete={handleDeleteTask}
                sectionName={task.sectionName}
                sectionIcon={task.sectionIcon}
                subsectionName={task.subsectionName}
              />
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}