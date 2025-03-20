import Head from 'next/head';
import Layout from '@/components/Layout';
import ScoreDisplay from '@/components/ScoreDisplay';
import ClickButton from '@/components/ClickButton';

export default function Home() {
  return (
    <>
      <Head>
        <title>ClickyGame</title>
        <meta name="description" content="A simple clicker game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ScoreDisplay />
        <ClickButton />
      </Layout>
    </>
  );
}
