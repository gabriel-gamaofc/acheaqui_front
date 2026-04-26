import React, { useMemo, useState, useEffect } from 'react';
import useTheme from '../../../hooks/useTheme.js';
import api from '../../../services/api.js';
import './Profile.css';

export default function ProfileSettingsPage() {
  const storedUser = JSON.parse(localStorage.getItem('@AcheAqui:user') || 'null');
  const { theme, setTheme } = useTheme();

  const [form, setForm] = useState({
    name: storedUser?.name || '',
    email: storedUser?.email || '',
    whatsapp: storedUser?.whatsapp || ''
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [toast, setToast] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  // ===== DEBOUNCE (NÃO SALVA, SÓ OBSERVA)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (dirty) {
        console.log('Alterações pendentes...');
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [form]);

  // ===== PASSWORD STRENGTH
  useEffect(() => {
    const pwd = passwordForm.new_password;
    let strength = 0;

    if (pwd.length > 5) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;

    setPasswordStrength(strength);
  }, [passwordForm.new_password]);

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  const initials = useMemo(() => {
    const name = form.name || 'Usuário';
    return name.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase();
  }, [form.name]);

  function update(key, value) {
    setDirty(true);
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function updatePassword(key, value) {
    setPasswordForm(prev => ({ ...prev, [key]: value }));
  }

  async function saveLocalProfile(e) {
    e.preventDefault();

    try {
      setSaving(true);

      await new Promise(r => setTimeout(r, 500)); // simulação

      localStorage.setItem(
        '@AcheAqui:user',
        JSON.stringify({ ...(storedUser || {}), ...form })
      );

      setDirty(false);
      showToast('Dados salvos com sucesso');

    } catch {
      showToast('Erro ao salvar', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      return showToast('Senhas não coincidem', 'error');
    }

    try {
      await api.put('/auth/change-password', {
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password
      });

      showToast('Senha atualizada com sucesso');

      setPasswordForm({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });

    } catch {
      showToast('Erro ao atualizar senha', 'error');
    }
  }

  return (
    <section className="profile-page">

      {/* TOAST */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      <div className="profile-settings-grid">

        {/* SUMMARY */}
        <aside className="profile-summary-card">
          <div className="big-avatar">{initials}</div>
          <h2>{form.name}</h2>
          <p>{form.email}</p>
        </aside>

        <div className="settings-card">

          {/* FORM DADOS */}
          <form onSubmit={saveLocalProfile}>

            <h2>Dados do usuário</h2>

            <div className="form-grid">
              <label>Nome
                <input value={form.name} onChange={(e) => update('name', e.target.value)} />
              </label>

              <label>Email
                <input value={form.email} onChange={(e) => update('email', e.target.value)} />
              </label>

              <label>WhatsApp
                <input value={form.whatsapp} onChange={(e) => update('whatsapp', e.target.value)} />
              </label>
            </div>

            {dirty && <span className="unsaved">Alterações não salvas</span>}

            <button className="btn primary" disabled={!dirty || saving}>
              {saving ? 'Salvando...' : 'Salvar dados'}
            </button>

          </form>

          {/* TOGGLE SENHA */}
          <button
            className="btn ghost"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            {showPasswordForm ? 'Cancelar' : 'Trocar senha'}
          </button>

          {/* FORM SENHA */}
          {showPasswordForm && (
            <form className="password-card" onSubmit={handleChangePassword}>

              <label>Senha atual
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordForm.current_password}
                  onChange={(e) => updatePassword('current_password', e.target.value)}
                />
              </label>

              <label>Nova senha
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordForm.new_password}
                  onChange={(e) => updatePassword('new_password', e.target.value)}
                />
              </label>

              <div className="password-strength">
                <div className={`bar level-${passwordStrength}`} />
              </div>

              <label>Confirmar senha
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordForm.confirm_password}
                  onChange={(e) => updatePassword('confirm_password', e.target.value)}
                />
              </label>

              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              </button>

              <button className="btn primary">
                Atualizar senha
              </button>

            </form>
          )}

          {/* TEMA */}
          <div className="theme-card">
            <h3>Tema</h3>
            <div className="theme-options">
              <button className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')}>
                Dark
              </button>
              <button className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')}>
                Light
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}