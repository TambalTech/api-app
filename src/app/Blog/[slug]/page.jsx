import React from 'react';
import getBlogs from '../../../lib/wordpress'; // Adjust path if needed
import Layout from '../../layout';
import Image from 'next/image';

// Server-side component for dynamic blog post pages
export default async function Post({ params }) {
  const { slug } = params;

  // Fetch all blog data
  const allPostData = await getBlogs();
  // Find the specific post by slug
  const postData = allPostData.find((post) => post.slug === slug);

  // If the post is not found, return an error message or handle the 404
  if (!postData) {
    return <div>Post not found</div>;
  }

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <Image
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={postData.featured_image_url}
                  alt="blog"
                  width={500}
                  height={500}
                />
                <div className="p-6">
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {postData.title.rendered}
                  </h1>
                  <div
                    className="leading-relaxed mb-3"
                    dangerouslySetInnerHTML={{ __html: postData.content.rendered }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// This function is used to generate the static params (equivalent to getStaticPaths)
export async function generateStaticParams() {
  const allPostData = await getBlogs(); // Fetch all posts
  return allPostData.map((post) => ({
    slug: post.slug,
  }));
}
