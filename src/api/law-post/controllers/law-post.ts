/**
 * law-post controller
 */
import { errors } from "@strapi/utils";
import { factories } from "@strapi/strapi";

const { ApplicationError } = errors;

export default factories.createCoreController(
  "api::law-post.law-post",
  ({ strapi }) => ({
    async searchFullText(ctx) {
      try {
        await this.validateQuery(ctx);
        const sanitizedQueryParams = await this.sanitizeQuery(ctx);
        if (!ctx.query.keyword) {
          throw new ApplicationError("Invalid keyword parameter");
        }

        var query = {
          keyword: sanitizedQueryParams.keyword,
          offset:
            (Number(sanitizedQueryParams.page) - 1) *
            Number(sanitizedQueryParams.limit),
          limit: sanitizedQueryParams.limit,
        };

        const result = await strapi
          .service("api::law-post.law-post")
          .searchFullText(query);

        ctx.body = result;
      } catch (err) {
        ctx.body = err;
      }
    },
  })
);
