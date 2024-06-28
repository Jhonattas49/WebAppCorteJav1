/**
 * @filename _index.js
 * @class index
 * @namespace 'src/domain/routes'
 * @description Arquivo utilizado para importar as rotas no app
 * @author [GERSON ALVES DA SILVA]
 * @since [27/06/2024]
 */
'use strict';

module.exports = {
    CustomerRoute: require('./CustumerRoute'),
    VenomBotRoute: require('./VenomBotRoute'),
    AdminRoute: require('./AdminRoute')
}
