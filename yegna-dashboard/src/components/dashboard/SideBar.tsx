// src/components/Sidebar.js
const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 w-64 text-white p-4">
      <ul className="space-y-4">
        <li>
          <a href="#" className="hover:text-gray-400">
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400">
            Orders
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400">
            Products
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400">
            Analytics
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
