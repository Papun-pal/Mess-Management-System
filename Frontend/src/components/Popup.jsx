import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Info } from "lucide-react";
import { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  const icons = {
    success: <CheckCircle className="text-green-500" size={24} />,
    error: <XCircle className="text-red-500" size={24} />,
    info: <Info className="text-blue-500" size={24} />,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed top-5 right-5 flex items-center gap-3 p-4 rounded-lg shadow-lg text-white ${
        type === "success"
          ? "bg-green-600"
          : type === "error"
          ? "bg-red-600"
          : "bg-blue-600"
      }`}
    >
      {icons[type]}
      <span>{message}</span>
      <button className="ml-4" onClick={onClose}>X</button>
    </motion.div>
  );
};

const showToast = (message, type = "success") => {
  const toastContainer = document.createElement("div");
  document.body.appendChild(toastContainer);
  const root = createRoot(toastContainer);

  const removeToast = () => {
    root.unmount();
    document.body.removeChild(toastContainer);
  };

  root.render(<Toast message={message} type={type} onClose={removeToast} />);
};

export default showToast;
