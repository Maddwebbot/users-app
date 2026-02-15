import { useEffect, useState } from "react";

const API = "https://users-app-production-3930.up.railway.app";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const getUsers = async () => {
    const res = await fetch(`${API}/users`);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const addUser = async () => {
    await fetch(`${API}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setName("");
    getUsers();
  };

  const deleteUser = async (id) => {
    await fetch(`${API}/users/${id}`, {
      method: "DELETE",
    });
    getUsers();
  };

  const updateUser = async (id) => {
    const newName = prompt("Enter new name:");
    if (!newName) return;

    await fetch(`${API}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });

    getUsers();
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Simple CRUD App</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={addUser}>Add</button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => updateUser(user.id)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
