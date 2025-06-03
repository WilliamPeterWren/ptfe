import { useState, useEffect } from "react";
import apiPeterCategory from "../../../api/apiPeterCategory";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    await apiPeterCategory
      .getAll()
      .then((res) => {
        // console.log(res.data.result);
        setCategories(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleReloadPage = (id) => {
    navigate(`/products-by-cat/${id}`);
    window.location.reload();
  };

  return (
    <div className="max-w-120 bg-white shadow-md p-4">
      <ul className="space-y-2">
        <div className="mt-2 max-h-80 overflow-y-auto border-t border-gray-200 pt-2">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  // onClick={() => category.subcategories}
                  onClick={() => handleReloadPage(category.id)}
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
