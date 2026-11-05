import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserRound } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { authErrorKey } from '../context/authErrors';
import { useShop } from '../context/ShopContext';

export default function Signup() {
  const { t, i18n } = useTranslation();
  const { setToast } = useShop();
  const { user, loading } = useAuth();
  const [login, setLogin] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const email = data.email.trim();
    const name = data.name?.trim();
    if (!login && (!name || name.length < 2)) { setError('authInvalidName'); return; }
    setBusy(true);
    setError('');
    auth.languageCode = i18n.language;
    try {
      if (login) {
        await signInWithEmailAndPassword(auth, email, data.password);
        setToast(t('loggedIn'));
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, data.password);
        try {
          await updateProfile(result.user, { displayName: name });
          setToast(t('accountCreated'));
        } catch {
          // Hisob yaratildi, ismni saqlash xatosi qayta ro‘yxatdan o‘tishni talab qilmaydi.
          setToast(t('authProfileWarning'));
        }
      }
    } catch (firebaseError) {
      setError(authErrorKey(firebaseError.code));
    } finally {
      setBusy(false);
    }
  }

  async function googleLogin() {
    if (busy) return;
    setBusy(true);
    setError('');
    auth.languageCode = i18n.language;
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
      setToast(t('loggedIn'));
    } catch (firebaseError) {
      setError(authErrorKey(firebaseError.code));
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    if (busy) return;
    setBusy(true);
    setError('');
    try { await signOut(auth); }
    catch (firebaseError) { setError(authErrorKey(firebaseError.code)); }
    finally { setBusy(false); }
  }

  return <div className="auth-page"><div className="auth-image"><img src="/assets/dl.beatsnoop 1.png" alt={t('shop')} /></div><div className="auth-panel" aria-busy={loading || busy}>
    {loading ? <p role="status">{t('authLoading')}</p> : user ? <div className="profile-panel"><div className="empty-icon"><UserRound size={42} /></div><h1>{t('account')}</h1><h2>{user.displayName || user.email?.split('@')[0]}</h2><p>{user.email}</p><Link className="button" to="/products">{t('continueShopping')}</Link><button className="text-button" onClick={logout} disabled={busy}>{t(busy ? 'authWorking' : 'logout')}</button></div> : <>
      <h1>{t(login ? 'loginTitle' : 'createAccount')}</h1><p>{t('enterDetails')}</p>
      <form className="auth-form" onSubmit={submit}>
        {!login && <input name="name" required minLength={2} maxLength={80} placeholder={t('name')} aria-label={t('name')} autoComplete="name" disabled={busy} />}
        <input type="email" name="email" required placeholder={t('email')} aria-label={t('email')} autoComplete="email" disabled={busy} />
        <input type="password" name="password" required minLength={login ? 1 : 6} placeholder={t('password')} aria-label={t('password')} autoComplete={login ? 'current-password' : 'new-password'} disabled={busy} />
        <button className="button" disabled={busy}>{t(busy ? 'authWorking' : login ? 'login' : 'create')}</button>
      </form>
      <button className="button outline-button google-button" onClick={googleLogin} disabled={busy}><img src="/assets/Icon-Google.png" alt="" />{t('googleLogin')}</button>
      <p className="auth-switch">{t(login ? 'noAccount' : 'haveAccount')} <button disabled={busy} onClick={() => { setLogin(!login); setError(''); }}>{t(login ? 'signup' : 'login')}</button></p>
    </>}
    {error && <p className="error-text auth-error" role="alert">{t(error)}</p>}
  </div></div>;
}
