/**
 * @filename GenerateNumber.js 
 * @class GenerateNumber
 * @namespace 'src/shared/public' 
 * @description **Class para geração de numero**
 * A classe GenerateNumber fornece uma função utilitária para gerar números aleatórios 
 * criptograficamente seguros.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [27/06/2024]
 */
'use strict';

const crypto = require('crypto');

exports.generateRandomNumber= () => {
  const bytes = crypto.randomBytes(6);
  const number = parseInt(bytes.toString('hex'), 16);
  return number;
}
