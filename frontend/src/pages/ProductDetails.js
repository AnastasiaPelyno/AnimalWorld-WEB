import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
   
    const fetchProduct = async () => {
      const token = localStorage.getItem('access'); 
      const response = await fetch(`https://animalworld-web.onrender.com/api/products/products/${productId}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`, 
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        console.error('Product not found');
      }
    };
    const fetchReviews = async () => {
        const token = localStorage.getItem('access');
        const response = await fetch(`https://animalworld-web.onrender.com/api/reviews/reviews/${productId}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          setReviews(data); 
        } else {
          console.error('Failed to fetch reviews');
        }
      };
    
      fetchProduct();
      fetchReviews(); 
  }, [productId]);

  const handleAddToCart = async () => {
    if (product && quantity > 0) {
      try {
        const token = localStorage.getItem('access'); 
        const cartItem = {
          product_id: product.product_id,
          quantity: quantity,
        };
        
        
        const response = await fetch('https://animalworld-web.onrender.com/api/cart/api/cart/add_to_cart/', {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItem),
        });

        if (response.ok) {
          console.log(`Added ${quantity} of ${product.name} to cart.`);
         
        } else {
          console.error('Failed to add to cart');
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };

  const handleReviewSubmit = async () => {
    const token = localStorage.getItem('access');
    const reviewData = {
      rating: rating,
      comment: comment,
    };

    try {
      const response = await fetch(`https://animalworld-web.onrender.com/api/reviews/reviews/${productId}/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        setReviewMessage('Review added successfully!');
        setRating(0);
        setComment('');
      } else {
        setReviewMessage('Failed to add review.');
      }
    } catch (error) {
      console.error('Error adding review:', error);
      setReviewMessage('Error adding review.');
    }
  };

  return (
    <div className="product-details-page">
      {product ? (
        <div className="product-details-container">
          <div className="product-image-container">
            {/* <img src={product.photo} alt={product.name} className="product-detail-image" /> */}
            <img src={product.image_url || product.photo} alt={product.name} className="product-detail-image" />
          </div>
          <table className="product-detail-table">
            <tbody>
              <tr>
                <th className="product-detail-header">Name:</th>
                <td className="product-detail-value">{product.name}</td>
              </tr>
              <tr>
                <th className="product-detail-header">Description:</th>
                <td className="product-detail-value">{product.description}</td>
              </tr>
              <tr>
                <th className="product-detail-header">Category:</th>
                <td className="product-detail-value">{product.category.name}</td>
              </tr>
              <tr>
                <th className="product-detail-header">Price:</th>
                <td className="product-detail-value">{product.price} грн</td>
              </tr>
              {product.discount && (
                <tr>
                  <th className="product-detail-header">Discount:</th>
                  <td className="product-detail-value">{product.discount}%</td>
                </tr>
              )}
              <tr>
                <th className="product-detail-header">Available:</th>
                <td className="product-detail-value">{product.quantity}</td>
              </tr>
            </tbody>
          </table>
          
          <div className="quantity-container">
            <label htmlFor="quantity">Quantity: </label>
            <select
              id="quantity"
              className="product-detail-quantity-select"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              {[...Array(product.quantity).keys()].map((x) => (
                <option key={x} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="button-container">
            <button onClick={handleAddToCart} className="product-detail-add-to-cart-button">
              Add to cart
            </button>
          </div>
          <div className="reviews-container">
            <h3>Reviews</h3>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <p><strong>{review.user.email}</strong> rated this product {review.rating} stars</p>
                  <p>{review.comment}</p>
                  <p>Posted on: {new Date(review.created_at).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
          {/* Review Form */}
          <div className="review-form">
            <h3>Leave a Review</h3>
            <label>
              Rating (1-5):
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
              />
            </label>
            <label>
              Comment:
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Your comment here"
              />
            </label>
            <button onClick={handleReviewSubmit}>Submit Review</button>
            {reviewMessage && <p>{reviewMessage}</p>}
          </div>
        </div>
      ) : (
        <p className="product-detail-loading-text">Loading product...</p>
      )}
    </div>
  );
};

export default ProductDetails;
