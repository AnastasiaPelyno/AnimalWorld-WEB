import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [authToken, setAuthToken] = useState(localStorage.getItem('access')); // Get token from localStorage

  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  // Function to fetch products from API
  const fetchProducts = async () => {
    let url = `http://127.0.0.1:8000/api/products/products/?search=${searchTerm}&category=${selectedCategory}&sort_by=${sortBy}&page=${currentPage}`;
    
    const headers = {
      'Authorization': `Token ${authToken}`, // Add token in the request headers
    };

    try {
      const response = await fetch(url, { headers });
      if (response.ok) {
        const data = await response.json();
        // ТЕПЕР ТОВАРИ ЛЕЖАТЬ В data.results (якщо пагінація увімкнена)
        if (data.results) {
            setProducts(data.results);
            setNextPage(data.next); // Зберігаємо посилання на наступну сторінку
            setPrevPage(data.previous); // Зберігаємо посилання на попередню
        } else {
            setProducts(data); // На випадок, якщо пагінація раптом вимкнеться
        }
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to fetch categories
  const fetchCategories = async () => {
    const headers = {
      'Authorization': `Token ${authToken}`, // Add token in the request headers
    };
    try {
      const response = await fetch('http://127.0.0.1:8000/api/products/categories/', { headers });
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Check the data coming in
        setCategories(data);
      } else {
        console.error('Failed to fetch categories');
        alert('Failed to load categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('An error occurred while loading categories');
    }
  };

  const addToCart = async (productId) => {
    const url = 'http://127.0.0.1:8000/api/cart/api/cart/add_to_cart/';
    const headers = {
      'Authorization': `Token ${authToken}`,
      'Content-Type': 'application/json',
    };

    const data = {
      product_id: productId,
      quantity: 1, // Always add 1 item for now
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Product added to cart');
      } else {
        alert('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  useEffect(() => {
      setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  // Завантажуємо товари при зміні сторінки або фільтрів
  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory, sortBy, currentPage, authToken]); 

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="product-page">
      <h1 className="page-title">Product Page</h1>

      <div className="filters-container">
        <div className="filter">
          <label htmlFor="category-select">Category</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter">
          <label htmlFor="search-input">Search</label>
          <input
            id="search-input"
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter">
          <label htmlFor="sort-select">Sort by</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="price">Price</option>
            <option value="-price">Price (Descending)</option>
            <option value="name">Name</option>
            <option value="-name">Name (Descending)</option>
          </select>
        </div>
      </div>

      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.product_id} className="product-card">
              <Link to={`/products/${product.product_id}`}>
                <img src={product.photo} alt={product.name} className="product-image" />
              </Link>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="prices">
                  <p className="price">{product.price} грн</p>
                  {product.discount && (
                    <p className="original-price">
                      <s>{(product.price / (1 - product.discount / 100)).toFixed(2)} грн</s>
                    </p>
                  )}
                </div>
                {product.discount && (
                  <div className="discount">
                    <span>{product.discount}% Off</span>
                  </div>
                )}
                <button className="add-to-cart-btn" onClick={() => addToCart(product.product_id)}>
                  <FaShoppingCart style={{ marginRight: '8px' }} /> Add to cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    {/* НОВИЙ БЛОК: Кнопки пагінації */}
      <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
        <button 
          onClick={() => setCurrentPage(prev => prev - 1)} 
          disabled={!prevPage}
          style={{ padding: '8px 16px', cursor: prevPage ? 'pointer' : 'not-allowed' }}
        >
          Попередня
        </button>
        
        <span style={{ padding: '8px' }}>Сторінка {currentPage}</span>
        
        <button 
          onClick={() => setCurrentPage(prev => prev + 1)} 
          disabled={!nextPage}
          style={{ padding: '8px 16px', cursor: nextPage ? 'pointer' : 'not-allowed' }}
        >
          Наступна
        </button>
      </div>

    
    </div>
    

  );
};

export default ProductPage;
