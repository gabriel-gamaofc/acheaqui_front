import React, { useEffect, useMemo, useState } from 'react';
import api from '../../../services/api.js';
import ProductCard from '../../../components/ProductCard/ProductCard.jsx';
import ProductFilters from '../../../components/Filters/ProductFilters.jsx';
import SidebarFilters from '../../../components/Filters/SidearFilters.jsx';
import './HomePage.css';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category_id: '',
    condition: '',
    min_price: '',
    max_price: ''
  });
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const activeFilters = useMemo(
    () => Object.values(filters).filter(Boolean).length,
    [filters]
  );

  async function loadProducts(customFilters) {
    setLoading(true);
    try {
      const params = Object.fromEntries(
        Object.entries(customFilters || filters).filter(([, v]) => v)
      );

      const { data } = await api.get('/products', { params });

      setProducts(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    const { data } = await api.get('/categories/tree');
    setCategories(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  return (
    <section className="home-page">

      <div className="container">

        {/* 🔍 TOPO */}
        <ProductFilters
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          onSearch={() => loadProducts(filters)}
          onOpenFilters={() => setShowFilters(true)}
        />

        {/* 📦 CONTEÚDO */}
        <div className="content-layout">

          {/* SIDEBAR */}
          <div className="filters-column">
            <SidebarFilters
              filters={filters}
              setFilters={setFilters}
              categories={categories}
              onApply={loadProducts}
            />
          </div>

          {/* PRODUTOS */}
          <div className="products-area">

            <div className="section-title">
              <div>
                <span className="eyebrow">Vitrine</span>
                <h2>Produtos em destaque</h2>
              </div>
              <span>
                {loading ? 'Carregando...' : `${products.length} anúncios`}
              </span>
            </div>

            {loading ? (
              <div className="products-grid">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div className="skeleton-card" key={i} />
                ))}
              </div>
            ) : products.length ? (
              <div className="products-grid">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="empty">
                Nenhum produto encontrado com os filtros atuais.
              </p>
            )}

          </div>
        </div>

      </div>

      {/* 🔥 DRAWER MOBILE */}
      {showFilters && (
        <div className="filters-drawer">
          <div className="filters-drawer-content">

            <SidebarFilters
              filters={filters}
              setFilters={setFilters}
              categories={categories}
              onApply={(f) => {
                loadProducts(f);
                setShowFilters(false);
              }}
            />

            <button
              className="close-drawer"
              onClick={() => setShowFilters(false)}
            >
              Fechar
            </button>

          </div>
        </div>
      )}

    </section>
  );
}