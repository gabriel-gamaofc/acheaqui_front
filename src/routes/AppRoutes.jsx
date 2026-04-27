import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from '../components/Layout/Layout.jsx';
import HomePage from '../modules/home/pages/HomePage.jsx';
import ProductDetailPage from '../modules/product/pages/ProductDetailPage.jsx';
import CreateProductPage from '../modules/createProduct/pages/CreateProductPage.jsx';
import LoginPage from '../modules/auth/pages/LoginPage.jsx';
import RegisterPage from '../modules/auth/pages/RegisterPage.jsx';
import MyProductsPage from '../modules/profile/pages/MyProductsPage.jsx';
import MySalesPage from '../modules/profile/pages/MySalesPage.jsx';
import ProfileSettingsPage from '../modules/profile/pages/ProfileSettingsPage.jsx';
import LandingPage from '../modules/LandingPage/LandingPage.jsx';

/* 🔒 ROTA PRIVADA */
function PrivateRoute({ children }) {
  const token = localStorage.getItem('@AcheAqui:token');
  return token ? children : <Navigate to="/login" replace />;
}

/* 🔓 ROTA PÚBLICA (bloqueia logado) */
function PublicRoute({ children }) {
  const token = localStorage.getItem('@AcheAqui:token');
  return !token ? children : <Navigate to="/homepage" replace />;
}

/* 🔥 ROOT */
function RootPage() {
  return <LandingPage />;
}

export default function AppRoutes() {
  return (
    <Routes>

      <Route element={<Layout />}>

        {/* 🔥 LANDING (SEO PRINCIPAL) */}
        <Route path="/" element={<RootPage />} />

        {/* 🔓 PUBLICAS */}
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />

        <Route path="/cadastro" element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } />

        {/* 🔥 AGORA PÚBLICAS (SEO IMPORTANTE) */}
        <Route path="/homepage" element={<HomePage />} />

        <Route path="/produto/:id" element={<ProductDetailPage />} />

        {/* 🔒 PRIVADAS */}
        <Route path="/novo-produto" element={
          <PrivateRoute>
            <CreateProductPage />
          </PrivateRoute>
        } />

        <Route path="/meus-produtos" element={
          <PrivateRoute>
            <MyProductsPage />
          </PrivateRoute>
        } />

        <Route path="/minhas-vendas" element={
          <PrivateRoute>
            <MySalesPage />
          </PrivateRoute>
        } />

        <Route path="/perfil" element={
          <PrivateRoute>
            <ProfileSettingsPage />
          </PrivateRoute>
        } />

      </Route>

    </Routes>
  );
}