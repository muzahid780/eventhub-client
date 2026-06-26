import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="min-h-[90vh] flex items-center bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Make a Difference in
              <span className="text-yellow-300 block">Your Community</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Discover, join and organize social service events that create
              positive change.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/upcoming-events"
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl"
              >
                Explore Events
              </Link>
              <Link
                to="/create-event"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                Create Event
              </Link>
            </div>
          </div>

          <div className="relative hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600"
              alt="Community Service"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  500+
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Active Events
                  </p>
                  <p className="font-bold dark:text-white">Join Today!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
