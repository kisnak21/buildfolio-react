function Button({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  onClick,
}) {
  const baseStyles =
    "text-sm font-medium rounded-lg py-2.5 transition-colors";

  const variantStyles = {
    primary: "bg-[#2563eb] hover:bg-blue-700 text-white",
    secondary:
      "bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle}`}
    >
      {children}
    </button>
  );
}

export default Button;