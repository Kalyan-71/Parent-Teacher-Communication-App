import { useState, useEffect } from "react";

const ViewAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);
  const [openTab, setOpenTab] = useState(null);

  useEffect(() => {
    fetchAssignments();
    const interval = setInterval(() => {
      setCurrentDate(new Date().toISOString().split("T")[0]);
    }, 86400000);
    return () => clearInterval(interval);
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/assignments");
      const data = await response.json();

      // ✅ Remove duplicate assignments based on title & subject
      const uniqueAssignments = [];
      const seen = new Map();

      data.forEach((assignment) => {
        const key = `${assignment.title}-${assignment.subject}`;
        if (!seen.has(key)) {
          seen.set(key, true);
          uniqueAssignments.push(assignment);
        }
      });

      // ✅ Sort assignments by `startDate` (latest first)
      uniqueAssignments.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

      setAssignments(uniqueAssignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const filterAssignments = (type) => {
    return assignments
      .filter(({ startDate, dueDate }) => {
        if (type === "scheduled") return startDate > currentDate;
        if (type === "current") return startDate <= currentDate && (!dueDate || dueDate >= currentDate);
        if (type === "completed") return dueDate && dueDate < currentDate;
        return false;
      })
      .sort((a, b) => new Date(b.startDate) - new Date(a.startDate)); // ✅ Sort latest first
  };

  const toggleTab = (tab) => {
    setOpenTab(openTab === tab ? null : tab);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600">View Assignments</h2>

      {["current", "scheduled", "completed"].map((tab) => (
        <div key={tab} className="mb-4">
          <button
            onClick={() => toggleTab(tab)}
            className="w-full text-left p-3 bg-indigo-500 text-white font-semibold rounded-lg"
          >
            {tab === "current" ? "📌 Current Assignments" : tab === "scheduled" ? "📅 Scheduled Assignments" : "✅ Completed Assignments"}
          </button>
          {openTab === tab && (
            <div className="p-4 bg-gray-100 rounded-lg mt-2">
              {filterAssignments(tab).length > 0 ? (
                <ul className="space-y-4">
                  {filterAssignments(tab).map((assignment, index) => (
                    <li key={index} className="p-4 border rounded-lg shadow bg-white">
                      <p><strong>Title:</strong> {assignment.title}</p>
                      <p><strong>Description:</strong> {assignment.description}</p>
                      <p><strong>Subject:</strong> {assignment.subject}</p>
                      <p><strong>Start Date:</strong> {assignment.startDate}</p>
                      {assignment.dueDate && <p><strong>Due Date:</strong> {assignment.dueDate}</p>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No assignments available.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewAssignments;
