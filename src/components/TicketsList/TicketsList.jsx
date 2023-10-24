import { v4 as uuidv4 } from "uuid";

import ListStyle from "./TicketsList.module.css";
import Tickets from "../Ticket/Ticket";

export default function TicketsList({ tickets }) {
  return (
    <div className={ListStyle.all}>
      <>
        <ul className={ListStyle.ticketsList}>
          {tickets.map((item) => (
            <Tickets
              key={uuidv4()}
              price={item.price}
              carrier={item.carrier}
              segments={item.segments}
            />
          ))}
        </ul>
      </>
    </div>
  );
}
