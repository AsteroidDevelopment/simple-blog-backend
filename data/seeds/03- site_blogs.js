
exports.seed = function(knex) {
  return knex('site_blogs').insert([

    {
      author_id: 1,
      blog_title: "Gamma Version Release",
      blog_description: "A live version of just the log in & log out.",
      blog_text: "Right now, you can see the view of the core.",
      blog_tags: ['development', 'release'],
      blog_category: "News",
      blog_status: "public"
    },
    {
      author_id: 1,
      blog_title: "How Can Blogging Help Your Business?",
      blog_description: "A short preview of the matter at hand.",
      blog_text: "Here is an example of a blog you could release for natural SEO.",
      blog_tags: ['blogging', 'seo', 'small business', 'tips'],
      blog_category: "Blog",
      blog_status: "public"
    },
    {
      author_id: 1,
      blog_title: "What is The Difference between WordPress, SquareSpace, etc.?",
      blog_description: "A short preview of the matter at hand.",
      blog_text: "Here is an example of a blog you could release for natural SEO.",
      blog_tags: ['blogging', 'seo', 'small business', 'tips'],
      blog_category: "Blog",
      blog_status: "public"
    },
    {
      author_id: 1,
      blog_title: "When To Consider WordPress",
      blog_description: "A short preview of the matter at hand.",
      blog_text: "Here is an example of a blog you could release for natural SEO.",
      blog_tags: ['wordpress', 'tips'],
      blog_category: "Blog",
      blog_status: "public"
    },
    {
      author_id: 1,
      blog_title: "Blogging SEO Tips",
      blog_description: "A short preview of the matter at hand.",
      blog_text: "Here is an example of a blog you could release for natural SEO.",
      blog_tags: ['blogging', 'seo', 'tips'],
      blog_category: "Blog",
      blog_status: "public"
    },{
      author_id: 1,
      blog_title: "Beta Version Release",
      blog_description: "A short preview of the matter at hand.",
      blog_text: "Right now, you can see the view of the core.",
      blog_tags: ['development', 'release', 'new features'],
      blog_category: "News",
      blog_status: "public"
    },
    {
      author_id: 1,
      blog_title: "When Should You Get Your Own Remote Server?",
      blog_description: "A short preview of the matter at hand.",
      blog_text: "Here is an example of a blog you could release for natural SEO.",
      blog_tags: ['small business', 'hosting'],
      blog_category: "Blog",
      blog_status: "public"
    },
    {
      author_id: 1,
      blog_title: "What is The Best Hosting Company?",
      blog_description: "A short preview of the matter at hand.",
      blog_text: "Here is an example of a blog you could release for natural SEO.",
      blog_tags: ['comparisons', 'hosting', 'tips'],
      blog_category: "Blog",
      blog_status: "public"
    },
    {
      author_id: 1,
      blog_title: "Where to Find Free Assets",
      blog_description: "A short preview of the matter at hand.",
      blog_text: "Here is an example of a blog you could release for natural SEO.",
      blog_tags: ['freebies', ],
      blog_category: "Blog",
      blog_status: "public"
    },
    {
      author_id: 1,
      blog_title: "What Are The Benefits of A Custom Application?",
      blog_description: "A short preview of the matter at hand.",
      blog_text: "Here is an example of a blog you could release for natural SEO.",
      blog_tags: ['blogging', 'seo', ],
      blog_category: "Blog",
      blog_status: "public"
    },
    {
      author_id: 1,
      blog_title: "Alpha Version Release",
      blog_description: "A short preview of the matter at hand.",
      blog_text: "Right now, you can see the view of the core.",
      blog_tags: ['development', 'release'],
      blog_category: "News",
      blog_status: "public"
    },
    {
      author_id: 1,
      blog_title: "How Can a Mobile App Help Your Business?",
      blog_description: "A short preview of the matter at hand.",
      blog_text: "Here is an example of a blog you could release for natural SEO.",
      blog_tags: ['mobile', 'small business', ],
      blog_category: "Blog",
      blog_status: "public"
    },
    {
      author_id: 1,
      blog_title: "What is The Difference between WordPress, SquareSpace, etc.?",
      blog_description: "A short preview of the matter at hand.",
      blog_text: "Here is an example of a blog you could release for natural SEO.",
      blog_tags: [ 'seo', 'small business', ],
      blog_category: "Blog",
      blog_status: "public"
    },
    {
      author_id: 1,
      blog_title: "When To Consider WordPress",
      blog_description: "A short preview of the matter at hand.",
      blog_text: "Here is an example of a blog you could release for natural SEO.",
      blog_tags: ['wordpress', ],
      blog_category: "Blog",
      blog_status: "public"
    },
    {
      author_id: 1,
      blog_title: "Blogging SEO Tips",
      blog_description: "A short preview of the matter at hand.",
      blog_text: "Here is an example of a blog you could release for natural SEO.",
      blog_tags: ['blogging', 'seo', ],
      blog_category: "Blog",
      blog_status: "public"
    }


  ]);
};
