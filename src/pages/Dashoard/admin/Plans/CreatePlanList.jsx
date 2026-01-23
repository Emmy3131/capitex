import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../Library/api";

const CreatePlan = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    minDeposit: "",
    maxDeposit: "",
    planDuration: "",
    timingParameter: "hours",
    percentage: "",
    referalBonus: "",
    allowReferral: true,
    currency: "USD",
    returnPrincipal: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/plans", form);
      toast.success("Plan created");
      navigate("/admin/plans");
    } catch {
      toast.error("Failed to create plan");
    }
  };

  return (
    <div className="max-w-2xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Create Plan</h2>

      <form onSubmit={submit} className="space-y-4">
        <input name="name" placeholder="Plan name" onChange={handleChange} className="input" />
        <input name="minDeposit" type="number" placeholder="Min Deposit" onChange={handleChange} className="input" />
        <input name="maxDeposit" type="number" placeholder="Max Deposit" onChange={handleChange} className="input" />
        <input name="planDuration" type="number" placeholder="Duration" onChange={handleChange} className="input" />
        <input name="percentage" type="number" placeholder="ROI %" onChange={handleChange} className="input" />
        <input name="referalBonus" type="number" placeholder="Referral Bonus %" onChange={handleChange} className="input" />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="allowReferral" checked={form.allowReferral} onChange={handleChange} />
          Allow Referral
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" name="returnPrincipal" checked={form.returnPrincipal} onChange={handleChange} />
          Return Principal
        </label>

        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg">
          Create Plan
        </button>
      </form>
    </div>
  );
};

export default CreatePlan;
