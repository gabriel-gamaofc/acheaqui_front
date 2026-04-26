import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../../services/api.js';
import './Auth.css';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    password: ''
  });

  // 🔥 REDIRECIONA SE JÁ ESTIVER LOGADO
  useEffect(() => {
    const token = localStorage.getItem('@AcheAqui:token');

    if (token) {
      navigate('/homepage', { replace: true });
    }
  }, [navigate]);

  async function submit(e) {
    e.preventDefault();

    try {
      const { data } = await api.post('/auth/register', form);

      localStorage.setItem('@AcheAqui:token', data.token);
      localStorage.setItem('@AcheAqui:user', JSON.stringify(data.user));

      navigate('/homepage', { replace: true });

    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao cadastrar.');
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={submit}>

        <h1>Criar conta</h1>

        <p>
          Cadastre-se para começar a vender no AcheAqui.
        </p>

        <input
          placeholder="Nome"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="E-mail"
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          placeholder="WhatsApp"
          value={form.whatsapp}
          onChange={(e) =>
            setForm({ ...form, whatsapp: e.target.value })
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

        <button className="btn primary">Cadastrar</button>

        <Link to="/login">Já tenho conta</Link>

      </form>
    </section>
  );
}