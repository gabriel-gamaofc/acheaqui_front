import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const elements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-bottom'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content reveal">

          <h1>
            Pare de anunciar<br />
            <span>e não vender.</span>
          </h1>

          <p>
            Seu produto precisa ser visto por quem realmente quer comprar.
          </p>

          <div className="hero-actions">
            <Link to="/cadastro" className="btn primary big">
              Anunciar agora
            </Link>

            <button
              className="btn ghost"
              onClick={() => navigate('/homepage')}
            >
              Ver vitrine
            </button>
          </div>

        </div>
      </section>

      {/* CONTRASTE */}
      <section className="section-alt reveal">
        <h2>Mais visibilidade. Mais resultado.</h2>
        <p>Seu anúncio não fica escondido aqui.</p>
      </section>

      {/* CARDS GRANDES */}
      <section className="cards">

        <div className="card reveal-left">
          📱 Eletrônicos
        </div>

        <div className="card reveal-bottom delay">
          🚗 Veículos
        </div>

        <div className="card reveal-right delay2">
          🏠 Imóveis
        </div>

      </section>

      {/* BENEFÍCIOS (AGORA PREMIUM) */}
      <section className="benefits">

        <div className="benefit reveal-left">
          <div className="benefit-icon">💬</div>
          <h3>Sem intermediários</h3>
          <p>Você negocia direto com o comprador.</p>
        </div>

        <div className="benefit reveal-bottom delay">
          <div className="benefit-icon">⚡</div>
          <h3>Venda mais rápido</h3>
          <p>Seu produto aparece para quem quer comprar.</p>
        </div>

        <div className="benefit reveal-right delay2">
          <div className="benefit-icon">🧠</div>
          <h3>Simples de usar</h3>
          <p>Publique seu anúncio em segundos.</p>
        </div>

      </section>

      {/* CTA */}
      <section className="cta reveal">
        <h2>Comece agora</h2>

        <Link to="/cadastro" className="btn primary big">
          Criar anúncio
        </Link>
      </section>

    </div>
  );
}