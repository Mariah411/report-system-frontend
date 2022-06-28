import { Button, Card, Col, Row, Tag, Tooltip, Typography } from "antd";
import { FC } from "react";
import { IUser } from "../../../models/IUser";
import { checkRoles } from "../../../utils/checkRoles";
import cl from "./menuCard.module.css";

import { EnvironmentOutlined, HomeOutlined } from "@ant-design/icons";
import EllipsisText from "../EllipsisText";
import { IPlace } from "../../../models/IPlace";

type Props = {
  user: IUser;
};

const MenuCard: FC<Props> = (props: Props) => {
  const { user } = props;

  const isUser: boolean = checkRoles(user, "USER");
  const isAdmin: boolean = checkRoles(user, "ADMIN");

  const isPlaces: boolean = user.places.length !== 0;
  const styles = [
    { icon: <EnvironmentOutlined />, color: "#2b4acb" },
    { icon: <HomeOutlined />, color: "#d32029" },
  ];
  console.log(user.places);

  const str = "Муниципальное бюджетное учреждение дополнительного образования ";

  const PlacesData: IPlace[] = user.places.map((place) => ({
    ...place,
    name: place.name.replace(str, ""),
  }));

  return (
    <>
      {isUser && isPlaces && (
        <Card className={cl.menu_card}>
          <Row>
            {PlacesData.map((place) => {
              {
                /* {user.places.map((place) => { */
              }
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
