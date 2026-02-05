import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../Library/api";
import { toast } from "react-toastify";

const CreatePaymentOption = () => {
  const [form, setForm] = useState({
    payOption: "Crypto Wallet",
    bank: "",
    accountNumber: "",
    extraInfo: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("payOption", form.payOption);
      formData.append("bank", form.bank);
      formData.append("accountNumber", form.accountNumber);
      formData.append("extraInfo", form.extraInfo);
      if (form.image) {
        formData.append("image", form.image);
      }

      await api.post("/paymentOptions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Payment option created");
      navigate("/admin/payment-options");
    } catch (err) {
      toast.error("Creation failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      {/* Title */}
      <h2 className="text-lg font-semibold mb-6">
        Add New Payment Option
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Payment Option */}
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Payment Option
          </label>
          <select
            className="w-full bg-gray-100 border border-gray-200 p-3 rounded-lg"
            value={form.payOption}
            onChange={(e) =>
              setForm({ ...form, payOption: e.target.value })
            }
          >
            <option>Crypto Wallet</option>
            <option>Bank</option>
          </select>
        </div>

        {/* Bank / Wallet Name */}
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Bank Name / Wallet
          </label>
          <input
            type="text"
            placeholder="Enter Bank Name or Wallet"
            className="w-full bg-gray-100 border border-gray-200 p-3 rounded-lg"
            value={form.bank}
            onChange={(e) =>
              setForm({ ...form, bank: e.target.value })
            }
          />
        </div>

        {/* Account / Wallet Address */}
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Account Number / Wallet Address
          </label>
          <input
            type="text"
            placeholder="Enter Account Number or Wallet"
            className="w-full bg-gray-100 border border-gray-200 p-3 rounded-lg"
            value={form.accountNumber}
            onChange={(e) =>
              setForm({ ...form, accountNumber: e.target.value })
            }
          />
        </div>

        {/* Image & Extra Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Image / Barcode
            </label>
            <input
              type="file"
              className="w-full text-sm"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files[0] })
              }
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Extra Info (optional)
            </label>
            <input
              type="text"
              placeholder="Extra Information"
              className="w-full bg-gray-100 border border-gray-200 p-3 rounded-lg"
              value={form.extraInfo}
              onChange={(e) =>
                setForm({ ...form, extraInfo: e.target.value })
              }
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
        >
          💾 Save Payment Option
        </button>
      </form>
    </div>
  );
};

export default CreatePaymentOption;
