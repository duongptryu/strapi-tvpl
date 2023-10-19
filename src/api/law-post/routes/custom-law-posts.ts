export default {
  routes: [
    {
      method: "GET",
      path: "/law-posts/search",
      handler: "api::law-post.law-post.searchFullText",
      config: {
        auth: false,
      },
    },
  ],
};
