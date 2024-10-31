import React, { useState, useEffect } from "react";
import EmailForm from "../components/EmailForm";
import EmailList from "../components/EmailList";
import Toast from "../components/Toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Email {
  _id: string;
  email: string;
  date: string;
  description: string;
}

const EmailPage = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [editingEmail, setEditingEmail] = useState<Email | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingEmail, setDeletingEmail] = useState<Email | null>(null);
  const navigate = useNavigate();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const fetchEmails = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/emails`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setEmails(response.data.data);
    } catch (error: any) {
      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 401)
      ) {
        localStorage.removeItem("token");
        navigate("/");
      }

      setToast({
        message: "Error fetching emails. Please try again.",
        type: "error",
      });
    }
  };

  const handleAddOrUpdate = async (emailData: Omit<Email, "_id">) => {
    const token = localStorage.getItem("token");

    try {
      if (editingEmail) {
        await axios.put(
          `${process.env.REACT_APP_API_HOST}/api/emails/${editingEmail._id}`,
          emailData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEditingEmail(null);
        setToast({ message: "Email updated successfully!", type: "success" });
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_HOST}/api/emails`,
          emailData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setToast({ message: "Email added successfully!", type: "success" });
      }
      fetchEmails();
    } catch (error: any) {
      console.error("Error details:", error);
      setToast({
        message:
          error.response?.data?.message ||
          "Error submitting email. Please try again.",
        type: "error",
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  const confirmDelete = (email: Email) => {
    setDeletingEmail(email);
  };

  const handleDelete = async () => {
    if (!deletingEmail) return;
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_HOST}/api/emails/${deletingEmail._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setToast({ message: "Email deleted successfully!", type: "success" });
      setDeletingEmail(null);
      fetchEmails();
    } catch (error: any) {
      setToast({
        message: "Error deleting email. Please try again.",
        type: "error",
      });
    }
  };

  const handleSendEmail = async (email: Email) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/api/emails/send`,
        {
          to: email.email,
          subject: "Hello World",
          text: "Hi salam kenal",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setToast({
        message: response.data.message || "Email sent successfully",
        type: "success",
      });
    } catch (error: any) {
      setToast({
        message:
          error.response?.data?.message ||
          "Error sending email. Please try again.",
        type: "error",
      });
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${process.env.REACT_APP_API_HOST}/api/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      setToast({
        message: "Error logging out. Please try again.",
        type: "error",
      });
    }
  };

  const handleEdit = (email: Email) => {
    setEditingEmail(email);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingEmail(null);
    setIsModalOpen(false);
  };

  const closeDeleteModal = () => setDeletingEmail(null);

  useEffect(() => {
    fetchEmails();
  }, []);

  const initialEmailData = editingEmail
    ? {
        email: editingEmail.email,
        date: editingEmail.date,
        description: editingEmail.description,
      }
    : { email: "", date: "", description: "" };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Emails</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Create
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <EmailList
        emails={emails}
        onDelete={confirmDelete}
        onEdit={handleEdit}
        onSend={handleSendEmail}
      />
      {isModalOpen && (
        <EmailForm
          onSubmit={handleAddOrUpdate}
          initialData={initialEmailData}
          onClose={closeModal}
        />
      )}
      {deletingEmail && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p>Are you sure you want to delete this email?</p>
            <p className="text-gray-500">{deletingEmail.email}</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Confirm
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default EmailPage;
