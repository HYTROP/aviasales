import ListStyle from "./TicketsList.module.css";
import Tickets from "../Tickets/Tickets";
import Spinner from "../assets/Spin";
import Alert from "../assets/Alert";
import isLoading from "../redux/ticketsSlice";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export default function TicketsList() {
  const { ticketsFetch } = useSelector((store) => store.tickets);
  // const ticketsArray = ticketsFetch.tickets;
  // console.log(ticketsFetch.tickets);

  if (ticketsFetch.tickets !== undefined) {
    return ticketsFetch.tickets.map((item, index) => (
      <Tickets
        key={uuidv4()}
        price={item.price}
        carrier={item.carrier}
        segments={item.segments}
      />
    ));
  } else {
    <Alert
      message="Warning"
      description="Рейсов, подходящих под заданные фильтры, не найдено."
      type="warning"
      showIcon
    />;
  }
  return (
    <div className={ListStyle.all}>
      {!isLoading ? (
        <Spinner />
      ) : (
        <>
          <ul>
            <Tickets />
          </ul>
          <button
            type="button"
            className={ListStyle.buttonMore}
            // onClick={() => handleTicketFetch()}
          >
            ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
          </button>
        </>
      )}
    </div>
  );
}
