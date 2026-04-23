import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://animalworld-web-1.onrender.com/api/orders/api/orders/my_orders/', {
        headers: {
          Authorization: `Token ${localStorage.getItem('access')}`,
        },
      });
      setOrders(response.data);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(); 

    const intervalId = setInterval(fetchOrders, 5000); 

    return () => clearInterval(intervalId); 
  }, []);

  if (loading) {
    return <p className="orders-loading-message">Loading orders...</p>;
  }

  if (error) {
    return <p className="orders-error-message">{error}</p>;
  }

  return (
    <div className="orders-wrapper">
      <h1 className="orders-main-title">My Orders</h1>
      {orders.length === 0 ? (
        <p className="orders-no-orders">No orders found.</p>
      ) : (
        <ul className="orders-list-wrapper">
          {orders.map((order) => (
            <li key={order.order_id} className="order-card">
              <h3 className="order-card-title">Order ID: {order.order_id}</h3>
              <p className="order-status-label">Status: <span className="order-status">{order.status}</span></p>
              <p className="order-total-price">Total Price: <strong>{order.total_price} грн</strong></p>
              <h4 className="order-products-heading">Products:</h4>
              <ul className="order-items-list">
                {order.items.map((item) => (
                  <li key={item.product_name} className="order-item">
                    <p className="order-item-name">Product: {item.product_name}</p>
                    <p className="order-item-price">Price: <strong>{item.product_price} грн</strong></p>
                    <p className="order-item-quantity">Quantity: {item.quantity}</p>
                    
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
