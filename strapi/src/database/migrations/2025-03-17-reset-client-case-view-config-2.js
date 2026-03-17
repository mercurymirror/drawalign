'use strict';

module.exports = {
  async up(knex) {
    await knex('strapi_core_store_settings')
      .where(
        'key',
        'plugin_content_manager_configuration_content_types::api::client-case.client-case'
      )
      .delete();
  },

  async down() {},
};
