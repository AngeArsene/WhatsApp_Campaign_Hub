import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
  BarChart3,
  Calendar,
  MessageSquare,
  Settings,
  Users,
  Facebook,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { url } = usePage();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <BarChart3 size={20} /> },
    { name: 'Contacts', path: '/contacts', icon: <Users size={20} /> },
    { name: 'Campaigns', path: '/campaigns', icon: <MessageSquare size={20} /> },
    { name: 'Schedule', path: '/schedule', icon: <Calendar size={20} /> },
    { name: 'Reports', path: '/reports', icon: <BarChart3 size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 bg-teal-800 text-white transition-all duration-300 ease-in-out z-20 ${
        isOpen ? 'w-64' : 'w-0 md:w-16'
      } overflow-hidden`}
    >
      <div className="h-16 flex items-center justify-center border-b border-teal-700">
        {isOpen ? (
          <h1 className="text-xl font-bold">Campaign Hub</h1>
        ) : (
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-teal-700 text-white">
            CH
          </div>
        )}
      </div>

      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = url === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                  ${isActive
                    ? 'bg-teal-900 text-white'
                    : 'text-teal-100 hover:bg-teal-700'}
                `}
              >
                <div className={`${isOpen ? 'mr-3' : 'mx-auto'}`}>{item.icon}</div>
                {isOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {isOpen && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="border-t border-teal-700 pt-4">
            <div className="text-xs text-teal-300 mb-2">Connected Platforms</div>
            <div className="flex items-center space-x-3">
              <Facebook size={18} className="text-teal-300" />
              <Linkedin size={18} className="text-teal-300" />
              <Twitter size={18} className="text-teal-300" />
              <Instagram size={18} className="text-teal-300" />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
