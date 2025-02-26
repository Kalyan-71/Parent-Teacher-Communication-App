import { useEffect, useState } from "react";

const CompletedAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch("/api/assignments?status=completed"); // Adjust API if needed
        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching completed assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div>
      {assignments.length > 0 ? (
        <ul className="space-y-4">
          {assignments.map((assignment) => (
            <li key={assignment._id} className="p-4 border rounded-lg shadow-md bg-white">
              <h3 className="text-lg font-semibold">✅ {assignment.title}</h3>
              <p><strong>Subject:</strong> {assignment.subject}</p>
              <p><strong>Completed On:</strong> {assignment.completedDate}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No completed assignments.</p>
      )}
    </div>
  );
};

export default CompletedAssignments;
