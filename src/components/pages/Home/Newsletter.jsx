import { useState } from "react";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      toast.warning("Please enter your email address");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast.warning("Please enter a valid email address");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      toast.success(`Thank you for subscribing!..`);
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-16 md:py-20 bg-blue-600 dark:bg-blue-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Stay Updated!
        </h2>
        <p className="text-blue-100 mb-8 text-lg">
          Subscribe to get notified about new events
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        <p className="text-blue-200 text-sm mt-3">
          We respect your privacy. No spam ever.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
