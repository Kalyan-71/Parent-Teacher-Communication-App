const AssignmentItem = ({ assignment }) => {
    return (
      <li className="border p-2 my-2 rounded bg-white shadow">
        <strong>Title:</strong> {assignment.title} <br />
        <strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()} <br />
        <strong>Subject:</strong> {assignment.subject} <br />
        <strong>Description:</strong> {assignment.description}
      </li>
    );
  };
  
  export default AssignmentItem;
  