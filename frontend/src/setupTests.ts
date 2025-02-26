// テスト環境のセットアップ
import '@testing-library/jest-dom';
import 'jest-environment-jsdom';
import { configure } from '@testing-library/dom';
import { jest } from '@jest/globals';
configure({
    testIdAttribute: 'data-testid',
});

// モックのマッチメディア
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// フェッチのモック
global.fetch = jest.fn();

// 警告の抑制
const originalError = console.error;
console.error = (...args) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};