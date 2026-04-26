import React from 'react';
import { Link } from 'react-router-dom';
import { imageUrl } from '../../services/api.js';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const cover = product.images?.find((img) => img.is_cover) || product.images?.[0];
  const price = Number(product.price || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <Link to={`/produto/${product.id}`} className="product-card">
      <div className="product-image-wrap">
        {cover ? <img src={imageUrl(cover.id)} alt={product.title} loading="lazy" /> : <div className="no-image">Sem foto</div>}
        <span className="image-count">{product.images?.length || 0} fotos</span>
      </div>
      <div className="product-card-body">
        <div className="card-topline">
          <span className="badge">{product.category?.name || 'Sem categoria'}</span>
          <span className="condition-pill">{product.condition}</span>
        </div>
        <h3>{product.title}</h3>
        <strong>{price}</strong>
        <p>{product.description || 'Clique para ver os detalhes do anúncio.'}</p>
      </div>
    </Link>
  );
}
