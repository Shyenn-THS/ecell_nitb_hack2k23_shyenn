import Head from 'next/head';
import { Inter } from '@next/font/google';
import Hero from '@/components/Hero';
import foods from '../data/foods.json';
import nutrients from '../data/foods.json';
import { addDoc, collection } from 'firebase/firestore';
import db from '@/lib/firebase';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  // const upload = () => {
  //   nutrients.forEach(async (nutrient) => {
  //     const docRef = await addDoc(collection(db, 'nutrient'), nutrient);
  //     console.log(docRef);
  //   });
  // };

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

      <main className="max-w-7xl mx-auto">
        {/* <button onClick={upload}>Upload</button> */}
        <Hero />
      </main>
    </>
  );
}
