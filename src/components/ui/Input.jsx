function Input({
  label,
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  error,
  rightElement,
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={id} className="block text-xs text-gray-600">
          {label}
        </label>
        {rightElement}
      </div>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-gray-50 border rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#2563eb]/20 transition-colors ${
          error
            ? "border-red-500"
            : "border-gray-200 focus:border-[#2563eb]"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}

export default Input;