const NavBar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">DashBoared</h1>
        <button className="bg-red-600 px-4 py-2 rounded">Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
