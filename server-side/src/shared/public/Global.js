/**
 * @filename Global.js 
 * @class Global
 * @namespace 'src/shared/public' 
 * @description **variáveis globais para uso em todo o aplicativo**
 * Ela fornece um mecanismo centralizado para armazenar e acessar informações importantes, 
 * como chaves de criptografia, configurações de e-mail e outras variáveis que precisam ser 
 * acessíveis em diferentes partes do código
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [27/06/2024]
 */
'use strict';

global.SALT_KEY;
global.VENOM_CLIENT= new Map();
global.EMAIL_TMPL='Olá, <strong>{0}</strong>, seja bem vindo à Node Store!'; 