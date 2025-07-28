import { Inter } from "next/font/google";
import Link from "next/link";
import React from "react";
import Layout from "./layout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const Page404: React.FC = () => {
  return (
    <Layout>
      <main className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-emerald-600 text-center text-xl lg:text-2xl">
            Page not found
          </h1>
          <Link
            href="/"
            className="mt-1 text-primary font-semibold hover:underline"
          >
            Back to home page
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default Page404;
