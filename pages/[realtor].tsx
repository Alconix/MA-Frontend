import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { ApplicationLayout } from '../components';
import { IRealtor } from '../utils/interfaces';

interface IProps {
  id: number;
  realtors: IRealtor[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const realtor = context.params ? context.params.realtor : {};

  const resReal = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/realtors/`);

  const realtors = await resReal.json();

  return {
    props: {
      realtors,
      id: realtor,
    },
  };
};

const Realtor: NextPage<IProps> = ({ id, realtors }) => (
  <ApplicationLayout currentId={id} realtors={realtors} message={undefined} />
);

export default Realtor;
