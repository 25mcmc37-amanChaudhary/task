const UserList = ({ users, deleteUser, editUser }) => {
  return (
    <div>
      {users.map((u) => (
        <div key={u.id}>
          {u.name} | {u.email} | {u.age}
          <button onClick={() => editUser(u)}>Edit</button>
          <button onClick={() => deleteUser(u.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;