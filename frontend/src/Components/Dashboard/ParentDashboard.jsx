import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { Bell, LogOut, Calendar, LineChart, BookOpen } from 'lucide-react';
import { useState } from 'react';
import ChildAttendance from './ChildAttendance';
import ChildProgress from './ChildProgress';
import ParentCommunication from './ParentCommunication';
import Notifications from './Notifications';
import StudentAssignments from './studentAssignments/StudentAssignments';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white shadow-lg p-5 flex flex-col h-full justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Parent Dashboard</h2>
          <nav>
            {[
              { key: 'dashboard', label: 'Dashboard' },
              { key: 'attendance', label: 'Attendance' },
              { key: 'progress', label: 'Progress Reports' },
              { key: 'communication', label: 'Communication' },
              { key: 'notifications', label: 'Notifications' },
              { key: 'assignments', label: 'Student Assignments', icon: <BookOpen className="mr-2" /> },
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                className={`w-full py-2 px-4 mb-2 text-left flex items-center rounded-lg ${
                  activeSection === key ? 'bg-indigo-500 text-white' : 'hover:bg-gray-200'
                }`}
                onClick={() => setActiveSection(key)}
              >
                {icon && icon} {label}
              </button>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 text-left rounded-lg text-red-500 hover:text-red-700 flex items-center justify-center"
        >
          <LogOut className="mr-2" /> Logout
        </button>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 p-6">
        {activeSection === 'dashboard' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold">Welcome, Parent!</h1>
              <button className="relative">
                <Bell className="w-6 h-6 text-gray-600 hover:text-indigo-500" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">2</span>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <Calendar className="w-10 h-10 text-indigo-500 mr-4" />
                <div>
                  <p className="text-lg font-semibold">Attendance</p>
                  <p className="text-2xl">95%</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <LineChart className="w-10 h-10 text-green-500 mr-4" />
                <div>
                  <p className="text-lg font-semibold">Progress</p>
                  <p className="text-2xl">A-</p>
                </div>
              </div>
            </div>
          </>
        )}
        {activeSection === 'attendance' && <ChildAttendance />}
        {activeSection === 'progress' && <ChildProgress />}
        {activeSection === 'communication' && <ParentCommunication />}
        {activeSection === 'notifications' && <Notifications />}
        {activeSection === 'assignments' && <StudentAssignments />}
      </div>
    </div>
  );
};

export default ParentDashboard;
