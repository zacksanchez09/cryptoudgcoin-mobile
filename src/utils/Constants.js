/**
 * E-mail Regular expression.
 */
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * App logo
 */
export const APP_LOGO = require('../assets/images/logo.png');

/**
 * Mexican peso logo.
 */
export const MXN_LOGO = require('../assets/images/mexico.png');

/**
 * Currencies list.
 */
export const CURRENCIES = [
  {
    id: 'UDGC',
    name: 'CryptoUDGCoin',
    image: APP_LOGO,
  },
  {
    id: 'MXN',
    name: 'Peso mexicano',
    image: MXN_LOGO,
  },
];

/**
 *
 * @param {*} nStr
 */
export function formatNumber(nStr) {
  nStr += '';

  var x = nStr.split('.');

  var x1 = x[0];

  var x2 = x.length > 1 ? '.' + x[1] : '';

  var rgx = /(\d+)(\d{3})/;

  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }

  return x1 + x2;
}

/**
 *
 * @param {*} value
 * @param {*} decimals
 */
export function roundNumber(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

/**
 * Get coin logo.
 * @param {"MXN" | "UDGC"} symbol
 */
export function getLogo(symbol) {
  // Check coin symbol
  switch (symbol) {
    case 'MXN':
      return MXN_LOGO;

    case 'UDGC':
      return APP_LOGO;

    default:
      return null;
  }
}
