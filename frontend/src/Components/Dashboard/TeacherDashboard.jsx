import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { Bell, LogOut, Users, ClipboardList, BookOpen } from 'lucide-react';
import { useState } from 'react';
import ManageStudents from './ManageStudents';
import Attendance from './Attendance';
import Assignments from './Assignments/Assignments';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-5 flex flex-col h-full justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Teacher Dashboard</h2>
          <nav>
            <button
              className={`w-full py-2 px-4 mb-2 text-left rounded-lg ${
                activeSection === 'dashboard' ? 'bg-indigo-500 text-white' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveSection('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`w-full py-2 px-4 mb-2 text-left rounded-lg ${
                activeSection === 'manage-students' ? 'bg-indigo-500 text-white' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveSection('manage-students')}
            >
              Manage Students
            </button>
            <button
              className={`w-full py-2 px-4 mb-2 text-left rounded-lg ${
                activeSection === 'attendance' ? 'bg-indigo-500 text-white' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveSection('attendance')}
            >
              Attendance
            </button>
            <button
              className={`w-full py-2 px-4 mb-2 text-left rounded-lg ${
                activeSection === 'assignments' ? 'bg-indigo-500 text-white' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveSection('assignments')}
            >
              <BookOpen className="inline-block w-5 h-5 mr-2" />
              Assignments
            </button>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 text-left rounded-lg text-red-500 hover:text-red-700 flex items-center justify-center"
        >
          <LogOut className="mr-2" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeSection === 'dashboard' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-semibold">Welcome, Teacher!</h1>
              <button className="relative">
                <Bell className="w-6 h-6 text-gray-600 hover:text-indigo-500" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <Users className="w-10 h-10 text-indigo-500 mr-4" />
                <div>
                  <p className="text-lg font-semibold">Total Students</p>
                  <p className="text-2xl">24</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <ClipboardList className="w-10 h-10 text-yellow-500 mr-4" />
                <div>
                  <p className="text-lg font-semibold">Assignments Due</p>
                  <p className="text-2xl">5</p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeSection === 'manage-students' && <ManageStudents />}
        {activeSection === 'attendance' && <Attendance />}
        {activeSection === 'assignments' && <Assignments />}
      </div>
    </div>
  );
};

export default TeacherDashboard;
