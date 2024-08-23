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
    record_update: "Atualizar registro",
    record_cancel: "Cancelar registro",
    record_delete: "Deletar registro",
    customer_views: "Visualizar Cliente",
    customer_create: "Criar Cliente",
    customer_update: "Atualizar Cliente",
    customer_cancel: "Cancelar Cliente",
    admin_views: "Visualizar administrador",
    admin_create: "Criar administrador",
    admin_update: "Atualizar administrador",
    admin_cancel: "Cancelar administrador",
    bot_views: "Visualizar bot",
    bot_start: "Iniciar bot",
    bot_create: "Criar bot",
    bot_cancel: "Cancelar bot",
    bot_Update: "Atualizar bot",
    hairdresser_views: "Visualizar cabeleireiro",
};


exports.Roles = {
    record:"registro",
    user: "Usuário",
    admin: "Administrador",
    customer: "Clientes",
    serviceprovider: "Prestador de serviço",
};

