import TicketCard from "./Tickets.module.css";
// import { useSelector } from "react-redux";

const Tickets = ({ price, carrier, segments }) => {
  // console.log("tickets >>", segments);

  const segment = segments[0];
  const origin = segment.origin;
  const destination = segment.destination;
  const dateSegmentOrigin = segment.date;
  const dateForCard = new Date(dateSegmentOrigin);
  const formattedTime = dateForCard.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const durationTime = segment.duration;
  const timeDurationConvert = (durationTime) => {
    let hours = Math.floor(durationTime / 60);
    let minutes = durationTime % 60;

    return hours + "ч " + minutes + "м";
  };
  const formattedDuration = timeDurationConvert(durationTime);
  const segmentStops = segment.stops.join(" ,");
  // const
  console.log(segmentStops);

  const originSegment = segments[1];
  const originOrigin = originSegment.origin;
  const originDestination = originSegment.destination;

  // const origin = segments[1];
  // console.log(destinationDestination);

  return (
    <li className={TicketCard.cover}>
      <h1 className={TicketCard.h1}>{price} Р</h1>
      <div className={TicketCard.logo}>
        <img src={`http://pics.avs.io/130/70/${carrier}.png`} alt=""></img>
      </div>

      <div className={TicketCard.ticketInfo}>
        <div className={TicketCard.flightLine}>
          <div className={TicketCard.infoDiv}>
            {origin} - {destination}
          </div>
          <div className={TicketCard.infoDiv}>В ПУТИ</div>
          <div className={TicketCard.infoDiv}>2 ПЕРЕСАДКИ</div>
        </div>
        <div className={TicketCard.infoLine}>
          <div className={TicketCard.infoDiv}>{formattedTime} - 08:00</div>
          <div className={TicketCard.infoDiv}>{formattedDuration}</div>
          <div className={TicketCard.infoDiv}>{segmentStops}</div>
        </div>
      </div>
      <div className={TicketCard.flightLine}>
        <div className={TicketCard.infoDiv}>
          {originOrigin} - {originDestination}
        </div>
        <div className={TicketCard.infoDiv}>В ПУТИ</div>
        <div className={TicketCard.infoDiv}>2 ПЕРЕСАДКИ</div>
      </div>
      <div className={TicketCard.infoLine}>
        <div className={TicketCard.infoDiv}>10:45 - 08:00</div>
        <div className={TicketCard.infoDiv}>21ч 15м</div>
        <div className={TicketCard.infoDiv}>HKG, JNB</div>
      </div>
    </li>
  );
};

export default Tickets;
