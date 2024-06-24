import React, { useState, useEffect } from "react";

const Snackbar = ({ message, display }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  return (
    <div
      className={`m-3 fixed top-0 left-0 z-50 p-4 mb-4 text-sm text-white ${display === "success" && "bg-green-500"} ${display === "error" && "bg-red-500"}  rounded-lg ${
        visible? "block" : "hidden"
      }`}
    >
      {message}
    </div>
  );
};

export default Snackbar;