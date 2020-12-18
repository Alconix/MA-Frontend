import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { ApplicationLayout } from '../components';

import { IRealtor } from '../utils/interfaces';

interface IProps {
  realtor: IRealtor;
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/realtors/`);
  const realtors = await res.json();

  // get first realtor as landing point
  const realtor = realtors[0];

  return {
    props: {
      realtor,
    },
  };
};

const Home: React.FC<IProps> = ({ realtor }) => {
  const router = useRouter();
  useEffect(() => {
    router.push('/[realtor]', `/${realtor.id.toString()}`);
  }, [router, realtor.id]);

  return <div />;
};

export default Home;
