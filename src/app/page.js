import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "./layout";
import { getHomePageData } from "@/lib/wordpress";

export default async function Home(){ 
  const homePageData = await getHomePageData();
  return (
    <Layout>
    <Head>
      <title>Create Next App With TambelTech</title>
      
    </Head>
    <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <img
        className="object-cover object-center rounded"
        alt="hero"
        src={homePageData.hero_image}
      />
    </div>
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
     {homePageData.title}
      </h1>
      <p className="mb-8 leading-relaxed">
      {homePageData.short_description}
      </p>
    </div>
  </div>
</section>
</Layout>
  );
}
