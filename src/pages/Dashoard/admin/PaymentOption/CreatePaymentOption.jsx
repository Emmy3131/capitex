import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../Library/api";
import { toast } from "react-toastify";

const CreatePaymentOption = () => {
  const [form, setForm] = useState({
    accountNumber: "",
    bank: "",
    payOption: "Bank",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/paymentOptions", form);
      toast.success("Payment option created");
      navigate("/admin/payment-options");
    } catch {
      toast.error("Creation failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-lg">
      <h2 className="text-lg font-semibold mb-4">
        Create Payment Option
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="border p-2 rounded w-full"
          value={form.payOption}
          onChange={(e) =>
            setForm({ ...form, payOption: e.target.value })
          }
        >
          <option value="Bank">Bank</option>
          <option value="Crypto">Crypto</option>
        </select>

        <input
          type="text"
          placeholder="Bank Name"
          className="border p-2 rounded w-full"
          value={form.bank}
          onChange={(e) =>
            setForm({ ...form, bank: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Account Number"
          className="border p-2 rounded w-full"
          value={form.accountNumber}
          onChange={(e) =>
            setForm({ ...form, accountNumber: e.target.value })
          }
        />

        <button className="bg-emerald-600 text-white px-6 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreatePaymentOption;
