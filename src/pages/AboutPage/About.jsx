import team1 from "../../assets/OurTeam/team1.png";
import team2 from "../../assets/OurTeam/team2.jpg";
import team3 from "../../assets/OurTeam/team3.jpg";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Alice Johnson",
      role: "CEO & Founder",
      image: team1,
    },
    {
      name: "Mark Roberts",
      role: "Head of Investments",
      image: team3,
    },
    {
      name: "Sophie Lee",
      role: "Security & Compliance",
      image: team2,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-black text-gray-300 py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          About Capitex
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Capitex is a professional crypto investment platform focused on
          delivering structured, transparent, and risk-managed investment
          solutions designed for long-term capital growth.
        </p>
      </section>

      {/* MISSION SECTION */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed text-lg">
          Our mission is to make professional cryptocurrency investing accessible
          to everyone by combining institutional-grade strategies, advanced risk
          management, and complete transparency.
        </p>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-14">
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Transparency</h3>
            <p className="text-gray-600 leading-relaxed">
              Clear investment reporting, real-time performance tracking, and
              fully visible timelines.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Security</h3>
            <p className="text-gray-600 leading-relaxed">
              Enterprise-level encryption, cold wallet storage, and strict
              compliance protocols.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-gray-600 leading-relaxed">
              Data-driven crypto strategies powered by automation and disciplined
              risk management.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-14">Meet Our Leadership</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm
                         hover:shadow-xl transition duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full mb-6
                           object-cover ring-4 ring-emerald-100"
              />

              <h3 className="text-xl font-semibold text-gray-900">
                {member.name}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 bg-gradient-to-r from-emerald-700 to-green-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Start Investing with Confidence?
        </h2>

        <p className="mb-8 max-w-2xl mx-auto text-lg text-green-100">
          Join Capitex today and gain access to professional crypto investment
          strategies designed for sustainable growth.
        </p>

        <a
          href="/auth?tab=signUp"
          className="inline-block bg-white text-emerald-700
                     font-semibold py-3 px-10 rounded-full
                     shadow hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
