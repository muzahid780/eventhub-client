const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400",
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400",
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400",
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Event Gallery
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Moments that made a difference
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div key={index} className="overflow-hidden rounded-xl shadow-lg">
              <img
                src={img}
                alt={`Event ${index + 1}`}
                className="w-full h-48 md:h-56 lg:h-64 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
