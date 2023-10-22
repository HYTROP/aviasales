import { setAllFilter } from "../redux/filtersSlice";
import ticketsStyle from "./TicketsFilter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketsSuccess } from "../redux/ticketsSlice";

function TicketsFilter() {
  const dispatch = useDispatch();

  const { checkBoxes } = useSelector((store) => store.filters);

  const handleFilterSet = (id) => {
    const index = checkBoxes.findIndex((item) => item.id === id);
    let updatedCheckBoxes;

    if (checkBoxes[index].title === "Все") {
      const newIsChecked = !checkBoxes[index].isChecked;
      updatedCheckBoxes = checkBoxes.map((item) => ({
        ...item,
        isChecked: newIsChecked,
      }));
    } else {
      const tempCheckBoxes = [...checkBoxes];
      tempCheckBoxes[index] = {
        ...tempCheckBoxes[index],
        isChecked: !tempCheckBoxes[index].isChecked,
      };

      let isAllChecked = true;
      for (let i = 0; i < tempCheckBoxes.length; i++) {
        if (tempCheckBoxes[i].title === "Все") continue;
        const isChecked = tempCheckBoxes[i].isChecked;
        if (!isChecked) {
          isAllChecked = false;
          break;
        }
      }

      const allIndex = tempCheckBoxes.findIndex((item) => item.title === "Все");
      tempCheckBoxes[allIndex] = {
        ...tempCheckBoxes[allIndex],
        isChecked: isAllChecked,
      };

      updatedCheckBoxes = tempCheckBoxes;
    }

    dispatch(setAllFilter(updatedCheckBoxes));
  };
  function handleTicketFetch() {
    if (!fetchTicketsSuccess) return;
    dispatch(fetchTicketsSuccess());
  }

  return (
    <div className={ticketsStyle.containter}>
      <p>количество пересадок</p>
      <form>
        {checkBoxes.map((item) => (
          <div className={ticketsStyle.check} key={item.id}>
            <input
              id={item.id}
              type="checkBox"
              checked={item.isChecked}
              onChange={() => handleFilterSet(item.id)}
              onClick={() => handleTicketFetch()}
            />
            <label htmlFor={item.id}>{item.title}</label>
            <br />
          </div>
        ))}
      </form>
    </div>
  );
}

export default TicketsFilter;
