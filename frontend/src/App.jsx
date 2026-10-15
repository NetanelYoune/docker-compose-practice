import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Users from MongoDB</h1>

      {users.map((user) => (
        <div key={user._id}>
          <p>Name: {user.name}</p>
          <p>Role: {user.role}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
