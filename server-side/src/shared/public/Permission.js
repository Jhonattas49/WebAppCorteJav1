/**
 * @filename Permission.js 
 * @class Permission
 * @namespace 'src/shared/public' 
 * @description **Enumeração de papéis de usuário** 
 * Define diferentes tipos de papéis disponíveis no sistema, incluindo Usuário,
 * Administrador, Cliente e Prestador de Serviço.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [30/06/2024]
 */
'use strict';
exports.Permission = {
    record_update: "Registro Alterar",
    record_cancel: "Registro Cancelar",

    customer_views: "Cliente Visualizar todos",
    customer_show: "Cliente Apresentar somente",
    customer_create: "Cliente Criar",
    customer_update: "Cliente Alterar",
    customer_cancel: "Cliente Cancelar",    

    admin_views: "Administrador Visualizar todos",
    admin_show: "Administrador Apresentar somente",
    admin_create: "Administrador Criar",
    admin_update: "Administrador Alterar",
    admin_cancel: "Administrador Cancelar",

    roles_views: "Role Visualizar todos",
    roles_show: "Role Apresentar somente",
    roles_create: "Role Criar",
    roles_update: "Role Alterar",
    roles_cancel: "Role Cancel",
    roles_delete: "Role Delete",
    
    bot_views: "Bot Visualizar todos",
    bot_show: "Bot Apresentar somente",
    bot_create: "Bot Criar",
    bot_update: "Bot Alterar",
    roles_delete: "Bot Delete",
    bot_start: "Iniciar bot",
};


exports.Roles = {
    record:"registro",
    user: "Usuário",
    admin: "Administrador",
    customer: "Clientes",
    serviceprovider: "Prestador de serviço",
};

