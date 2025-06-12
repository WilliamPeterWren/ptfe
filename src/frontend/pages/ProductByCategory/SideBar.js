

const Sidebar = ({ categories, setCategoryId }) => {
  return (
    <div className="max-w-120 bg-white shadow-md p-4">
      <ul className="space-y-2">
        <div className="mt-2 max-h-80 overflow-y-auto border-t border-gray-200 pt-2">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => setCategoryId(category.id)}
                  className={`w-full text-left px-2 py-1 rounded text-gray-700 hover:bg-gray-100`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
