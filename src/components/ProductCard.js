import React from "react";
import { Card, Button } from "react-bootstrap";

const ProductCard = ({ item, onOpenModal }) => (
  <Card className="mb-4">
    <Card.Body>
      <Card.Title>{item.name}</Card.Title>
      <Card.Text>Category: {item.category}</Card.Text>
      <Card.Text>
        Engagement: {item.likes + item.shares + item.comments}
      </Card.Text>
      <Card.Text>Location: {item.location}</Card.Text>
      <Button onClick={() => onOpenModal(item)}>View Details</Button>
    </Card.Body>
  </Card>
);

export default ProductCard;
