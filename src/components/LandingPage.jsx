
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, CreditCard, Clock, Database } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    token ? navigate("/dashboard") : navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-28 pt-30 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-left">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text pb-5 text-transparent">
                Transform Your School's Financial Management
              </h1>
              <p className="mt-3 text-xl text-gray-600 dark:text-gray-300">
                Streamline fee collection, automate payment tracking, and gain
                real-time insights with our comprehensive school payment
                solution.
              </p>

              <div className="mt-8 mb-5 flex items-center gap-8">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white"
                      src={`https://randomuser.me/api/portraits/men/${i}.jpg`}
                      alt="User"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Trusted by 50+ schools
                </p>
              </div>
            </div>

            <div className="hidden md:flex flex-1 relative w-full max-w-4xl mx-auto p-8 mt-[50px]">
              {/* First Card/Image */}
              <div className="relative transform transition-all duration-300 cursor-pointer z-20 hover:z-30 w-[600px]">
                <img
                  src="https://res.cloudinary.com/dwiq4s5ut/image/upload/v1736443304/Screenshot_712_vc6pnk.png"
                  alt="Dashboard Preview 1"
                  className="rounded-2xl shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br from-cyan-400 to-blue-500 p-1"
                />
              </div>

              {/* Second Card/Image */}
              <div className="absolute bottom-20 left-32 transform transition-all duration-300 cursor-pointer z-10 hover:z-30 w-[600px]">
                <img
                  src="https://res.cloudinary.com/dwiq4s5ut/image/upload/v1736443412/Screenshot_713_prkvgz.png"
                  alt="Dashboard Preview 2"
                  className="rounded-2xl shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br from-blue-300 via-blue-400 to-green-400 p-1"
                />
              </div>
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#2821eb_10%,_transparent_50%)]" />
          </div>
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all"
          >
            Get Started
            <ArrowRight className="inline-block ml-2" size={20} />
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
            Everything You Need to Manage School Payments
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Users}
              title="Student Management"
              description="Easily manage student profiles, fee structures, and payment histories in one place."
            />
            <FeatureCard
              icon={CreditCard}
              title="Smart Payments"
              description="Accept multiple payment methods with automated reconciliation and instant receipts."
            />
            <FeatureCard
              icon={Clock}
              title="Payment Tracking"
              description="Monitor due dates, send automated reminders, and track payment status in real-time."
            />
            <FeatureCard
              icon={Database}
              title="Financial Reports"
              description="Generate comprehensive reports and analyze payment trends with detailed insights."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Modernize Your School's Payment System?
          </h3>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of schools already transforming their financial
            management.
          </p>
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-xl shadow-xl hover:bg-gray-100 transform hover:scale-105 transition-all"
          >
            Get Started Now - It's Free
          </button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 transform hover:scale-105 transition-all">
    <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">
      <Icon size={32} />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

export default LandingPage;
