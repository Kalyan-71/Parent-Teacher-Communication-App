import { useEffect, useState } from "react";
import useAuthStore from "../../../store/authStore";
import axios from "axios";
import AssignmentItem from "./AssignmentItem";

const OverdueAssignments = () => {
  const { user } = useAuthStore();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get("/api/assignments");
        const allAssignments = response.data;

        // Get student name from user (parent's child)
        const studentName = user?.studentName;

        // Filter assignments by student name
        const studentAssignments = allAssignments.filter(
          (assignment) => assignment.studentId?.name === studentName
        );

        // Get overdue assignments (due date in the past)
        const currentDate = new Date();
        const overdue = studentAssignments.filter(
          (assignment) => new Date(assignment.dueDate) < currentDate
        );

        // Sort by due date (descending for overdue)
        overdue.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));

        setAssignments(overdue);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, [user?.studentName]);

  return (
    <div>
      <h3 className="text-lg font-semibold text-red-600 mb-2">Overdue Assignments</h3>
      {assignments.length > 0 ? (
        <ul>
          {assignments.map((assignment) => (
            <AssignmentItem key={assignment._id} assignment={assignment} />
          ))}
        </ul>
      ) : (
        <p>No overdue assignments.</p>
      )}
    </div>
  );
};

export default OverdueAssignments;
