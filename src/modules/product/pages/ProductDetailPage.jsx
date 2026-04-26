import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api, { imageUrl } from '../../../services/api.js';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/products/${id}`)
      .then(({ data }) => {
        setProduct(data);
        setSelectedImage(data.images?.[0]?.id || null);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const whatsappLink = useMemo(() => {
    if (!product) return '#';
    const whatsapp = String(product.whatsapp || '').replace(/\D/g, '');
    const normalized = whatsapp.startsWith('55') ? whatsapp : `55${whatsapp}`;
    const message = encodeURIComponent(`Olá, vi seu anúncio no AcheAqui: ${product.title}`);
    return `https://wa.me/${normalized}?text=${message}`;
  }, [product]);

  if (loading) return <p className="empty">Carregando produto...</p>;
  if (!product) return <p className="empty">Produto não encontrado.</p>;

  return (
    <section className="detail-page">

      {/* GALERIA */}
      <div className="gallery-panel">

        <div className="main-photo">
          {selectedImage ? (
            <img src={imageUrl(selectedImage)} alt={product.title} />
          ) : (
            <span>Sem foto</span>
          )}
        </div>

        <div className="thumbs">
          {product.images?.map((img) => (
            <button
              key={img.id}
              onClick={() => setSelectedImage(img.id)}
              className={selectedImage === img.id ? 'active' : ''}
            >
              <img src={imageUrl(img.id)} alt={img.file_name} />
            </button>
          ))}
        </div>

      </div>

      {/* INFO */}
      <div className="product-info-panel">

        <div className="detail-headline">
          <span className="badge">{product.category?.name}</span>
          <h1>{product.title}</h1>
          <div className="price">
            {Number(product.price).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </div>
        </div>

        {/* INFO CARDS */}
        <div className="info-cards">
          <div>
            <span>Estado</span>
            <strong>{product.condition}</strong>
          </div>

          <div>
            <span>Vendedor</span>
            <strong>{product.seller?.name || 'Anunciante'}</strong>
          </div>

          <div>
            <span>Contato</span>
            <strong>{product.whatsapp}</strong>
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <div className="description-card">
          <h2>Descrição</h2>
          <p>{product.description}</p>
        </div>

        {/* AÇÕES */}
        <div className="detail-actions">
          <a
            className="btn success"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            Falar no WhatsApp
          </a>

          <Link className="btn ghost" to="/homepage">
            Voltar
          </Link>
        </div>

      </div>

    </section>
  );
}