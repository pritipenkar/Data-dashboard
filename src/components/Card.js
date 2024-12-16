import React from "react";
const Card = ({ item, onViewDetails }) => {
  const engagementScore = item.likes + item.shares + item.comments;
  const reach = Math.round((item.followers * engagementScore) / 100);

  return (
    <div className="card">
      <h3>{item.name}</h3>
      <p>Category: {item.category}</p>
      <p>Location: {item.location}</p>
      <p>Engagement Score: {engagementScore}</p>
      <p>Reach: {reach}</p>
      <button onClick={() => onViewDetails(item)}>View Details</button>
    </div>
  );
};

export default Card;
