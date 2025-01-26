import React from 'react'
const BASE_URL = process.env.WP_BASE_URL;
const MY_BASE_URL = process.env.MY_BASE_URL;

export default async function getBlogs() {
    const postRes= await fetch(BASE_URL+'posts?_fields=id,title,slug,content,excerpt,featured_image_url');
    const posts= await postRes.json();
  return posts;
}
export async function getBlogData(slug) {
  const postRes = await fetch(BASE_URL+'posts/?slug='+ slug);
  const post = await postRes.json();
  
  return post; // Return the first post
 
}


export async function getHomePageData() {
  const homeData = await fetch(MY_BASE_URL+'settings?setting-name=homepage_setting');
  const homePageData = await homeData.json();
  return homePageData;
}

//export async function getAllBlogSlugs() {
//  const postRes = await getBlogs();
 
  
 // return postRes.map((post) => {
   // return{
    //  params:{ 
     //     slug: post.slug, },
 // };
//})
//}