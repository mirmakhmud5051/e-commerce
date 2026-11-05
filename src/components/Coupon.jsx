import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { readStorage, writeStorage } from '../context/shopUtils';

export function useCoupon() {
  const [applied, setApplied] = useState(() => readStorage('exclusive-coupon', false) === true);
  function apply() { setApplied(true); writeStorage('exclusive-coupon', true); }
  return [applied, apply];
}

export default function Coupon({ applied, onApply }) {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  function handleApply() {
    if (code.trim().toUpperCase() === 'EXCLUSIVE10') { onApply(); setError(false); }
    else setError(true);
  }
  return <div className="coupon"><div className="coupon-controls"><input aria-label={t('coupon')} placeholder={t('coupon')} value={code} onChange={(e) => setCode(e.target.value)} /><button type="button" className="button" onClick={handleApply}>{t('applyCoupon')}</button></div><p className={error ? 'field-note error-text' : 'field-note'} role="status">{error ? t('couponInvalid') : applied ? t('couponApplied') : t('couponHint')}</p></div>;
}
