'use strict';

/**
 * Migration: reset corrupted view configuration for client-case content type.
 * Strapi will regenerate a clean default config on next startup.
 */

module.exports = {
  async up(knex) {
    await knex('strapi_core_store_settings')
      .where(
        'key',
        'plugin_content_manager_configuration_content_types::api::client-case.client-case'
      )
      .delete();
  },

  async down() {
    // Nothing to restore — Strapi regenerates this config automatically.
  },
};
