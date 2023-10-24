// import { useState } from "react";
// import { useSelector } from "react-redux";

// const [isCheapest, setIsCheapest] = useState(true);

// const { ticketsFetch } = useSelector((store) => store.tickets);

// const priceFilter = ticketsFetch.tickets
//   .slice()
//   .sort((a, b) => a.price - b.price);

// if (isCheapest) {
//   // Обновляем content таба с id1
//   const updatedTabs = tabs.map((tab) => {
//     if (tab.id === "id1") {
//       return {
//         ...tab,
//         content: priceFilter.map((itemTab) => (
//           <ul className={ListStyle.ticketsList}>
//             <Tickets
//               key={uuidv4()}
//               price={itemTab.price}
//               carrier={itemTab.carrier}
//               segments={itemTab.segments}
//             />
//           </ul>
//         )),
//       };
//       return tab;
//     }
//     // return updatedTabs.find((tab) => tab.id === currentTab).content;
//   })
// }