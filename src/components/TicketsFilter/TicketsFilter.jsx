import ticketsStyle from "./TicketsFilter.module.css";

function TicketsFilter() {
  return (
    <div className={ticketsStyle}>
      <div className={ticketsStyle.containter}>
        <p>количество пересадок</p>
        {/* <Check /> */}
        <form>
          <div className={ticketsStyle.check}>
            <input type="checkBox" id="id1" />
            <label htmlFor="id1">Все</label>
            <br />
          </div>

          <div className={ticketsStyle.check}>
            <input type="checkBox" id="id2" />
            <label htmlFor="id2">1 пересадка</label>
            <br />
          </div>
          <div className={ticketsStyle.check}>
            <input type="checkBox" id="id3" />
            <label htmlFor="id3">2 пересадки</label>
            <br />
          </div>
          <div className={ticketsStyle.check}>
            <input type="checkBox" id="id4" />
            <label htmlFor="id4">3 пересадки</label>
            <br />
          </div>
        </form>
      </div>
    </div>
  );
}

export default TicketsFilter;
