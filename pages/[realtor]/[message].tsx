import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { ApplicationLayout } from '../../components';
import { IMessage, IRealtor } from '../../utils/interfaces';

interface IProps {
  message: IMessage | undefined;
  id: number;
  realtors: IRealtor[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const realtorParam = context.params ? context.params.realtor : {};
  const msgParam = context.params ? context.params.message : {};

  const resReal = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/realtors/`);
  const realtors = await resReal.json();

  const resMsg = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/realtors/${realtorParam}/messages/${msgParam}`
  );

  // Check if the message exists
  const message = resMsg.status === 404 ? undefined : await resMsg.json();

  // Set the message to read
  if (message !== undefined && !message.read) {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/realtors/${realtorParam}/messages/${msgParam}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({ read: true }),
    });
  }

  return {
    props: {
      message: message || null,
      realtors,
      id: realtorParam,
    },
  };
};

const MessagePage: NextPage<IProps> = ({ message, id, realtors }) => (
  <ApplicationLayout currentId={id} realtors={realtors} message={message} />
);

export default MessagePage;
