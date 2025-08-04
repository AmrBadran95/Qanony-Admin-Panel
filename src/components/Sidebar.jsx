import { NavLink } from "react-router";
import clsx from "clsx";

const links = [{ to: "/", label: "الطلبات" }];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        onClick={onClose}
        className={clsx(
          "fixed inset-0  bg-opacity-40 z-30 md:hidden transition-opacity",
          !isOpen && "hidden"
        )}
      />

      <div
        className={clsx(
          "fixed top-0 right-0 w-64 bg-white h-full shadow z-40 p-4 transform transition-transform md:static md:translate-x-0 md:block",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}>
        <h2 className="text-xl font-bold mb-4">قانوني</h2>
        <nav className="space-y-2">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  "block px-3 py-2 rounded text-right",
                  isActive
                    ? "bg-blue-100 text-blue-800 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                )
              }
              onClick={onClose}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
