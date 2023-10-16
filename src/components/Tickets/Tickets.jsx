import TicketCard from "./Tickets.module.css";
import logoS7 from "../img/S7 Logo.svg";

const Tickets = () => {
  return (
    <li key={"id"} className={TicketCard.cover}>
      <h1 className={TicketCard.h1}>13459 Р</h1>
      <div className={TicketCard.logo}>
        <img src={logoS7} alt=""></img>
      </div>
      <ul>
        <li className={TicketCard.ticketInfo}>
          <div className={TicketCard.flightLine}>
            <div className={TicketCard.infoDiv}>MOW - HKT</div>
            <div className={TicketCard.infoDiv}>В ПУТИ</div>
            <div className={TicketCard.infoDiv}>2 ПЕРЕСАДКИ</div>
          </div>
          <div className={TicketCard.infoLine}>
            <div className={TicketCard.infoDiv}>10:45 - 08:00</div>
            <div className={TicketCard.infoDiv}>21ч 15м</div>
            <div className={TicketCard.infoDiv}>HKG, JNB</div>
          </div>
        </li>
      </ul>
    </li>
  );
};

export default Tickets;
