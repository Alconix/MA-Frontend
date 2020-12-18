import styled from 'styled-components';
import { Empty as _Empty } from 'antd';

export const ContentContainer = styled.div`
  margin: 0;
  padding: 20px;
  height: 95%;
  display: flex;
  flex-flow: column;
`;

export const InfoContainer = styled.div`
  background-color: white;
  flex: 0 1 auto;
  padding: 20px;
`;

export const MessageContainer = styled.div`
  margin-top: 40px;
  background-color: white;
  flex: 1 1 auto;
  padding: 20px;
  height: 50%;
`;

export const EmptyContainer = styled.div`
  margin: 20px;
  padding: 20px;
  height: 95%;
  background-color: white;
  vertical-align: middle;
`;

export const Empty = styled(_Empty)`
  margin-top: 25%;
`;
