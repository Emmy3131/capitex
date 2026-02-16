import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Daniel Okafor",
    role: "Retail Investor",
    message:
      "Capitex helped me structure my crypto investments properly. The dashboard is transparent and withdrawals were processed exactly as promised.",
    rating: 5,
  },
  {
    name: "Amina Yusuf",
    role: "Tech Entrepreneur",
    message:
      "What stood out for me is the risk management approach. I could track performance daily and felt in control of my capital.",
    rating: 4,
  },
  {
    name: "Michael Chen",
    role: "Portfolio Manager",
    message:
      "Capitex offers one of the cleanest and most professional crypto investment experiences I’ve seen. Clear timelines and solid reporting.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white py-20">
      <div data-aos="fade-up" className="max-w-7xl mx-auto px-6 overflow-hidden">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Investors Say
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Thousands of users trust Capitex to manage their crypto investments
            with transparency and discipline.
          </p>
        </div>

        {/* Testimonials */}
        <div data-aos="fade-up"
          data-aos-offset="120"
          data-aos-delay="100" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-lg transition"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Message */}
              <p className="text-gray-700 leading-relaxed mb-6">
                “{item.message}”
              </p>

              {/* User */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
