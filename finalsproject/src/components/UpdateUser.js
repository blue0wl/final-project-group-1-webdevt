import React, { useState } from "react";

function UpdateUser({ userList, setUserList }) {
  const [email, setEmail] = useState('');
  const [userToUpdate, setUserToUpdate] = useState(null);

  const handleFindUser = () => {
    const user = userList.find((u) => u.email === email);
    if (user) {
      setUserToUpdate({ ...user });
    } else {
      alert("User not found.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserToUpdate((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (userToUpdate) {
      setUserList((prev) =>
        prev.map((u) => (u.email === userToUpdate.email ? userToUpdate : u))
      );
      alert("User updated successfully!");
      setUserToUpdate(null);
      setEmail('');
    }
  };

  return (
    <div className="update-user-container">
      <h2>Update User</h2>
      <div className="form-group mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleFindUser}>
          Find User
        </button>
      </div>
      {userToUpdate && (
        <>
          <div className="form-group mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={userToUpdate.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={userToUpdate.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              className="form-control"
              value={userToUpdate.image}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Role</label>
            <select
              name="role"
              className="form-control"
              value={userToUpdate.role}
              onChange={handleInputChange}
            >
              <option value="Admin">Admin</option>
              <option value="Librarian">Librarian</option>
              <option value="Borrower">Borrower</option>
            </select>
          </div>
          <button className="btn btn-success" onClick={handleUpdate}>
            Update
          </button>
        </>
      )}
    </div>
  );
}

export default UpdateUser;
