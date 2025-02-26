import { useState } from 'react';
import CreateAssignment from './Components/CreateAssignment';
import ViewAssignments from './Components/ViewAssignments';

const Assignments = () => {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Assignments</h1>

      {/* Tabs Navigation */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 ${activeTab === 'create' ? 'border-b-2 border-indigo-500 text-indigo-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('create')}
        >
          Create Assignment
        </button>
        <button
          className={`py-2 px-4 ml-4 ${activeTab === 'view' ? 'border-b-2 border-indigo-500 text-indigo-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('view')}
        >
          View Created Assignments
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'create' ? <CreateAssignment /> : <ViewAssignments />}
    </div>
  );
};

export default Assignments;
