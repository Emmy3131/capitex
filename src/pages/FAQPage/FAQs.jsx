import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import api from "../../Library/api"
import PageLoader from "../../components/Loader/PageLoader";




const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqs, setFaqs] = useState();
  const [loading, setLoading] = useState(false);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

   const getFaqs = async () => {
      setLoading(true);
      try {
        const res = await api.get("/faqs");
        
        if (res.data.status === "success") {
          setFaqs(res.data.data.faqs);
          console.log("Fetched FAQs:", res.data);
        }
      } catch (err) {
        toast.error("Failed to load FAQs");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    getFaqs();
  }, []);

  if (loading) return <PageLoader />;
  if (!faqs) return null;


  return (
    <section className="bg-gray-50">
      <div className="">

        {/* Header */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-black text-gray-300 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4"> Frequently Asked Questions</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
           Clear answers to common questions about investing with Capitex.
        </p>
      </section>

        {/* FAQ Items */}
        <div className="space-y-6 my-5 px-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-green-50 transition"
              >
                <span className="font-medium text-gray-900 text-lg">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`transition-transform text-green-600 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeIndex === index && (
                <div className="px-6 pb-6 text-gray-700 leading-relaxed bg-gray-50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
