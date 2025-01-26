'use client';
import React from 'react'
import Layout from '../layout'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';



export default function Login() {
  const router= useRouter();
    const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
          
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Please Add Username'),
            password: Yup.string().required('Please Add Password'),

        }),
        onSubmit: async( data ) => {
          toast.loading('logging you in...',{duration: 1500});
          const loginData = {
            username : data.username,
            password : data.password,
            callbackUrl:'/',
            redirect:false,
          }
          const login = await signIn('credentials',loginData);
          console.log('login', loginData)
          if( login.ok ){
            toast.success('Successfully logged in! Redirecting...');
            router.push( login.url )
          }
          else {toast.error('login failed');}
        },
      });
  return (
    <Layout>
      <section className="text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
    <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
      <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
       Login
      </h2>
    <form onSubmit={formik.handleSubmit}>
    <div className="relative mb-4">
        <label htmlFor="username" className="leading-7 text-sm text-gray-600">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={formik.handleChange}
         value={formik.values.username}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        {formik.errors.username && formik.touched.username ? (
             <p className='text-red-500 text-xs italic'>{formik.errors.username}</p>
           ) : null}
      </div>
      <div className="relative mb-4">
        <label htmlFor="password" className="leading-7 text-sm text-gray-600">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
         value={formik.values.password}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        {
        formik.errors.password && formik.touched.password ? (
             <p className='text-red-500 text-xs italic'>{formik.errors.password}</p>
           ) : null}
      </div>
   
      <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
       Login
      </button>
      <Toaster />
    </form>
    </div>
  </div>
</section>

    </Layout>
  )
}
