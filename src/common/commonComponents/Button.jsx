const Button = ({
  children,
  type = "button",
  bgColor,
  width = "",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`text-white ${bgColor ? `${bgColor}` : `bg-gradient-to-br from-purple-600 to-blue-500`} hover:${bgColor ? `${bgColor}` : `bg-gradient-to-bl`} focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${className}`}
      {...props}
    >
      <div className={`${width}`}>{children}</div>
    </button>
  );
};

export default Button;
