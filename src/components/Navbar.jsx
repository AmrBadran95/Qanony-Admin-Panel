import { useAuth } from "../context/AuthContext";

const Navbar = ({ onMenuClick }) => {
  const { admin, logout } = useAuth();

  return (
    <div className="bg-white shadow px-4 py-3 flex items-center justify-between">
      <button className="md:hidden" onClick={onMenuClick}>
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <h1 className="text-lg font-bold text-gray-800">لوحة التحكم</h1>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">{admin?.name}</span>
        <button onClick={logout} className="text-red-600 text-sm">
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

export default Navbar;
