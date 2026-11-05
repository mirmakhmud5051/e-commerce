import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addCartItem, cartSubtotal } from '../src/context/shopUtils.js';
import { products } from '../src/data/products.js';

test('Bir xil mahsulot qayta qo‘shilsa soni oshadi', () => {
  const cart = addCartItem(addCartItem([], 1, 2), 1, 3);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 5);
});

test('Har xil o‘lcham yoki rang alohida mahsulot sifatida saqlanadi', () => {
  let cart = addCartItem([], 17, 1, 'M', '#db4444');
  cart = addCartItem(cart, 17, 1, 'L', '#db4444');
  cart = addCartItem(cart, 17, 1, 'M', '#a0bce0');
  assert.equal(cart.length, 3);
  assert.equal(new Set(cart.map((item) => item.key)).size, 3);
});

test('Savat hisobida mahsulot narxi va soni hisoblanadi', () => {
  const cart = addCartItem(addCartItem([], 1, 2), 3, 1);
  assert.equal(cartSubtotal(cart, products), 610);
  assert.equal(cartSubtotal([], products), 0);
});

test('Mahsulot qo‘shish avvalgi savatni o‘zgartirmaydi', () => {
  const original = [{ key: '1-M-', id: 1, quantity: 1, size: 'M', color: '' }];
  const result = addCartItem(original, 1);
  assert.equal(original[0].quantity, 1);
  assert.equal(result[0].quantity, 2);
});

test('Mahsulot soni 1 dan 99 gacha bo‘ladi', () => {
  assert.equal(addCartItem([], 1, 0)[0].quantity, 1);
  assert.equal(addCartItem(addCartItem([], 1, 99), 1, 20)[0].quantity, 99);
});

test('Mahsulot ID lari va uch tildagi nomlar to‘liq', () => {
  assert.equal(new Set(products.map((product) => product.id)).size, products.length);
  for (const product of products) {
    for (const language of ['en', 'ru', 'uz']) assert.ok(product.name[language]);
    assert.ok(product.price > 0);
  }
});
