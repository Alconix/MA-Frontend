import React, { ChangeEvent, useEffect, useState } from 'react';
import { Menu, Badge } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Layout,
  LayoutSider,
  Content,
  Header,
  SubMenu,
  TopLayout,
  SubLayout,
} from './application-layout.styles';
import { MessagesList, Message } from '..';
import { IRealtor, IMessage } from '../../utils/interfaces';

interface IProps {
  realtors: IRealtor[];
  currentId: number;
  message: IMessage | undefined;
}

const view = {
  LIST: 'list',
  MESSAGE: 'message',
};

// Main component
const ApplicationLayout: React.FC<IProps> = ({ realtors, currentId, message }) => {
  const [mobile, setMobile] = useState<boolean>(false);
  const [mode, setMode] = useState(view.LIST);
  const router = useRouter();

  useEffect(() => {
    const params = router.query;
    if (params.message) setMode(view.MESSAGE);
    else setMode(view.LIST);
  }, [router.query]);

  // Get viewport size
  useEffect(() => {
    const getWidth = () =>
      window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    setMobile(getWidth() <= 768);

    let timeoutId = 0;
    const resizeListener = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => setMobile(getWidth() <= 768), 150);
    };

    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  const currentMessage = message === null ? undefined : message;

  // eslint-disable-next-line eqeqeq
  const currentRealtor = realtors.find((r) => r.id == currentId);

  const subLayout = (
    <SubLayout>
      <Content>
        <Message message={currentMessage} />
      </Content>
    </SubLayout>
  );

  const siderLayout = (
    <LayoutSider width={mobile ? '100vw' : '30%'}>
      <MessagesList realtor={currentRealtor!.id.toString()} />
    </LayoutSider>
  );

  return (
    <Layout>
      <Header style={{ padding: '0 0 0 10px' }}>
        <div>
          <img src="/logo-meilleursagentspro-neg.svg" alt="appicon" />
          <Badge count={currentRealtor?.unread_messages} size="small" offset={[10, 0]}>
            <MailOutlined style={{ color: 'white', fontSize: '1.3rem', marginLeft: '1rem' }} />
          </Badge>
        </div>
        <Menu mode="horizontal" theme="dark">
          <SubMenu
            style={{ width: mobile ? undefined : '200px' }}
            key="submenu"
            title={mobile ? '' : currentRealtor!.name}
            icon={
              <img
                src={currentRealtor!.logo}
                alt="realtor logo"
                height="30 rem"
                width="30 rem"
                style={{ marginRight: 10 }}
              />
            }
          >
            {realtors.map((realtor) => (
              <Menu.Item key={realtor.id}>
                <Link href="/[realtor]" as={`/${realtor.id.toString()}`}>
                  <a>{realtor.name}</a>
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </Header>
      <TopLayout>
        {((mobile && mode === view.LIST) || !mobile) && siderLayout}
        {((mobile && mode === view.MESSAGE) || !mobile) && subLayout}
      </TopLayout>
    </Layout>
  );
};

export default ApplicationLayout;
