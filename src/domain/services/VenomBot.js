/**
 * File: VenomBot.js
 * Dir: src/domain/service
 */
'use strict';
const venom = require('venom-bot');

exports.initializeVenom = async (sessionName) => {
  console.log('Teste');
  try {
    const client = await venom.create(
      sessionName, // Use o nome da sessão passado como argumento
      (base64Qr) => {
        // Armazena o QR code em uma variável global
        global.qrCode = base64Qr;
      },
      undefined,
      { logQR: false } // Desativa o log do QR code no console
    );
    return client;
  } catch (error) {
    console.log(error);
    throw error; // Relança o erro para ser tratado pelo controlador
  }
};



