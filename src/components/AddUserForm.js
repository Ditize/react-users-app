import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addUser } from "../store/usersSlice";
import { useNavigate } from "react-router-dom";

function AddUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Name and Email are required");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      phone: "N/A",
      website: "N/A",
      address: { street: "N/A", city: "N/A" },
      company: { name: "Local User" },
      local: true
    };

    dispatch(addUser(newUser));
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add User
      </Button>
    </Form>
  );
}

export default AddUserForm;
