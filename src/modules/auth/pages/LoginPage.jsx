import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../../services/api.js';
import './Auth.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  // 🔥 VERIFICA SE JÁ ESTÁ LOGADO
  useEffect(() => {
    const token = localStorage.getItem('@AcheAqui:token');

    if (token) {
      navigate('/homepage', { replace: true });
    }
  }, [navigate]);

  async function submit(e) {
    e.preventDefault();

    try {
      const { data } = await api.post('/auth/login', form);

      localStorage.setItem('@AcheAqui:token', data.token);
      localStorage.setItem('@AcheAqui:user', JSON.stringify(data.user));

      navigate('/homepage', { replace: true });

    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao entrar.');
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h1>Entrar</h1>

        <p>
          Acesse sua conta para anunciar, ver seus produtos e acompanhar vendas.
        </p>

        <input
          placeholder="E-mail"
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          placeholder="Senha"
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="btn primary">Entrar</button>

        <Link to="/cadastro">Criar minha conta</Link>
      </form>
    </section>
  );
}