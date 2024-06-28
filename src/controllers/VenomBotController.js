/**
 * File: VenomBotController.js
 * Dir: src/Controllers
 */
'use strict';
const venom = require('venom-bot');
let sessionName;

exports.StartBot = async (req, res, next) => {
  try {
    sessionName = process.env.VENOM_SESSION_NAME || req;

    console.log(sessionName);
    return;
    venom.create(
      sessionName,
      (base64Qr, asciiQR, attempts, urlCode) => {
        console.log('Número de tentativas para ler o QR code:', attempts);
        console.log('QR code no terminal:', asciiQR);
        console.log('QR code base64:', base64Qr);
        console.log('URL code:', urlCode);

        // Remover o prefixo 'data:image/png;base64,' do base64Qr
        const qrCodeBase64 = base64Qr.replace(/^data:image\/\w+;base64,/, '');

        // Envie o QR code como parte da resposta HTTP
        res.status(200).send(qrCodeBase64);
      },
      (statusSession, session) => {
        console.log('Status da Sessão:', statusSession);
        console.log('Nome da Sessão:', session);
        if (statusSession === 'isLogged' || statusSession === 'qrReadSuccess') {
          // Lógica adicional após o login bem-sucedido, se necessário
        } else if (statusSession === 'qrReadFail' || statusSession === 'erroPageWhatsapp') {
          // Lidar com falha ao ler o QR code ou erro na página do WhatsApp
          res.status(500).send({
            message: 'Failed to read QR code or WhatsApp page error',
            error: new Error('Falha ao ler o QR code ou erro na página do WhatsApp')
          });
        }
      },
      {
        logQR: false,
        autoClose: 60000, // Fecha automaticamente após 60 segundos se o QR code não for escaneado
      }
    );

    console.log('Bot iniciado');

  } catch (e) {
    res.status(500).send({
      message: 'Failed to start bot',
      error: e.message
    });
  }
};



// exports.StartBot = async (req, res, next) => {
//   try {
//     const sessionName = process.env.VENOM_SESSION_NAME || 'default-session';

//     console.log('Iniciando Venom');
//     await venom.create(
//       sessionName,
//       (base64Qr, asciiQR, attempts, urlCode) => {
//         // Armazena o QR code em uma variável global se necessário
//         global.VENOM_QRCOD = base64Qr;
//         console.log('Número de tentativas para ler o QR code:', attempts);
//         console.log('QR code no terminal:', asciiQR);
//         console.log('QR code base64:', base64Qr);
//         console.log('URL code:', urlCode);

//         // Envie o QR code como parte da resposta HTTP
//         res.status(200).send({ qrCode: base64Qr });
//       },
//       (statusSession, session) => {
//         console.log('Status da Sessão:', statusSession);
//         console.log('Nome da Sessão:', session);
//         if (statusSession === 'isLogged' || statusSession === 'qrReadSuccess') {
//           // Lógica adicional após o login bem-sucedido, se necessário
//         } else if (statusSession === 'qrReadFail' || statusSession === 'erroPageWhatsapp') {
//           // Lidar com falha ao ler o QR code ou erro na página do WhatsApp
//           res.status(500).send({
//             message: 'Failed to read QR code or WhatsApp page error',
//             error: new Error('Falha ao ler o QR code ou erro na página do WhatsApp')
//           });
//         }
//       },
//       {
//         logQR: false,
//         autoClose: 60000, // Fecha automaticamente após 60 segundos se o QR code não for escaneado
//       }
//     );

//     console.log('Bot iniciado');

//   } catch (e) {
//     res.status(500).send({
//       message: 'Failed to start bot',
//       error: e.message
//     });
//   }
// };
