const footerLinks = ["FAQ", "Contact us", "Privacy Policy", "Terms of Service"];

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* logo copyright*/}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#2563eb] rounded-md flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="5" height="5" rx="1" fill="white" />
                <rect x="8" y="1" width="5" height="5" rx="1" fill="white" opacity="0.6" />
                <rect x="1" y="8" width="5" height="5" rx="1" fill="white" opacity="0.6" />
                <rect x="8" y="8" width="5" height="5" rx="1" fill="white" opacity="0.3" />
              </svg>
            </div>
            <span className="text-sm text-gray-500">© 2025 Buildfolio. All rights reserved.</span>
          </div>

          {/* footer links*/}
          <nav className="flex items-center gap-6 flex-wrap justify-center">
            {footerLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
    )
}

export default Footer