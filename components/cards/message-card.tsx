/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import type { ListChildComponentProps } from 'react-window';
import { Skeleton, Typography, Space } from 'antd';
import { useRouter } from 'next/router';

// @ts-ignore
import TimeAgo from 'javascript-time-ago';
// @ts-ignore
import fr from 'javascript-time-ago/locale/fr';
import {
  Card,
  PhoneIcon,
  MailIcon,
  SMSIcon,
  MailIconOpened,
  AuthorSpan,
} from './message-card.styles';

import { IMessage } from '../../utils/interfaces';

const { Paragraph, Text } = Typography;

TimeAgo.locale(fr);
const timeAgo = new TimeAgo('fr-FR');

interface IProps {
  index: number;
  style: React.CSSProperties;
  data: IMessage[];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MessageCard: React.ComponentType<ListChildComponentProps> = ({
  index,
  style,
  data,
}: IProps) => {
  const router = useRouter();
  const loading = data[index] == null;

  if (loading) {
    return (
      <Card style={style} selected={false}>
        <Skeleton loading={loading} avatar active />
      </Card>
    );
  }

  let { read, date, body, subject, type, contact, id } = data[index];

  // check if a message is selected
  const params = router.query;
  const selected = params && params.message ? params.message === id.toString() : false;

  if (selected && !data[index].read) {
    // eslint-disable-next-line no-param-reassign
    data[index].read = true;
    read = true;
  }

  // load the page corresponding to the clicked message
  const handleSelect = () => {
    router.push('/[realtor]/[message]', `/${params.realtor}/${id}`);
  };

  // get icon and title depending of message type
  let author = '';
  let avatar = <i />;

  switch (type) {
    case 'phone': {
      author = contact.phone.match(/.{1,2}/g)!.join(' ');
      avatar = <PhoneIcon read={read} />;
      break;
    }
    case 'email': {
      author = `${contact.firstname} ${contact.lastname}`;
      if (read) avatar = <MailIconOpened />;
      else avatar = <MailIcon />;
      break;
    }
    case 'sms': {
      author = contact.phone.match(/.{1,2}/g)!.join(' ');
      avatar = <SMSIcon read={read} />;
      break;
    }
    default: {
      author = `${contact.firstname} ${contact.lastname}`;
      avatar = <MailIconOpened />;
      break;
    }
  }

  return (
    <Card style={style} selected={selected} onClick={handleSelect}>
      <Skeleton loading={loading} avatar active>
        <Card.Meta
          title={
            <p style={{ textAlign: 'left', fontWeight: 'bolder' }}>
              <AuthorSpan read={read}>{author}</AuthorSpan>
              <span
                style={{
                  float: 'right',
                  fontWeight: 'initial',
                  color: `${read ? 'black' : '#1890ff'}`,
                }}
              >
                {timeAgo.format(new Date(date), 'twitter')}
              </span>
            </p>
          }
          description={
            <Space direction="vertical">
              <Text type={read ? 'secondary' : undefined}>{subject}</Text>
              <Paragraph
                type={read ? 'secondary' : undefined}
                ellipsis={{ rows: 2, expandable: false, symbol: '...' }}
              >
                {body}
              </Paragraph>
            </Space>
          }
          avatar={avatar}
        />
      </Skeleton>
    </Card>
  );
};

export default MessageCard;
