const Section = ({ id, title, subtitle, viewAllHref, children }) => {
  return (
    <section id={id} className="border-t border-gray-200 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">{title}</h2>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          {viewAllHref && (
            <a
              href={viewAllHref}
              className="text-sm text-[#2563eb] hover:text-blue-700 transition-colors"
            >
              View all →
            </a>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;