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

      keyword = removeAccents(keyword);

      let qr = `SELECT id,title FROM law_posts WHERE ts @@ phraseto_tsquery('english', '${keyword}') 
      ORDER BY ts_rank(ts, phraseto_tsquery('english', '${keyword}')) DESC OFFSET ${offset} LIMIT ${limit}`;
      let { rows } = await strapi.db.connection.raw(qr);

      return rows;
    },
  })
);

function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}
