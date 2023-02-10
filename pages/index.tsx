import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import Hero from '@/components/Hero';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>FoodFit | Keep your diet health.</title>
        <meta
          name="description"
          content="Personalized diet recomendation platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <Hero />
      </main>
    </>
  );
}
