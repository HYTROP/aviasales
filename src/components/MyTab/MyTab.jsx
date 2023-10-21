import TicketsList from "../TicketsList/TicketsList";
import React, { useState } from "react";
import TabStyle from "./MyTab.module.css";

const MyTab = () => {
  const [currentTab, setCurrentTab] = useState("id1");
  const tabs = [
    {
      id: "id1",
      tabTitle: "САМЫЙ ДЕШЕВЫЙ",
      title: <TicketsList />, // СДЕЛАТЬ ФИЛЬТР
      content: [],
    },
    {
      id: "id2",
      tabTitle: "САМЫЙ БЫСТРЫЙ",
      title: <TicketsList />, // СДЕЛАТЬ ФИЛЬТР
      content: [],
    },
  ];

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };
  return (
    <div className={TabStyle.container}>
      <div className={TabStyle.tabs}>
        {tabs.map((tab, i) => (
          <button
            className={TabStyle.buttonActive}
            key={i}
            id={tab.id}
            disabled={currentTab === `${tab.id}`}
            onClick={handleTabClick}
          >
            {tab.tabTitle}
          </button>
        ))}
      </div>

      <div className={TabStyle.content}>
        {tabs.map((tab, i) => (
          <div key={i}>
            {currentTab === `${tab.id}` && (
              <div>
                <div className={TabStyle.title}>{tab.title}</div>
                <div className={TabStyle.tabContent}>{tab.content}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    //
  );
};

export default MyTab;
