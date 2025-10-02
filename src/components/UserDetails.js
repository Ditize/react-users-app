import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

function UserDetails() {
  const { id } = useParams();
  const users = useSelector((state) => state.users.list); 
  const user = users.find((u) => u.id.toString() === id);

  if (!user) return <p>User not found.</p>;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>Phone: {user.phone || "N/A"}</Card.Text>
        <Card.Text>Website: {user.website || "N/A"}</Card.Text>
        {user.address && (
          <Card.Text>
            Address: {user.address.street}, {user.address.city}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserDetails;
