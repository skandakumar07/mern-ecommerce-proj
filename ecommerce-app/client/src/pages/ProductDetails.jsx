import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import './styles/ProductDetails.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        axios.get('http://localhost:5000/api/products')
          .then(res2 => {
            const relatedItems = res2.data.filter(
              item => item.category === res.data.category && item._id !== res.data._id
            );
            setRelated(relatedItems);
          });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-link">← Back to Home</Link>

      <div className="product-detail">
        <img src={product.imageUrl} alt={product.name} className="product-image" />

        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="description">{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>In Stock:</strong> {product.stock}</p>

          <label>Qty: </label>
          <select value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
            {[...Array(10).keys()].map(x => (
              <option key={x + 1} value={x + 1}>{x + 1}</option>
            ))}
          </select>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <>
          <h3 className="section-title">More in {product.category}</h3>
          <div className="related-products">
            {related.map(item => (
              <div className="related-card" key={item._id}>
                <Link to={`/product/${item._id}`}>
                  <img src={item.imageUrl} alt={item.name} />
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
