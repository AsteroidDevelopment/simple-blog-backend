
exports.seed = function(knex) {
  return knex('site_pages').insert([
 
    {
      page_title: "Multi-User Blogging",
      page_body_text: "",
      page_category: "Features",
      page_order: 2,
      page_status: "public",
    },
    {
      page_title: "In-Browser Page Design",
      page_body_text: "",
      page_category: "Features",
      page_order: 3,
      page_status: "public",
    },
    {
      page_title: "Contact & Support Features",
      page_body_text: "",
      page_category: "Features",
      page_order: 4,
      page_status: "public",
    },
    {
      page_title: "More Products",
      page_body_text: "",
      page_category: "Features",
      page_order: 5,
      page_status: "public",
    },

    
    {
      page_title: "The Developer",
      page_body_text: "",
      page_category: "About",
      page_order: 6,
      page_status: "public",
    },
    {
      page_title: "The Project",
      page_body_text: "",
      page_category: "About",
      page_order: 7,
      page_status: "public",
    },
    {
      page_title: "Mission Statement",
      page_body_text: "",
      page_category: "About",
      page_order: 8,
      page_status: "public",
    },



  ]);
};
