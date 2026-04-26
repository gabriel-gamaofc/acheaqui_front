import React, { useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import useTheme from '../../hooks/useTheme.js';
import './Layout.css';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem('@AcheAqui:token');
  const user = JSON.parse(localStorage.getItem('@AcheAqui:user') || 'null');

  const isFullWidthPage = location.pathname.startsWith('/produto');

  const initials = useMemo(() => {
    const name = user?.name || 'Usuário';
    return name
      .split(' ')
      .slice(0, 2)
      .map((p) => p[0])
      .join('')
      .toUpperCase();
  }, [user?.name]);

  function logout() {
    localStorage.removeItem('@AcheAqui:token');
    localStorage.removeItem('@AcheAqui:user');
    setMenuOpen(false);
    navigate('/login');
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className="app-shell">

      {/* HEADER */}
      <header className="topbar">
        <div className="topbar-inner">

          {/* BRAND */}
          <Link to="/homepage" className="brand" onClick={closeMenu}>
            <span className="brand-mark">A</span>
            <span className="brand-text">
              Ache<span>Aqui</span>
            </span>
          </Link>

          {/*  MOBILE HEADER ACTIONS */}
          <div className="mobile-header-actions">

            <button
              className="theme-toggle-mobile-inline"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              className="mobile-menu"
              onClick={() => setMenuOpen(prev => !prev)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>

          {/* NAV */}
          <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>

            <NavLink to="/homepage" onClick={closeMenu}>Vitrine</NavLink>

            {token && <NavLink to="/novo-produto" onClick={closeMenu}>Anunciar</NavLink>}
            {token && <NavLink to="/meus-produtos" onClick={closeMenu}>Meus produtos</NavLink>}
            {token && <NavLink to="/minhas-vendas" onClick={closeMenu}>Minhas vendas</NavLink>}
            {token && <NavLink to="/perfil" onClick={closeMenu}>Perfil</NavLink>}

            {/* MOBILE EXTRA */}
            <div className="mobile-extra">

              {token ? (
                <button onClick={logout} className="btn ghost full">
                  Sair
                </button>
              ) : (
                <div className="mobile-auth">
                  <Link to="/login" onClick={closeMenu}>Entrar</Link>
                  <Link to="/cadastro" onClick={closeMenu}>Criar conta</Link>
                </div>
              )}

            </div>

          </nav>

          {/* DESKTOP */}
          <div className="header-actions">

            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {token ? (
              <div className="user-box">
                <Link to="/perfil" className="avatar">
                  {initials}
                </Link>
                <button onClick={logout} className="btn ghost">
                  Sair
                </button>
              </div>
            ) : (
              <div className="guest-actions">
                <Link to="/login" className="btn ghost">Entrar</Link>
                <Link to="/cadastro" className="btn primary">Criar conta</Link>
              </div>
            )}

          </div>

        </div>
      </header>

      {/* MAIN */}
      <main className={isFullWidthPage ? 'page-full' : 'page-container'}>
        <Outlet />
      </main>

    </div>
  );
}