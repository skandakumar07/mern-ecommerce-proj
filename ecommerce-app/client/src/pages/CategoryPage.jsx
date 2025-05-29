// client/src/pages/CategoryPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './styles/CategoryPage.css'; // (create this if needed)

export default function CategoryPage() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        const filtered = res.data.filter(p => p.category.toLowerCase() === name.toLowerCase());
        setProducts(filtered);
      })
      .catch(err => console.error(err));
  }, [name]);

  return (
    <div className="category-page">
      <h2>{name} Products</h2>
      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map(product => (
            <div className="product-card" key={product._id}>
              <Link to={`/product/${product._id}`}>
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
