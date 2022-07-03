import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { FC } from "react";
import SettingsRouter from "../../components/routers/SettingsRouter";

const SettingsPage: FC = () => {
  const onSearch = (value: string) => console.log(value);

  return (
    <Layout className="site-layout layout_m">
      <Content className="content content_m-20">
        <SettingsRouter />
      </Content>
    </Layout>
  );
};

export default SettingsPage;
