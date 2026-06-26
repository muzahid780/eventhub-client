import { motion } from "framer-motion";

const LoadingSpinner = ({
  size = "md",
  fullPage = false,
  text = "Loading...",
}) => {
  const sizes = {
    sm: "h-8 w-8 border-2",
    md: "h-16 w-16 border-4",
    lg: "h-24 w-24 border-4",
  };

  const spinner = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center gap-4"
    >
      <div
        className={`${sizes[size]} animate-spin rounded-full border-t-2 border-b-2 border-blue-600 dark:border-blue-400`}
        style={{
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
        }}
      ></div>
      {text && (
        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
          {text}
        </p>
      )}
    </motion.div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
