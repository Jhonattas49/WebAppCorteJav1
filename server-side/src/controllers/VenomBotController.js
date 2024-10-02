/**
 * @filename VenomBotController.js
 * @class VenomBotController
 * @namespace 'src/controllers'
 * @description **Controlador para gerenciamento do bot Venom.**
 * Este controlador fornece endpoints para interagir com o bot Venom, 
 * uma biblioteca JavaScript para criar bots no WhatsApp. 
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [27/06/2024]
 */
'use strict';

const venom = require('venom-bot');
require('../shared/public/Global');
const autheService = require('../domain/services/AuthServices');

exports.get = async (req, res, next) => {
  try {      
      res.status(200).send({
        message: 'Venom é um sistema de alto desempenho desenvolvido em JavaScript para criação de bot para WhatsApp, ' +
        'suporte para criação de qualquer interação, como atendimento ao cliente, envio de mídia, reconhecimento de frases baseado em inteligência artificial e todo tipo de arquitetura de design para WhatsApp.'
      });
  } catch (e) {
      res.status(500).send({
          result: e,
          message: 'Falha ao processar sua requisição!'
      });
  }
}

exports.post = async (req, res, next) => {
  try {
    // Recupera o token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // Decodifica o token
    const data = await autheService.decodeToken(token);
    
    venom.create(
      data.id,
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
          console.log(`Sessão ${session} logada com sucesso`);
        } else if (statusSession === 'qrReadFail' || statusSession === 'erroPageWhatsapp') {
          // Lidar com falha ao ler o QR code ou erro na página do WhatsApp
          const error = new Error('Falha ao ler o QR code ou erro na página do WhatsApp');
          next(error); // Chama o middleware de erro
        }
      },
      { logQR: false, autoClose: 60000 }
    ).then(client => {
      global.VENOM_CLIENT.set(data.id, client);
      res.redirect('/admin'); // Redireciona para a página do administrador
    }).catch(error => {
      next(error); // Chama o middleware de erro
    });

  } catch (error) {    
    next(error); // Chama o middleware de erro
  }
};

// exports.StartBot = async (req, res, next) => {
//   try {
//     venom.create(
//       sessionName,
//       (base64Qr, asciiQR, attempts, urlCode) => {
//         console.log('Número de tentativas para ler o QR code:', attempts);
//         console.log('QR code no terminal:', asciiQR);
//         console.log('QR code base64:', base64Qr);
//         console.log('URL code:', urlCode);

//         // Remover o prefixo 'data:image/png;base64,' do base64Qr
//         const qrCodeBase64 = base64Qr.replace(/^data:image\/\w+;base64,/, '');
//         // Envie o QR code como parte da resposta HTTP
//         res.status(200).send(qrCodeBase64);
//       },
//       (statusSession, session) => {        
//         if (statusSession === 'isLogged' || statusSession === 'qrReadSuccess') {
          
//         // Iniciar cliente do Venom para a sessão atual
//         const client = await venom.getSession(sessionName);

//         // Armazenar cliente do Venom na estrutura de dados por sessão
//         global.VENOM_CLIENT.set(sessionName, client);

//         // Iniciar a lógica para lidar com mensagens recebidas pelo cliente do Venom
        
          
//         } else if (statusSession === 'qrReadFail' || statusSession === 'erroPageWhatsapp') {
//           // Lidar com falha ao ler o QR code ou erro na página do WhatsApp
//           res.status(500).send({
//             message: 'Failed to read QR code or WhatsApp page error',
//             error: new Error('Falha ao ler o QR code ou erro na página do WhatsApp')
//           });
//         }
//       },
//       {logQR: false,autoClose: 60000});
//   } catch (e) {
//     res.status(500).send({
//       message: 'Failed to start bot',
//       error: e.message
//     });
//   }
// };
