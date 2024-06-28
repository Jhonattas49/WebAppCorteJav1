const venom = require('venom-bot');

exports.generateQRCode = async (sessionName) =>{
    try {
        return  await venom.create(sessionName, (base64Qr, asciiQR, attempts, urlCode) => {
            console.log('Number of attempts to read the QR code: ', attempts);
            console.log('Terminal QR code: ', asciiQR);
            console.log('Base64 image string QR code: ', base64Qr);
            console.log('URL code (data-ref): ', urlCode);
        }, (statusSession, session) => {
            console.log('Session status: ', statusSession);
            console.log('Session name: ', session);
        });
    } catch (error) {
        console.error('Erro de criação da sessão:', error);
        throw error;
    }
};
