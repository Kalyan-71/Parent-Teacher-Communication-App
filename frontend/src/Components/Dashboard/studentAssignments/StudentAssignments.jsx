import { useState } from "react";
import OngoingAssignments from "./OngoingAssignments";
import OverdueAssignments from "./OverdueAssignments";

const StudentAssignments = () => {
  const [activeTab, setActiveTab] = useState("ongoing");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Student Assignments</h2>

      {/* Tabs for Ongoing & Overdue Assignments */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "ongoing"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("ongoing")}
        >
          Ongoing
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "overdue"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("overdue")}
        >
          Overdue
        </button>
      </div>

      {/* Render Based on Active Tab */}
      {activeTab === "ongoing" ? <OngoingAssignments /> : <OverdueAssignments />}
    </div>
  );
};

export default StudentAssignments;
