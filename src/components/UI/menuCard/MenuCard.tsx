import { Button, Card, Col, Row } from "antd";
import { FC } from "react";
import { IUser } from "../../../models/IUser";
import { checkRoles } from "../../../utils/checkRoles";
import cl from "./menuCard.module.css";

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
  console.log(user.places);
  return (
    <>
      {isUser && isPlaces && (
        <Card className={cl.menu_card}>
          <Row>
            {user.places.map((place) => (
              <Col>
                <Button className={cl.pin} size="small" shape="round">
                  {place.name}
                </Button>
              </Col>
            ))}
          </Row>
        </Card>
      )}
    </>
  );
};

export default MenuCard;
