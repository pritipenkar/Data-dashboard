import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import mockData from "../mockData";
import { Modal } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

const Dashboard = () => {
  const [items, setItems] = useState(mockData);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [engagementRange, setEngagementRange] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [sortOption, setSortOption] = useState("engagement-asc");

  const handleCategoryFilter = (e) => {
    const category = e.target.value;
    setCategoryFilter(category);
    applyFilters(category, engagementRange);
  };

  const handleEngagementRange = (e) => {
    const range = e.target.value;
    setEngagementRange(range);
    applyFilters(categoryFilter, range);
  };

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);
    const [key, order] = option.split("-");
    applySorting(key, order);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const applyFilters = (category, range) => {
    let filteredItems = mockData;

    if (category) {
      filteredItems = filteredItems.filter(
        (item) => item.category === category
      );
    }

    if (range) {
      const [min, max] = range.split("-");
      filteredItems = filteredItems.filter(
        (item) =>
          item.likes + item.shares + item.comments >= parseInt(min) &&
          item.likes + item.shares + item.comments <= parseInt(max)
      );
    }

    setItems(filteredItems);
  };

  const applySorting = (key, order) => {
    const sortedItems = [...items].sort((a, b) => {
      let valueA, valueB;

      if (key === "engagement") {
        valueA = a.likes + a.shares + a.comments;
        valueB = b.likes + b.shares + b.comments;
      } else if (key === "reach") {
        valueA = (a.followers * (a.likes + a.shares)) / 100;
        valueB = (b.followers * (b.likes + b.shares)) / 100;
      } else {
        valueA = a[key];
        valueB = b[key];
      }

      return order === "asc" ? valueA - valueB : valueB - valueA;
    });

    setItems(sortedItems);
  };

  return (
    <Container>
      <h1 className="mt-5">Data Dashboard</h1>

      <Form className="mb-3">
        {/* Filter by Category */}
        <Form.Select onChange={handleCategoryFilter} className="mb-2">
          <option value="">Filter by Category</option>
          {["Tech", "Fashion", "Sports", "Health"].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Form.Select>

        {/* Filter Engagement */}
        <Form.Select onChange={handleEngagementRange} className="mb-2">
          <option value="">Filter Engagement</option>
          <option value="0-1000">0-1000</option>
          <option value="1000-5000">1000-5000</option>
          <option value="5000-10000">5000-10000</option>
        </Form.Select>

        {/* Single Sort Dropdown */}
        <Form.Select onChange={handleSort}>
          <option value="engagement-asc">Sort By Engagement - Ascending</option>
          <option value="engagement-desc">
            Sort By Engagement - Descending
          </option>
          <option value="reach-asc">Sort By Reach - Ascending</option>
          <option value="reach-desc">Sort By Reach - Descending</option>
        </Form.Select>
      </Form>

      {/* Display Cards */}
      <Row>
        {items.length > 0 ? (
          items.map((item) => (
            <Col xs={12} sm={6} md={4} lg={3} key={item.id}>
              <ProductCard item={item} onOpenModal={openModal} />
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <p className="text-center mt-4">No items found.</p>
          </Col>
        )}
      </Row>

      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Details for {selectedItem?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Category:</strong> {selectedItem?.category}
          </p>
          <p>
            <strong>Location:</strong> {selectedItem?.location}
          </p>
          <p>
            <strong>Likes:</strong> {selectedItem?.likes}
          </p>
          <p>
            <strong>Shares:</strong> {selectedItem?.shares}
          </p>
          <p>
            <strong>Comments:</strong> {selectedItem?.comments}
          </p>
          <p>
            <strong>Followers:</strong> {selectedItem?.followers}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
