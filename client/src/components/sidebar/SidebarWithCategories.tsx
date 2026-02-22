import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser, UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import { 
  Home, Star, LayoutDashboard, Package, FileText, 
  ChevronDown, ChevronUp, UserCircle, Settings, 
  HelpCircle, Search, MapPin, LogOut
} from 'lucide-react';
import { serviceCategories, type ServiceItem } from './SidebarData';
import logo from '@/assets/logo.png';

interface SidebarWithCategoriesProps {
  onSelectItem?: (item: ServiceItem) => void;
}

const SidebarWithCategories: React.FC<SidebarWithCategoriesProps> = ({ onSelectItem }) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleExpand = (name: string) => {
    setExpanded(expanded === name ? null : name);
  };

  const handleItemClick = (item: ServiceItem) => {
    onSelectItem?.(item);
  };

  // Filter categories based on search
  const filteredCategories = searchTerm.trim()
    ? serviceCategories
        .map(cat => ({
          ...cat,
          items: cat.items.filter(item => 
            item.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }))
        .filter(cat => cat.items.length > 0)
    : serviceCategories;

  // Get user display name
  const getUserDisplayName = () => {
    if (user?.fullName) return user.fullName;
    if (user?.firstName) return user.firstName;
    return 'User';
  };

  // Get user email
  const getUserEmail = () => {
    return user?.primaryEmailAddress?.emailAddress || '';
  };

  return (
    <motion.div 
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col h-screen w-64 bg-white border-r text-gray-900 select-none"
    >
      {/* Logo */}
      <div className="flex items-center h-20 px-6 font-bold text-2xl tracking-tight border-b">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Any Where Door" className="h-16 w-auto" />
        </Link>
      </div>

      {/* Search */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center bg-gray-100 rounded px-3 py-2 border border-gray-200">
          <Search className="text-gray-400 mr-2 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none w-full text-sm placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Categories */}
      <nav className="flex-1 px-0 py-2 overflow-y-auto">
        {filteredCategories.map((cat) => {
          const CatIcon = cat.icon;
          return (
            <div key={cat.title}>
              <motion.div
                className={`flex items-center px-6 py-2.5 rounded-lg cursor-pointer transition-colors group font-medium text-base hover:bg-gray-50 ${expanded === cat.title ? 'bg-gray-50' : ''}`}
                onClick={() => cat.items.length > 0 ? handleExpand(cat.title) : undefined}
                whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-3"><CatIcon className="w-5 h-5" /></span>
                <span className="flex-1">{cat.title}</span>
                {cat.items.length > 0 && (
                  expanded === cat.title ? (
                    <ChevronUp className="ml-2 w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="ml-2 w-4 h-4 text-gray-400" />
                  )
                )}
              </motion.div>
              
              {/* Subcategories */}
              <AnimatePresence>
                {expanded === cat.title && cat.items.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-12 mt-1 mb-2">
                      {cat.items.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <motion.div
                            key={item.label}
                            className="py-1.5 px-2 text-sm text-gray-700 rounded hover:bg-gray-100 cursor-pointer font-normal flex items-center gap-2"
                            onClick={() => handleItemClick(item)}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <ItemIcon className="w-3 h-3 text-gray-400" />
                            {item.label}
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="border-t mx-4 my-2" />

      {/* Bottom Section */}
      <div className="px-4 pb-2">
        <motion.div 
          className="flex items-center py-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 text-base font-medium"
          whileHover={{ x: 4 }}
        >
          <HelpCircle className="mr-3 w-5 h-5" />
          <span>Support</span>
        </motion.div>
        <motion.div 
          className="flex items-center py-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 text-base font-medium"
          whileHover={{ x: 4 }}
        >
          <Settings className="mr-3 w-5 h-5" />
          <span>Settings</span>
        </motion.div>
      </div>

      {/* User Profile - Integrated with Clerk */}
      <div className="flex items-center px-4 py-4 border-t mt-2 bg-white">
        <SignedIn>
          {isLoaded && user && (
            <>
              {user.imageUrl ? (
                <img 
                  src={user.imageUrl} 
                  alt={getUserDisplayName()}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
              ) : (
                <UserCircle className="w-10 h-10 mr-3 text-gray-400" />
              )}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">{getUserDisplayName()}</div>
                <div className="text-xs text-gray-500 truncate">{getUserEmail()}</div>
              </div>
            </>
          )}
        </SignedIn>
        
        <SignedOut>
          <UserCircle className="w-10 h-10 mr-3 text-gray-400" />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">Guest User</div>
            <SignInButton mode="modal">
              <button className="text-xs text-blue-600 hover:text-blue-800 truncate">
                Click to login
              </button>
            </SignInButton>
          </div>
        </SignedOut>
      </div>
    </motion.div>
  );
};

export default SidebarWithCategories;
