import { Link } from "react-router-dom";

const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="w-full max-w-sm">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-8">
        <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="5" height="5" rx="1" fill="white" />
            <rect x="8" y="1" width="5" height="5" rx="1" fill="white" opacity="0.6" />
            <rect x="1" y="8" width="5" height="5" rx="1" fill="white" opacity="0.6" />
            <rect x="8" y="8" width="5" height="5" rx="1" fill="white" opacity="0.3" />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-900">Buildfolio</span>
      </Link>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">{title}</h1>
        <p className="text-sm text-gray-500 mb-6">{subtitle}</p>
        {children}
      </div>
    </div>
  );
};

export default AuthCard;