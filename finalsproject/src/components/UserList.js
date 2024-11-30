import './css-components/UserList.css'
import React from "react";
import { Link } from "react-router-dom";

function UserList({ userList, setUserList }) {
  return (
    <div className="user-list-container">
      <div className="mb-4">
        <Link to="/create-user" className="btn btn-success">Add User</Link>
        <Link to="/update-user" className="btn btn-success ms-3">Edit User</Link>
        <Link to="/delete-user" className="btn btn-danger ms-3">Delete User</Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Profile Image</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <img src={user.image} alt={user.name} className="img-thumbnail" style={{ width: '100px' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
