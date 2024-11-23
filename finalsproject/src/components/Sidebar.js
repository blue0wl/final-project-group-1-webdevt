
import React from 'react';

const Sidebar = ({ role }) => {
  const menuItems = {
    admin: ['Dashboard', 'Manage Librarians', 'Reports'],
    librarian: ['Dashboard', 'Manage Books', 'Reservations', 'Returns'],
    borrower: ['Dashboard', 'Search Books', 'Borrowing Logs'],
  };

  return (
    <aside className="bg-gray-200 w-64 h-screen p-4">
      <h2 className="font-bold text-lg">{role} Menu</h2>
      <ul className="mt-4">
        {menuItems[role].map((item, index) => (
          <li key={index} className="mb-2">
            <a href={`/${role.toLowerCase()}/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-500">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
