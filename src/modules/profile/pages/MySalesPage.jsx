import React, { useEffect, useState } from 'react';
import api, { imageUrl } from '../../../services/api.js';
import './MySales.css';

export default function MySalesPage() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    api.get('/sales/my')
      .then(({ data }) => {
        setSales(Array.isArray(data) ? data : []);
      });
  }, []);

  return (
    <section className="profile-page">

      {/* HEADER */}
      <div className="section-title">
        <div>
          <span className="eyebrow small">Histórico</span>
          <h1>Minhas vendas</h1>
        </div>
        <span>{sales.length} registros</span>
      </div>

      {/* LISTA */}
      <div className="sales-list">

        {sales.map((sale) => {
          const imageId = sale.product?.images?.[0]?.id;

          return (
            <article className="sale-card with-image" key={sale.id}>

              {/* IMAGEM */}
              <div className="sale-image">
                {imageId ? (
                  <img src={imageUrl(imageId)} alt={sale.product?.title} />
                ) : (
                  <div className="no-image">Sem foto</div>
                )}
              </div>

              {/* INFO */}
              <div className="sale-content">

                <span className={`badge status-${sale.status}`}>
                  {sale.status}
                </span>

                <h3>{sale.product?.title || 'Produto sem nome'}</h3>

                <div className="sale-meta">
                  <span>ID #{sale.id}</span>

                  {sale.created_at && (
                    <span>
                      {new Date(sale.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  )}
                </div>

              </div>

              {/* PREÇO */}
              <div className="sale-price">
                <strong>
                  {Number(sale.amount || 0).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </strong>
              </div>

            </article>
          );
        })}

        {!sales.length && (
          <div className="empty-state">
            <h2>Nenhuma venda registrada</h2>
            <p>Quando você marcar um produto como vendido, ele aparecerá aqui.</p>
          </div>
        )}

      </div>
    </section>
  );
}