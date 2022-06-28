import { Button, Card, Col, Row, Tag, Tooltip, Typography } from "antd";
import { FC } from "react";
import { IUser } from "../../../models/IUser";
import { checkRoles } from "../../../utils/checkRoles";
import cl from "./menuCard.module.css";

import { EnvironmentOutlined, HomeOutlined } from "@ant-design/icons";
import EllipsisText from "../EllipsisText";

type Props = {
  user: IUser;
};
const colors: string[] = ["#52c41a", "#1d39c4", "#08979c"];

const MenuCard: FC<Props> = (props: Props) => {
  const { user } = props;

  const isUser: boolean = checkRoles(user, "USER");
  const isAdmin: boolean = checkRoles(user, "ADMIN");

  // const isUser: boolean = props.user.roles.includes("user");

  // const isAdmin: boolean = props.user.roles.includes("admin");
  const isPlaces: boolean = user.places.length !== 0;
  const styles = [
    { icon: <EnvironmentOutlined />, color: "#2b4acb" },
    { icon: <HomeOutlined />, color: "#d32029" },
  ];
  console.log(user.places);
  return (
    <>
      {isUser && isPlaces && (
        <Card className={cl.menu_card}>
          <Row>
            {user.places.map((place) => {
              const type_id = place.place_type.id - 1;
              return (
                <Col key={place.id}>
                  <Tag
                    key={place.id}
                    className={cl.pin}
                    icon={styles[type_id].icon}
                    color={styles[type_id].color}
                  >
                    <EllipsisText style={{ maxWidth: 200, color: "white" }}>
                      {place.name}
                    </EllipsisText>
                  </Tag>
                </Col>
              );
            })}
          </Row>
        </Card>
      )}
    </>
  );
};

export default MenuCard;
