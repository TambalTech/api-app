import React from 'react';
import getBlogs from '../../lib/wordpress';
import Link from "next/link";
import Layout from '../layout';
import Image from 'next/image'

export default async function Blogs() {
  const allPostData = await getBlogs();
  return (
   <Layout>
      <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
            {allPostData.map((post) => (
              <div className="p-4 md:w-1/3">
                <div key={post.id} className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <Image
                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                    src={post.featured_image_url}
                    alt="blog"
                    width={500}
                    height={500}
                  />
                  <div className="p-6">
                  
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {post.title.rendered}
                    </h1>
                    <div className="leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}/> 
                    <div className="flex items-center flex-wrap ">
                      <Link href={"Blog/"+post.slug} className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                        Learn More
                        <svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                      
                    </div>
                  </div>
                </div>
              </div>
                ))}
            </div>
          </div>
      </section>
      </Layout>
  )
}
