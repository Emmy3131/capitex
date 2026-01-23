import { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../../../Library/api"
import PageLoader from "../../../../components/Loader/PageLoader";
import { toast } from "react-toastify";

const FaqList = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getFaqs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/faqs");
      
      if (res.data.status === "success") {
        setFaqs(res.data.data.faqs);
      }
    } catch (err) {
      toast.error("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;
    setFaqs((prev) => prev.filter((f) => f._id !== id));
    try {
      await api.delete(`/faqs/${id}`);
      toast.success("FAQ deleted");
    } catch (err) {
      toast.error("Delete failed");
      getFaqs();
    }
  };

  useEffect(() => {
    getFaqs();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">FAQs</h1>
          <p className="text-sm text-gray-500">
            Manage frequently asked questions
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/faqs/create")}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg"
        >
          <FaPlus /> Create FAQ
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-[800px] w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-5 py-3 text-left">Question</th>
              <th className="px-5 py-3 text-left">Answer</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {faqs.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-400">
                  No FAQs found
                </td>
              </tr>
            ) : (
              faqs.map((faq) => (
                <tr key={faq._id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium">
                    {faq.question}
                  </td>
                  <td className="px-5 py-3 text-gray-600 truncate max-w-md">
                    {faq.answer}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => handleDelete(faq._id)}
                      className="text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FaqList;
