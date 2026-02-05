import api from "../../../Library/api";
import { useEffect, useState } from "react";
import PageLoader from "../../../components/Loader/PageLoader";
import { toast } from "react-toastify";
import AddBankModal from "../../../components/modals/AddBankModal";

const BankAccountDetails = () => {
  const [loading, setLoading] = useState(true);
  const [banks, setBanks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  /* =========================
     FETCH ALL USER BANKS
  ========================== */
  const fetchBanks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/me/banks");
      if (res.data.status === "success") {
        setBanks(res.data.data.accounts || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load bank accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Bank Accounts
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          Add New Bank
        </button>
      </div>

      {/* BANK LIST */}
      {banks.length > 0 ? (
        <div className="space-y-4">
          {banks.map((bank) => (
            <div
              key={bank._id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm
                         flex flex-col sm:flex-row sm:justify-between sm:items-center
                         gap-3 hover:shadow-md transition"
            >
              {/* BANK INFO */}
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-800">
                  {bank.bankName}
                </p>
                <p className="text-xs text-gray-500">{bank.accountName}</p>
                <p className="text-sm font-mono tracking-wide text-gray-700">
                  {bank.accountNumber}
                </p>
              </div>

              {/* DEFAULT BADGE */}
              {bank.isDefault && (
                <span className="inline-flex items-center gap-1
                                 text-xs font-medium
                                 bg-emerald-100 text-emerald-700
                                 px-3 py-1 rounded-full">
                  Default
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-6 text-center">
          <p className="text-gray-500 text-sm">
            No bank accounts added yet.
          </p>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <AddBankModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchBanks(); // refresh list
          }}
        />
      )}
    </div>
  );
};

export default BankAccountDetails;
