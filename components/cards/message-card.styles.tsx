import styled from 'styled-components';
import { Card as _Card, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';

// eslint-disable-next-line import/prefer-default-export
export const Card = styled(_Card)<{ selected: boolean }>`
  box-shadow: ${(props) =>
    props.selected ? 'inset 0px 11px 8px -10px #CCC, inset 0px -11px 8px -10px #CCC' : ''};
  background-color: ${(props) => (props.selected ? '#ebebeb' : 'white')};
`;

export const PhoneIcon = styled.i.attrs(() => ({
  className: 'mypro-icon mypro-icon-phone',
}))<{ read: boolean | null }>`
  color: ${(props) => (props.read ? 'black' : '#1890ff')};
  vertical-align: middle;
`;

export const MailIcon = styled(MailOutlined)`
  color: #1890ff;
  font-size: 1.1rem;
  vertical-align: middle;
`;

export const MailIconOpened = styled.i.attrs(() => ({
  className: 'mypro-icon mypro-icon-mail',
}))`
  color: black;
  vertical-align: middle;
`;

export const SMSIcon = styled.i.attrs(() => ({
  className: 'mypro-icon mypro-icon-sms',
}))<{ read: boolean | null }>`
  color: ${(props) => (props.read ? 'black' : '#1890ff')};
  vertical-align: middle;
`;

export const AuthorSpan = styled.span<{ read: boolean | null }>`
  font-weight: ${(props) => (props.read ? 'initial' : 'bolder')};
`;

export const TimeSpan = styled.span<{ read: boolean | null }>`
  color: ${(props) => (props.read ? 'black' : '#1890ff')};
  float: 'right';
  font-weight: 'initial';
`;
