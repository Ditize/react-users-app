import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import UsersList from "./components/UsersList";
import AddUserForm from "./components/AddUserForm";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">UserApp</Navbar.Brand>
          <Nav className="me-auto">
         
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/add" element={<AddUserForm />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
