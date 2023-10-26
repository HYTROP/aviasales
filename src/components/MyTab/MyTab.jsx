import React, { useEffect, useState } from "react";
import TabStyle from "./MyTab.module.css";
import ListStyle from "../TicketsList/TicketsList.module.css";

import { useDispatch, useSelector } from "react-redux";
import TicketsList from "../TicketsList/TicketsList";
import Spinner from "../assets/Spin";
import { fetchTickets, sortTickets } from "../redux/ticketsSlice";

const MyTab = () => {
  const { displayedTickets, isLoading, currentTab } = useSelector(
    (store) => store.tickets
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "tickets/setCurrentTab", payload: tabs[0] });
    dispatch(fetchTickets());
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      dispatch(sortTickets());
    }
  }, [currentTab]);

  const tabs = [
    {
      id: "id1",
      tabTitle: "САМЫЙ ДЕШЕВЫЙ",
      sortFunction: (tickets) => {
        return [...tickets].sort((a, b) => a.price - b.price);
      },
    },
    {
      id: "id2",
      tabTitle: "САМЫЙ БЫСТРЫЙ",
      sortFunction: (tickets) =>
        [...tickets].sort(
          (a, b) => a.segments[0].duration - b.segments[0].duration
        ),
    },
  ];

  // function getSortFunc() {
  //   return tabs.find((tab) => tab.id === currentTab).sortFunction;
  // }

  const handleTabClick = (e) => {
    const tab = tabs.find((tab) => tab.id === e.target.id);
    dispatch({ type: "tickets/setCurrentTab", payload: tab });
  };

  return (
    <div className={TabStyle.container}>
      <div className={TabStyle.tabs}>
        {tabs.map((tab, i) => (
          <button
            className={TabStyle.buttonActive}
            key={i}
            id={tab.id}
            disabled={currentTab.id === `${tab.id}`}
            onClick={handleTabClick}
          >
            {tab.tabTitle}
          </button>
        ))}
      </div>

      <div className={TabStyle.content}>
        <div className={TabStyle.tabContent}>
          {/* <span>Используйте фильтр для поиска билетов</span> */}
          {isLoading ? <Spinner /> : ""}
          <TicketsList tickets={displayedTickets} />
        </div>
        <button
          type="button"
          className={ListStyle.buttonMore}
          onClick={() => dispatch({ type: "tickets/showMoreTickets" })}
        >
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
      </div>
    </div>

    //
  );
};

export default MyTab;
