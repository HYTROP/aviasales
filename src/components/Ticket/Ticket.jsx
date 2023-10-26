import TicketCard from "./Ticket.module.css";

const Tickets = ({ price, carrier, segments }) => {
  let segment = segments[0];
  let originForward = segment.origin;
  let originForwardDestination = segment.destination;
  let dateSegmentOrigin = segment.date;
  let dateForCard = new Date(dateSegmentOrigin);
  let formattedTime = dateForCard.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let durationTime = segment.duration;
  const timeDurationConvert = (durationTime) => {
    let hours = Math.floor(durationTime / 60);
    let minutes = durationTime % 60;
    return hours + "ч " + minutes + "м";
  };
  let formattedDuration = timeDurationConvert(durationTime);

  const moment = require("moment");
  let arriverTime = moment(dateSegmentOrigin);
  let resultDate = arriverTime.add(durationTime, "minutes");
  let formattedResult = resultDate.format("HH:mm");
  let segmentStops = segment.stops.join(", ");

  let segmentBack = segments[1];
  let backOriginCity = segmentBack.origin;
  let backDestinationCity = segmentBack.destination;
  let backDate = segmentBack.date;
  let backDateForCard = new Date(backDate);
  let backFormattedTime = backDateForCard.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let backDurationTime = segmentBack.duration;
  const originBacktimeDurationConvert = (backDurationTime) => {
    let hours = Math.floor(backDurationTime / 60);
    let minutes = backDurationTime % 60;
    return hours + "ч " + minutes + "м";
  };
  let backFormattedDuration = originBacktimeDurationConvert(backDurationTime);

  const backMoment = require("moment");
  let backFlyArriverTime = backMoment(dateSegmentOrigin);
  let backResultDate = backFlyArriverTime.add(durationTime, "minutes");
  let backFormattedResult = backResultDate.format("HH:mm");
  let backSegmentStops = segmentBack.stops.join(", ");

  return (
    <li className={TicketCard.cover}>
      <h1 className={TicketCard.h1}>{price} ₽</h1>
      <div className={TicketCard.logo}>
        <img src={`http://pics.avs.io/130/70/${carrier}.png`} alt=""></img>
      </div>

      <div className={TicketCard.ticketInfo}>
        <div className={TicketCard.flightLine}>
          <div className={TicketCard.infoDiv}>
            {originForward} - {originForwardDestination}
          </div>
          <div className={TicketCard.infoDiv}>В ПУТИ</div>
          <div className={TicketCard.infoDiv}>
            ПЕРЕСАДКИ: {segment.stops.length}
          </div>
        </div>
        <div className={TicketCard.infoLine}>
          <div className={TicketCard.infoDiv}>
            {formattedTime} - {formattedResult}
          </div>
          <div className={TicketCard.infoDiv}>{formattedDuration}</div>
          <div className={TicketCard.infoDiv}>{segmentStops}</div>
        </div>
      </div>
      <div className={TicketCard.flightLine}>
        <div className={TicketCard.infoDiv}>
          {backOriginCity} - {backDestinationCity}
        </div>
        <div className={TicketCard.infoDiv}>В ПУТИ</div>
        <div className={TicketCard.infoDiv}>
          ПЕРЕСАДКИ: {segmentBack.stops.length}{" "}
        </div>
      </div>
      <div className={TicketCard.infoLine}>
        <div className={TicketCard.infoDiv}>
          {backFormattedTime} - {backFormattedResult}
        </div>
        <div className={TicketCard.infoDiv}>{backFormattedDuration}</div>
        <div className={TicketCard.infoDiv}>{backSegmentStops}</div>
      </div>
    </li>
  );
};

export default Tickets;
