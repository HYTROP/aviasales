import ticketsStyle from "./TicketsFilter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAllFilters } from "../redux/filtersSlice";
import { useEffect, useState } from "react";
import { filterTickets } from "../redux/ticketsSlice";
import { CHECKBOXES as checkBoxes } from "./constants";
import ModalWindow from "./VerticalMenu";

function TicketsFilter() {
  const dispatch = useDispatch();

  const { selectedCheckBoxesId } = useSelector((store) => store.filters);
  const { ticketsData } = useSelector((store) => store.tickets);

  useEffect(() => {
    dispatch(filterTickets(selectedCheckBoxesId));
  }, [selectedCheckBoxesId, ticketsData]);

  const handleFilterSet = (id) => {
    let newSelectedIds;

    if (id === 1) {
      const isChecked = selectedCheckBoxesId.includes(id);
      newSelectedIds = !isChecked ? checkBoxes.map((item) => item.id) : [];
    } else {
      newSelectedIds = [...selectedCheckBoxesId];
      const isChecked = selectedCheckBoxesId.includes(id);
      if (isChecked) {
        const index = newSelectedIds.indexOf(id);
        newSelectedIds.splice(index, 1);
      } else {
        newSelectedIds.push(id);
      }
      const isAllChecked =
        newSelectedIds.filter((id) => id !== 1).length ===
        checkBoxes.length - 1;

      const isMainChecked = newSelectedIds.includes(1);
      if (isAllChecked && !isMainChecked) {
        newSelectedIds.push(1);
      } else if (!isAllChecked && isMainChecked) {
        const index = newSelectedIds.indexOf(1);
        newSelectedIds.splice(index, 1);
      }
    }

    dispatch(setAllFilters(newSelectedIds));
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 420);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 420);
    };

    window.addEventListener("resize", handleResize);

    // Clean up function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filterContent = (
    <>
      <form>
        <p>количество пересадок</p>
        {checkBoxes.map((item) => (
          <div className={ticketsStyle.check} key={item.id}>
            <input
              id={item.id}
              type="checkBox"
              checked={selectedCheckBoxesId.includes(item.id)}
              onChange={() => handleFilterSet(item.id)}
            />
            <label htmlFor={item.id}>{item.title}</label>
            <br />
          </div>
        ))}
      </form>
    </>
  );

  return (
    <div className={ticketsStyle.container}>
      {!isMobile ? filterContent : <ModalWindow>{filterContent}</ModalWindow>}
    </div>
  );
}

export default TicketsFilter;
