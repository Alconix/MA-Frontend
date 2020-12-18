import React from 'react';

import { Descriptions, Typography } from 'antd';

import {
  ContentContainer,
  InfoContainer,
  MessageContainer,
  EmptyContainer,
  Empty,
} from './message.styles';
import { IMessage } from '../../utils/interfaces';

const { Title, Text } = Typography;

interface IProps {
  message: IMessage | undefined;
}

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

const Message: React.FC<IProps> = ({ message }) => {
  // If not message selected, returns placeholder
  if (message === undefined) {
    return (
      <EmptyContainer>
        <Empty description={null}>Selectionnez un message</Empty>
      </EmptyContainer>
    );
  }

  const date = new Date(message.date);
  const formattedDate = date.toLocaleString('fr-FR', options);

  return (
    <ContentContainer suppressHydrationWarning>
      <InfoContainer style={{ backgroundColor: 'white', padding: 20 }}>
        <Descriptions title={`${message.contact.firstname} ${message.contact.lastname}`}>
          <Descriptions.Item label="Email" span={3}>
            <a href={`mailto:"${message.contact.email}`}>{message.contact.email}</a>
          </Descriptions.Item>
          <Descriptions.Item label="Téléphone">
            <span style={{ color: '#1890ff' }}>
              {message.contact.phone.match(/.{1,2}/g)?.join(' ')}
            </span>
          </Descriptions.Item>
        </Descriptions>
      </InfoContainer>
      <MessageContainer>
        <Title level={3} style={{ fontWeight: 'bold' }}>
          {message.contact.firstname} {message.contact.lastname}
        </Title>
        <Title level={4}>
          <Text type="secondary">{formattedDate}</Text>
        </Title>
        <p style={{ padding: 20 }}>{message.body}</p>
      </MessageContainer>
    </ContentContainer>
  );
};

export default Message;
