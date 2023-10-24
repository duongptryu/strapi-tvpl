import type { Schema, Attribute } from '@strapi/strapi';

export interface LawLuocDo extends Schema.Component {
  collectionName: 'components_law_luoc_dos';
  info: {
    displayName: 'luoc_do';
    icon: 'expand';
    description: '';
  };
  attributes: {
    van_ban_duoc_huong_dan: Attribute.JSON;
    van_ban_bi_sua_doi_bo_sung: Attribute.JSON;
    van_ban_bi_dinh_chinh: Attribute.JSON;
    van_ban_bi_thay_the: Attribute.JSON;
    van_ban_duoc_dan_chieu: Attribute.JSON;
    van_ban_duoc_can_cu: Attribute.JSON;
    van_ban_lien_quan_ngon_ngu: Attribute.JSON;
    van_ban_lien_quan_cung_noi_dung: Attribute.JSON;
    van_ban_huong_dan: Attribute.JSON;
    van_ban_hop_nhat: Attribute.JSON;
    van_ban_sua_doi_bo_sung: Attribute.JSON;
    van_ban_dinh_chinh: Attribute.JSON;
    van_ban_thay_the: Attribute.JSON;
    posts_lien_quan_noi_dung: Attribute.JSON;
  };
}

export interface LawPostLienQuan extends Schema.Component {
  collectionName: 'components_law_post_lien_quans';
  info: {
    displayName: 'post_lien_quan';
    icon: 'attachment';
  };
  attributes: {
    posts_lien_quan_hieu_luc: Attribute.JSON;
    posts_lien_quan_noi_dung: Attribute.JSON;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'law.luoc-do': LawLuocDo;
      'law.post-lien-quan': LawPostLienQuan;
    }
  }
}
