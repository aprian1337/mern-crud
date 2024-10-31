import React, { useState, useEffect } from "react";

interface EmailFormProps {
  onSubmit: (emailData: {
    email: string;
    date: string;
    description: string;
  }) => void;
  initialData?: { email: string; date: string; description: string };
  onClose: () => void;
}

const EmailForm: React.FC<EmailFormProps> = ({
  onSubmit,
  initialData,
  onClose,
}) => {
  const [email, setEmail] = useState(initialData?.email || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, date, description });
    setEmail("");
    setDate("");
    setDescription("");
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      if (initialData.date != "") {
        const formattedDate = new Date(initialData.date)
          .toISOString()
          .split("T")[0];
        setDate(formattedDate);
      }
      setEmail(initialData.email);
      setDescription(initialData.description);
    }
  }, [initialData]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        style={{ borderRadius: "20px" }}
      >
        <h2 className="text-xl font-bold mb-4">Create</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              placeholder="example@abc.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded-md flex-grow"
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="font-semibold">Date</label>
            <input
              type="date"
              placeholder="YYYY-MM-DD"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded-md flex-grow"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-center mb-2">
              Description
            </label>
            <textarea
              placeholder="...."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded-md w-full h-20"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
