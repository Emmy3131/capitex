import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../Library/api";
import { toast } from "react-toastify";

const CreateFaq = () => {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/faqs", formData);
      if (res.data.status === "success") {
        toast.success("FAQ created successfully");
        navigate("/admin/faqs");
      }
    } catch (err) {
      toast.error("Failed to create FAQ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-xl">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 mb-4 hover:underline"
      >
        ← Back to FAQs
      </button>

      <h1 className="text-2xl font-bold">Create FAQ</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-5"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Question
          </label>
          <input
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Answer
          </label>
          <textarea
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            rows={4}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <button
          disabled={loading}
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg"
        >
          {loading ? "Creating..." : "Create FAQ"}
        </button>
      </form>
    </div>
  );
};

export default CreateFaq;
