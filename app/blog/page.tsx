import React from "react";

const posts = [
  {
    id: 1,
    title: "Unleashing the power of AI in business",
    href: "#",
    description:
      "Explore how artificial intelligence can transform your business operations and unlock new opportunities for growth and innovation.",
    date: "Apr 22, 2024",
    datetime: "2024-04-22",
    category: { title: "AI & Machine Learning", href: "#" },
    author: {
      name: "Anjul Kumar",
      role: "Chief Data Scientist",
      href: "#",
      imageUrl:
        "",
    },
  },
  {
    id: 2,
    title: "The future of data analytics",
    href: "#",
    description:
      "Dive into the latest trends and technologies shaping the field of data analytics. Stay ahead in a competitive market with cutting-edge insights.",
    date: "Jul 12, 2024",
    datetime: "2024-07-12",
    category: { title: "Data Analytics", href: "#" },
    author: {
      name: "Rashmi Bhumiwal",
      role: "Senior BI Consultant",
      href: "#",
      imageUrl:
        "",
    },
  },
];

export default function BlogPage() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Insights from the Experts
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Stay informed with the latest industry trends, best practices, and expert advice
            from the thought leaders at LakeFrontAI.
          </p>
        </div>

        {/* Blog Posts Section */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Category and Date */}
              <div className="flex items-center justify-between px-6 pt-6 text-sm text-gray-500">
                <time dateTime={post.datetime}>{post.date}</time>
                <a
                  href={post.category.href}
                  className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-600 text-xs font-medium"
                >
                  {post.category.title}
                </a>
              </div>

              {/* Post Title and Description */}
              <div className="px-6 mt-4">
                <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600">
                  <a href={post.href}>{post.title}</a>
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{post.description}</p>
              </div>

              {/* Author Info */}
              <div className="mt-auto flex items-center px-6 py-4">
                <img
                  src={post.author.imageUrl}
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="ml-4 text-sm">
                  <p className="font-medium text-gray-900">{post.author.name}</p>
                  <p className="text-gray-600">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}