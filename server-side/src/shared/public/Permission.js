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
    recordpdate: "Atualizar registro",
    recordcancel: "Cancelar registro",
    recorddelete: "Deletar registro",
    custumerviews: "Visualizar Cliente",
    customercreate: "Criar Cliente",
    customerupdate: "Atualizar Cliente",
    customercancel: "Cancelar Cliente",
    adminviews: "Visualizar administrador",
    admincreate: "Criar administrador",
    adminupdate: "Atualizar administrador",
    admincancel: "Cancelar administrador",
    botviews: "Visualizar bot",
    botstart: "Iniciar bot",
    botcreate: "Criar bot",
    botcancel: "Cancelar bot",
};


exports.Roles = {
    record:"registro",
    user: "Usuário",
    admin: "Administrador",
    customer: "Clientes",
    serviceprovider: "Prestador de serviço",
};

