import { useEffect, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, updateUser } from "../store/usersSlice";

function UsersList() {
  const dispatch = useDispatch();
  const { list, status } = useSelector(state => state.users);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(null); // null = nuk është sortuar ende
  const [editingUserId, setEditingUserId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    if (status === "idle") dispatch(fetchUsers());
  }, [status, dispatch]);

  const filtered = list.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  let finalList;
  if (sortAsc === null) {
    const newUser = filtered.find(
      u => u.local && u.id === Math.max(...filtered.filter(u => u.local).map(u => u.id))
    );
    const others = filtered.filter(u => !newUser || u.id !== newUser.id);
    finalList = newUser ? [newUser, ...others] : others;
  } else {
    finalList = [...filtered].sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  }

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const handleSave = (id) => {
    if (!editName || !editEmail) return alert("Name and Email required!");
    dispatch(updateUser({ id, name: editName, email: editEmail }));
    setEditingUserId(null);
  };

  return (
    <>
      <div className="d-flex mb-3">
        <Form.Control
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="me-2"
        />
        <Button
          className="me-2"
          onClick={() => setSortAsc(sortAsc === null ? true : !sortAsc)}
        >
          {sortAsc === null ? "Sort" : sortAsc ? "Sort A → Z" : "Sort Z → A"}
        </Button>
        <Link to="/add"><Button>Add User</Button></Link>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {finalList.map((user) => (
            <tr key={user.id}>
              <td>
                {editingUserId === user.id ? (
                  <Form.Control
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  <Link to={`/user/${user.id}`}>{user.name}</Link>
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <Form.Control
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>{user.company?.name}</td>
              <td>
                {editingUserId === user.id ? (
                  <>
                    <Button size="sm" variant="success" className="me-2" onClick={() => handleSave(user.id)}>Save</Button>
                    <Button size="sm" variant="secondary" onClick={() => setEditingUserId(null)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="warning" className="me-2" onClick={() => handleEdit(user)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => dispatch(deleteUser(user.id))}>Delete</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default UsersList;
