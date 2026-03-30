import { useState, useEffect } from "react";

const UserForm = ({ addUser, editingUser, updateUser }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
  });

  // ✅ THIS FIXES EDIT
  useEffect(() => {
    if (editingUser) {
      setForm(editingUser);
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUser) {
      updateUser(form);
    } else {
      addUser(form);
    }

    setForm({ name: "", email: "", age: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Age"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />
      <button type="submit">
        {editingUser ? "Update" : "Save"}
      </button>
    </form>
  );
};

export default UserForm;