import path from 'node:path';

export const EIGHT_HOURS = 8 * 60 * 60 * 1000;

export const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export const COMPANY_POSITIONS = [
  'оператор',
  'директор',
  'бухгалтер',
  'менеджер',
];
