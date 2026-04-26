import React, { useEffect, useState } from 'react';
import api from '../../../services/api.js';
import ProductCard from '../../../components/ProductCard/ProductCard.jsx';
import './MyProducts.css';

export default function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const { data } = await api.get('/products/my/list');
      setProducts(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  async function markAsSold(id) {
    await api.patch(`/products/${id}/status`, { status: 'vendido' });
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <section className="profile-page">
      <div className="section-title">
        <div><span className="eyebrow small">Gestão</span><h1>Meus produtos</h1></div>
        <span>{loading ? 'Carregando...' : `${products.length} cadastrados`}</span>
      </div>
      {products.length ? (
        <div className="profile-grid">
          {products.map((product) => (
            <div className="profile-product" key={product.id}>
              <ProductCard product={product} />
              <div className="profile-actions">
                <span>Status: {product.status}</span>
                {product.status !== 'vendido' && <button className="btn ghost" onClick={() => markAsSold(product.id)}>Marcar como vendido</button>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty">Você ainda não cadastrou produtos.</p>
      )}
    </section>
  );
}
