import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/cart/api/cart/view_cart/', {
        headers: {
          Authorization: `Token ${localStorage.getItem('access')}`,
        },
      });
      setCartItems(response.data);
      calculateTotalPrice(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = async (cart_item_id, quantity) => {
    try {
      await axios.patch(
        'http://localhost:8000/api/cart/api/cart/update_quantity/',
        { cart_item_id: cart_item_id, quantity: quantity },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('access')}`,
          },
        }
      );
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await axios.delete('http://localhost:8000/api/cart/api/cart/remove_from_cart/', {
        data: { cart_item_id: cartItemId },
        headers: {
          Authorization: `Token ${localStorage.getItem('access')}`,
        },
      });
      fetchCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleIncrement = (cartItemId, currentQuantity, maxQuantity) => {
    if (currentQuantity < maxQuantity) {
      handleQuantityChange(cartItemId, currentQuantity + 1);
    }
  };

  const handleDecrement = (cartItemId, currentQuantity) => {
    if (currentQuantity > 1) {
      handleQuantityChange(cartItemId, currentQuantity - 1);
    }
  };

  const handleCheckout = () => {
    // Додайте логіку оформлення замовлення (звернення до API)
    axios.post('http://localhost:8000/api/cart/api/cart/checkout/', {}, {
      headers: {
        Authorization: `Token ${localStorage.getItem('access')}`,
      },
    }).then(() => {
      // Перенаправлення на сторінку "Дякуємо за замовлення"
      window.location.href = '/checkout';
    }).catch((error) => {
      console.error('Error during checkout:', error);
    });
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((cart_item) => (
              <div key={cart_item.cart_item_id} className="cart-item">
                <img
                  src={cart_item.product.photo }
                  alt={cart_item.product.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{cart_item.product.name}</h3>
                  <p className="product-price">Price: {cart_item.product.price} грн</p>

                  <div className="quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={() =>
                        handleDecrement(cart_item.cart_item_id, cart_item.quantity)
                      }
                      disabled={cart_item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{cart_item.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() =>
                        handleIncrement(cart_item.cart_item_id, cart_item.quantity, cart_item.product.quantity)
                      }
                      disabled={cart_item.quantity >= cart_item.product.quantity}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() => handleRemoveItem(cart_item.cart_item_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total Price: {totalPrice} грн</h3>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
