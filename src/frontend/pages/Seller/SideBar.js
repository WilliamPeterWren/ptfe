const Sidebar = ({ categories, setCategory }) => {
  
  return (
    <div className="max-w-120 bg-white shadow-md p-4">
      <ul className="space-y-2">
        <li>
          <p className="uppercase font-bold">Danh mục</p>
        </li>

        <li>
          <div className="mt-2 max-h-80 overflow-y-auto border-t border-gray-200 pt-2">
            <ul className="space-y-2">
              <li>
                <button
                  className={`w-full text-left px-2 py-1 rounded capitalize hover:bg-gray-200`}
                  onClick={() => setCategory(null)}
                >
                  Tất cả
                </button>
              </li>
              {categories.map((category, index) => {
                return (
                  <li key={index}>
                    <button
                      className={`w-full text-left px-2 py-1 rounded capitalize hover:bg-gray-200`}
                      onClick={() => setCategory(category.id)}
                    >
                      {category.categoryName}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
