
import '../App/App.css';
import Logo from '../Logo/Logo';
import MyTab from '../MyTab/MyTab';
import Tickets from '../Tickets/Tickets';
import TicketsList from '../TicketsList/TicketsList';
import TicketsFilter from '../TicketsFilter/TicketsFilter';

function App() {
  return (
    <div className="App">
      <Logo />
      <TicketsFilter />
      <MyTab>
        {/* <TicketsList>
          <Tickets />
        </TicketsList> */}
      </MyTab>
    </div>
  );
}

export default App;
