import ListStyle from "./TicketsList.module.css";
import Tickets from "../Tickets/Tickets";

export default function TicketsList() {
  return (
    <div className={ListStyle.all}>
      <ul>
        <Tickets />
      </ul>
      <button type="button" className={ListStyle.buttonMore}>
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
      </button>
    </div>
  );
}
