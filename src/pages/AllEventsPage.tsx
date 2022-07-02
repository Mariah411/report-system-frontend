import React, { FC } from "react";
import EventPage from "./EventPage";

const AllEventsPage: FC = () => {
  return (
    <EventPage title="Мероприятия Белгородской области " isButton={false} />
  );
};

export default AllEventsPage;
