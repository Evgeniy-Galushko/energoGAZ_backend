import path from 'node:path';

export const THIRTY_MINUTES = 30 * 60 * 1000;

export const TWELVE_HOURS = 12 * 60 * 60 * 1000;

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export const COMPANY_POSITIONS = [
  'оператор',
  'директор',
  'бухгалтер',
  'менеджер',
];
