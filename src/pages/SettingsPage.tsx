import { Button, Card, Col, Layout, Row, Table, Tag, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import { ColumnsType } from "antd/lib/table";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
//import { cols } from "../data/tableUsersData";
import { IUser } from "../models/IUser";

const SettingsPage: FC = () => {
  const [data, setData] = useState<IUser[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get<IUser[]>("./users.json");
      setData(response.data);
    };

    getData();
  }, []);

  //setTimeout(, 0);

  console.log(data);

  const cols: ColumnsType<IUser> = [
    { title: "ФИО", dataIndex: "fio", key: "fio" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Роли",
      dataIndex: "roles",
      key: "roles",
      render: (roles: string[]) => (
        <>
          {roles.map((role) => (
            <Tag color="blue" key={role}>
              {role}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Места",
      dataIndex: "places",
      key: "places",
      render: (places: string[]) => (
        <>
          {places.map((place) => (
            <Tag color="green" key={place}>
              {place}
            </Tag>
          ))}
        </>
      ),
    },

    {
      title: "",
      dataIndex: "",
      render: () => <Button>Редактировать</Button>,
    },
  ];

  const myColumns = [...cols];

  return (
    <Layout className="site-layout layout_m">
      <Content className="content content_m-20">
        <Card>
          <Row align="middle" justify="space-between">
            <Col>
              <Typography.Title level={3}>Управление системой</Typography.Title>
            </Col>
          </Row>
        </Card>
        <Card>
          <Table columns={myColumns} size="middle" dataSource={data} />
        </Card>
      </Content>
    </Layout>
  );
};

export default SettingsPage;
