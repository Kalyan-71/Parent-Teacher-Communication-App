import { useState } from "react";

const CreateAssignment = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    startDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    attachment: null,
  });

  const [showDueDate, setShowDueDate] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData({ ...formData, attachment: file });

      if (file) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("startDate", formData.startDate);
    formDataToSend.append("dueDate", formData.dueDate);
    if (formData.attachment) {
      formDataToSend.append("attachment", formData.attachment);
    }

    try {
      const response = await fetch("http://localhost:5000/api/assignments/create", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        setNotification("✅ Assignment Created Successfully!");
        setTimeout(() => setNotification(""), 5000);
        setFormData({
          title: "",
          description: "",
          subject: "",
          startDate: new Date().toISOString().split("T")[0],
          dueDate: "",
          attachment: null,
        });
        setFilePreview(null);
        setShowDueDate(false);
      } else {
        setNotification("❌ Failed to create assignment!");
      }
    } catch (error) {
      console.error("Error creating assignment:", error);
      setNotification("❌ Server error! Try again.");
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600">Create Assignment</h2>

      {notification && (
        <div className="mb-4 p-3 rounded-lg text-white bg-green-500">
          {notification}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
          placeholder="Assignment Title"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          className="w-full p-3 border rounded-lg"
          placeholder="Assignment Description"
        />

        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
          placeholder="Subject"
        />

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          className="w-full p-3 border rounded-lg"
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={showDueDate}
            onChange={() => setShowDueDate(!showDueDate)}
            className="mr-2"
          />
          <label className="text-gray-700">Enable Due Date</label>
        </div>

        {showDueDate && (
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            min={formData.startDate}
            className="w-full p-3 border rounded-lg"
          />
        )}

        <input
          type="file"
          name="attachment"
          onChange={handleChange}
          accept=".pdf,.png,.jpg,.jpeg,.mp4"
          className="w-full p-2 border rounded-lg"
        />

        <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
