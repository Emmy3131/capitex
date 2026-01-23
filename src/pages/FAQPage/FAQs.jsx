import { useState } from "react";
import { ChevronDown } from "lucide-react";
import api from "../../Library/api"


const faqs = [
  {
    question: "Is Capitex a trading platform?",
    answer:
      "No. Capitex is a crypto investment platform that offers structured investment plans managed by professionals. Users do not trade manually.",
  },
  {
    question: "How secure are my funds?",
    answer:
      "Capitex uses institutional-grade security practices including cold storage, encrypted wallets, and strict access controls to protect user funds.",
  },
  {
    question: "When can I withdraw my investment?",
    answer:
      "Withdrawals depend on the investment plan you choose. Each plan has a defined timeline and withdrawal schedule clearly stated before you invest.",
  },
  {
    question: "Are returns guaranteed?",
    answer:
      "No investment returns are guaranteed. Capitex provides projected returns based on historical strategies, but market risks still apply.",
  },
  {
    question: "Is there a minimum investment amount?",
    answer:
      "Yes. Each investment plan has a minimum entry amount, which is clearly displayed before confirmation.",
  },
  {
    question: "Can I track my investment performance?",
    answer:
      "Yes. All users have access to a real-time dashboard showing performance, duration, and historical returns.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50">
      <div className="">

        {/* Header */}
        <section className="bg-gradient-to-r from-green-700 to-emerald-600 text-white py-20 px-6 text-center">
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
