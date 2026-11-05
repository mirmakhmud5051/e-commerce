// Firebase xatolarini i18n tarjima kalitlariga aylantiramiz.
export function authErrorKey(code) {
  const messages = {
    'auth/email-already-in-use': 'authEmailUsed',
    'auth/invalid-email': 'authInvalidEmail',
    'auth/weak-password': 'authWeakPassword',
    'auth/password-does-not-meet-requirements': 'authWeakPassword',
    'auth/invalid-credential': 'loginError',
    'auth/invalid-login-credentials': 'loginError',
    'auth/wrong-password': 'loginError',
    'auth/user-not-found': 'loginError',
    'auth/user-disabled': 'authUserDisabled',
    'auth/too-many-requests': 'authTooManyRequests',
    'auth/network-request-failed': 'authNetworkError',
    'auth/popup-closed-by-user': 'authPopupClosed',
    'auth/cancelled-popup-request': 'authPopupClosed',
    'auth/popup-blocked': 'authPopupBlocked',
    'auth/unauthorized-domain': 'authDomainError',
    'auth/operation-not-allowed': 'authProviderDisabled',
    'auth/configuration-not-found': 'authProviderDisabled',
    'auth/invalid-api-key': 'authConfigError',
    'auth/app-not-authorized': 'authConfigError',
    'auth/api-key-not-valid.-please-pass-a-valid-api-key.': 'authConfigError',
    'auth/account-exists-with-different-credential': 'authDifferentProvider',
    'auth/operation-not-supported-in-this-environment': 'authUnsupported',
    'auth/web-storage-unsupported': 'authUnsupported',
  };
  return messages[code] || 'authGenericError';
}
