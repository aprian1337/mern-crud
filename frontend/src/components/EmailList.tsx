import React from "react";

interface EmailListProps {
  emails: { _id: string; email: string; date: string; description: string }[];
  onDelete: (email: {
    _id: string;
    email: string;
    date: string;
    description: string;
  }) => void;
  onEdit: (email: {
    _id: string;
    email: string;
    date: string;
    description: string;
  }) => void;
  onSend: (email: {
    _id: string;
    email: string;
    date: string;
    description: string;
  }) => void;
}

const EmailList: React.FC<EmailListProps> = ({
  emails,
  onDelete,
  onEdit,
  onSend,
}) => {
  return (
    <div className="space-y-4">
      {emails.map((email) => (
        <div
          key={email._id}
          className="p-4 border rounded-md flex justify-between items-center"
        >
          <div>
            <p>{email.email}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onSend(email)}
              className="bg-blue-500 text-wlhite px-3 py-1 rounded hover:bg-blue-700"
            >
              Send Email
            </button>
            <button
              onClick={() => onEdit(email)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(email)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailList;
