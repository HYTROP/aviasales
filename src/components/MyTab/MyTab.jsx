import React, { useEffect } from "react";
import TabStyle from "./MyTab.module.css";
import ListStyle from "../TicketsList/TicketsList.module.css";

import { useDispatch, useSelector } from "react-redux";
import TicketsList from "../TicketsList/TicketsList";
import Spinner from "../assets/Spin";
import { fetchTickets, sortTickets } from "../redux/ticketsSlice";
import { TABS } from "./constants";

const MyTab = () => {
  const { displayedTickets, isLoading, currentTabId, filteredTickets } =
    useSelector((store) => store.tickets);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTickets());
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      dispatch(sortTickets());
    }
  }, [currentTabId]);

  const handleTabClick = (e) => {
    dispatch({ type: "tickets/setCurrentTab", payload: e.target.id });
  };

  return (
    <div className={TabStyle.container}>
      <div className={TabStyle.tabs}>
        {TABS.map((tab, i) => (
          <button
            className={TabStyle.buttonActive}
            key={i}
            id={tab.id}
            disabled={currentTabId === tab.id}
            onClick={handleTabClick}
          >
            {tab.tabTitle}
          </button>
        ))}
      </div>
      <div className={TabStyle.content}>
        <div className={TabStyle.tabContent}>
          {isLoading && <Spinner />}
          {!displayedTickets.length && (
            <div>Рейсов, подходящих под заданные фильтры, не найдено</div>
          )}
          <TicketsList tickets={displayedTickets} />
        </div>
        {displayedTickets.length !== filteredTickets.length && (
          <button
            type="button"
            className={ListStyle.buttonMore}
            onClick={() => dispatch({ type: "tickets/showMoreTickets" })}
          >
            ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
          </button>
        )}
      </div>
    </div>

    //
  );
};

export default MyTab;
