import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
    <section className="bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mt-4">
            Clear answers to common questions about investing with Capitex.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-medium text-gray-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeIndex === index && (
                <div className="px-5 pb-5 text-gray-600 leading-relaxed">
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
