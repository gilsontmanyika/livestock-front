import { useState, useEffect } from 'react';
import axios from 'axios';
//import './BiddingPage.css';

const BiddingPage = () => {
  const [bidDetails, setBidDetails] = useState([]);
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    fetchBidDetails();
  }, []);

  const fetchBidDetails = async () => {
    try {
      const response = await axios.get('API_URL');
      setBidDetails(response.data);
    } catch (error) {
      console.error('Error fetching bid details:', error);
    }
  };

  const handlePlaceBid = async (event) => {
    event.preventDefault();
    try {
      // Make POST request to BID API with the new price
      await axios.post('BID_API_URL', { price: newPrice });
      // Reset the newPrice state and fetch updated bid details
      setNewPrice('');
      fetchBidDetails();
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  return (
    <div className="bidding-page">
      <div className="bid-details">
        {bidDetails.map((detail) => (
          <div key={detail.id} className="detail">
            <p>
              <strong>Name:</strong> {detail.cattlename}
            </p>
            {/* Render other bid details */}
          </div>
        ))}
      </div>

      <div className="bid-image">
        <div className="image-container">
          {/* Render image div that can be clicked to view and close */}
        </div>

        <div className="bid-form">
          <form onSubmit={handlePlaceBid}>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              required
              value={newPrice}
              onChange={(event) => setNewPrice(event.target.value)}
            />

            <button type="submit">Place Bid</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BiddingPage;