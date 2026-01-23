import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../Library/api";
import { toast } from "react-toastify";

const EditPaymentOption = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    accountNumber: "",
    bank: "",
    payOption: "",
  });

  useEffect(() => {
    api.get(`/paymentOptions/${id}`).then((res) => {
      setForm(res.data.data.paymentOption);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.patch(`/paymentOptions/${id}`, form);
      toast.success("Payment option updated");
      navigate("/admin/payment-options");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-lg">
      <h2 className="text-lg font-semibold mb-4">
        Edit Payment Option
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 rounded w-full"
          value={form.payOption}
          onChange={(e) =>
            setForm({ ...form, payOption: e.target.value })
          }
        />

        <input
          className="border p-2 rounded w-full"
          value={form.bank}
          onChange={(e) =>
            setForm({ ...form, bank: e.target.value })
          }
        />

        <input
          className="border p-2 rounded w-full"
          value={form.accountNumber}
          onChange={(e) =>
            setForm({ ...form, accountNumber: e.target.value })
          }
        />

        <button className="bg-emerald-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPaymentOption;
