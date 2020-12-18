export interface IRealtor {
  url: string;
  id: number;
  logo: string;
  name: string;
  // eslint-disable-next-line camelcase
  unread_messages: number;
}

export interface IMessage {
  body: string;
  contact: { email: string; firstname: string; lastname: string; phone: string };
  date: string;
  id: number;
  read: boolean;
  subject: string;
  type: string;
}
