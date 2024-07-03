/**
 * @filename TokenManager.js
 * @class TokenManager
 * @namespace 'src/domain/services' 
 * @description **Gerenciamento de tokens de acesso.**
 * Este arquivo define um gerenciador de tokens de acesso para aplicações web. 
 * Ele provê funções para:
 *  * Salvar tokens de acesso no LocalStorage e em um cookie HttpOnly seguro.
 *  * Recuperar tokens de acesso do LocalStorage.
 *  * Limpar tokens de acesso do LocalStorage e do cookie.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [27/06/2024]
 */
'use strict';

exports.salvarToken = (token)=> {
    // Salva o token no LocalStorage
    localStorage.setItem('token', token);

    // Configura o cookie HttpOnly com um identificador seguro do token
    document.cookie = `token_id=${token}; Secure; HttpOnly; SameSite=Strict`;
}

// Função para recuperar o token do LocalStorage
exports.recuperarToken= ()=> {
    // Recupera o token do LocalStorage
    const token = localStorage.getItem('token');
    return token;
}

// Função para limpar o token do LocalStorage e do cookie
exports.limparToken = () => {
    // Limpa o token do LocalStorage
    localStorage.removeItem('token');

    // Define o cookie HttpOnly com expiração passada para remover
    document.cookie = `token_id=; Secure; HttpOnly; SameSite=Strict; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}