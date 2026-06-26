const CategoryCard = ({ icon, name, count }) => {
  return (
    <a
      href="#"
      className="group bg-white border border-gray-200 hover:border-blue-300 hover:shadow-sm rounded-xl p-4 text-center transition-all"
    >
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
        {name}
      </p>
      <p className="text-xs text-gray-400 mt-0.5">{count} projects</p>
    </a>
  );
};

export default CategoryCard;