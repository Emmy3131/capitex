
const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About Capitex
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Capitex is a professional crypto investment platform designed to help 
          individuals grow their wealth securely with strategy-driven investment 
          plans, transparent reporting, and institutional-grade security.
        </p>
      </section>

      {/* OUR MISSION */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg">
          Our mission is to democratize access to cryptocurrency investments by 
          providing professional-grade strategies, risk management, and full 
          transparency for all investors, whether novice or experienced.
        </p>
      </section>

      {/* OUR VALUES */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Transparency</h3>
            <p className="text-gray-600">
              Clear reporting of all investment performance and timelines.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Security</h3>
            <p className="text-gray-600">
              Institutional-grade cold wallet storage and SSL encryption.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              Strategy-based crypto investments with automated risk management.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <img
              // src={TeamMember1}
              alt="Team Member 1"
              className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Alice Johnson</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <img
              // src={TeamMember2}
              alt="Team Member 2"
              className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Mark Roberts</h3>
            <p className="text-gray-600">Head of Investments</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <img
              // src={TeamMember3}
              alt="Team Member 3"
              className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Sophie Lee</h3>
            <p className="text-gray-600">Security & Compliance</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-6 bg-gradient-to-r from-green-700 to-emerald-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Investing?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Join Capitex today and take control of your crypto investment journey with confidence.
        </p>
        <a
          href="/auth?tab=signUp"
          className="inline-block bg-white text-green-700 font-semibold py-3 px-8 rounded-full shadow hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
