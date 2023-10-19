/**
 * law-post service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::law-post.law-post",
  ({ strapi }) => ({
    async searchFullText(query) {
      var offset = query.offset;
      if (offset < 0) {
        offset = 0;
      }

      var limit = query.limit;
      if (limit <= 0 || limit >= 30) {
        limit = 10;
      }

      var keyword = query.keyword;

      let qr = `SELECT id,title FROM law_posts ORDER BY ts_rank(ts, phraseto_tsquery('english', '${keyword}')) DESC OFFSET ${offset} LIMIT ${limit}`;
      let { rows } = await strapi.db.connection.raw(qr);
      
      return rows;
    },
  })
);
