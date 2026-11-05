import { test } from 'node:test';
import assert from 'node:assert/strict';
import { authErrorKey } from '../src/context/authErrors.js';

test('Noto‘g‘ri parol va noma’lum hisob bir xil xabar beradi', () => {
  assert.equal(authErrorKey('auth/invalid-credential'), 'loginError');
  assert.equal(authErrorKey('auth/wrong-password'), 'loginError');
  assert.equal(authErrorKey('auth/user-not-found'), 'loginError');
});

test('Provider yoki domen sozlanmasa tegishli xabar chiqadi', () => {
  assert.equal(authErrorKey('auth/operation-not-allowed'), 'authProviderDisabled');
  assert.equal(authErrorKey('auth/configuration-not-found'), 'authProviderDisabled');
  assert.equal(authErrorKey('auth/unauthorized-domain'), 'authDomainError');
});

test('Google oynasi bloklanishi va foydalanuvchi yopishi farqlanadi', () => {
  assert.equal(authErrorKey('auth/popup-blocked'), 'authPopupBlocked');
  assert.equal(authErrorKey('auth/popup-closed-by-user'), 'authPopupClosed');
});

test('Noma’lum xato uchun foydalanuvchiga umumiy xabar beriladi', () => {
  assert.equal(authErrorKey('auth/unknown-new-code'), 'authGenericError');
  assert.equal(authErrorKey(undefined), 'authGenericError');
});
