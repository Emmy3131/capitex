import api from "../../../Library/api";
import { useEffect, useState } from "react";
import PageLoader from "../../../components/Loader/PageLoader";
import { toast } from "react-toastify";
import AddBankModal from "../../../components/modals/AddBankModal";
import {Link} from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6";

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
    <div className="relative min-h-screen bg-gray-50 py-6">

        <Link
        to={"/transactions"}
        className="
          fixed top-18 md:top-5 left-1 md:left-69
          flex items-center justify-center
          w-10 h-10 md:w-11 md:h-11
          rounded-full
          bg-white
          text-emerald-600
          shadow-md
          border border-emerald-100
          hover:bg-emerald-600
          hover:text-white
          hover:shadow-lg
          active:scale-95
          transition-all duration-200
          z-50
        "
      >
        <FaArrowLeftLong className="text-lg md:text-xl" />
      </Link>

      <div className="md:w-4xl max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">

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
                  <div>
                    <span className="text-[8px] text-gray-400">Network</span>
                    <p className="text-sm font-semibold text-gray-800">
                      {bank.bankName}
                    </p>
                  </div>
                  {/* <p className="text-xs text-gray-500">{bank.accountName}</p> */}
                  <div>
                    <span className="text-[8px] text-gray-400">Wallet Address</span>
                    <p className="text-sm font-mono tracking-wide text-gray-700">
                      {bank.accountNumber}
                    </p>
                  </div>
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
    </div>
  );
};

export default BankAccountDetails;
