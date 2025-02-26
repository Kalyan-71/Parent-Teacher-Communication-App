import { useEffect, useState } from "react";
import useAuthStore from "../../../store/authStore";
import axios from "axios";
import AssignmentItem from "./AssignmentItem";

const OngoingAssignments = () => {
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

        // Get ongoing assignments (due date in the future)
        const currentDate = new Date();
        const ongoing = studentAssignments.filter(
          (assignment) => new Date(assignment.dueDate) >= currentDate
        );

        // Sort by due date (ascending)
        ongoing.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

        setAssignments(ongoing);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, [user?.studentName]);

  return (
    <div>
      <h3 className="text-lg font-semibold text-blue-600 mb-2">Ongoing Assignments</h3>
      {assignments.length > 0 ? (
        <ul>
          {assignments.map((assignment) => (
            <AssignmentItem key={assignment._id} assignment={assignment} />
          ))}
        </ul>
      ) : (
        <p>No ongoing assignments.</p>
      )}
    </div>
  );
};

export default OngoingAssignments;
