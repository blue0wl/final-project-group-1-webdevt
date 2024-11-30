import './css-components/DeleteUser.css'
import React from "react";

function DeleteUser({ userList, setUserList }) {
  const handleDelete = (email) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (confirm) {
      setUserList((prev) => prev.filter((user) => user.email !== email));
      alert("User deleted successfully.");
    }
  };

  return (
    <div className="delete-user-container">
      <h2>Delete Users</h2>
      <ul className="list-group">
        {userList.map((user) => (
          <li key={user.email} className="list-group-item d-flex justify-content-between align-items-center">
            {user.name} ({user.email})
            <button className="btn btn-danger" onClick={() => handleDelete(user.email)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeleteUser;
