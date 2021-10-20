// jest.setup.ts
import '@testing-library/jest-dom';

jest.mock('@/modules/currencies');
jest.mock('@/modules/time/getNow');
