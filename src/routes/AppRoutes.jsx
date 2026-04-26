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
import LandingPage from '../modules/landingPage/LandingPage.jsx';

/* 🔒 ROTA PRIVADA */
function PrivateRoute({ children }) {
  const token = localStorage.getItem('@AcheAqui:token');
  return token ? children : <Navigate to="/" replace />;
}

/* 🔓 ROTA PÚBLICA (bloqueia logado) */
function PublicRoute({ children }) {
  const token = localStorage.getItem('@AcheAqui:token');
  return !token ? children : <Navigate to="/homepage" replace />;
}

/* 🔥 HOME INTELIGENTE */
function RootRedirect() {
  const token = localStorage.getItem('@AcheAqui:token');
  return token ? <Navigate to="/homepage" replace /> : <LandingPage />;
}

export default function AppRoutes() {
  return (
    <Routes>

      <Route element={<Layout />}>

        {/* 🔥 ROOT INTELIGENTE */}
        <Route path="/" element={<RootRedirect />} />

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

        {/* 🔒 PRIVADAS */}
        <Route path="/homepage" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />

        <Route path="/produto/:id" element={
          <PrivateRoute>
            <ProductDetailPage />
          </PrivateRoute>
        } />

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