import { useEffect, useState } from "react";
import API from "./api";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const res = await API.get(`/?page=${page}&search=${search}`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const addUser = async (user) => {
    await API.post("/", user);
    fetchUsers();
  };

  const updateUser = async (user) => {
    await API.put(`/${user.id}`, user);
    setEditingUser(null);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await API.delete(`/${id}`);
    fetchUsers();
  };

  return (
    <div>
      <h1>CRUD App</h1>

      <input
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <UserForm
        addUser={addUser}
        editingUser={editingUser}
        updateUser={updateUser}
      />

      <UserList
        users={users}
        deleteUser={deleteUser}
        editUser={setEditingUser}
      />

      <button onClick={() => setPage(page - 1)}>Prev</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}

export default App;