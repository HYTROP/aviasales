import '../App/App.css';
import Logo from '../Logo/Logo';
import MyTab from '../MyTab/MyTab';
import TicketsList from '../TicketsList/TicketsList';
import TicketsFilter from '../TicketsFilter/TicketsFilter';

function App() {
  return (
    <div className="App">
      <Logo />
      <div className='ticketsContent'>
        <TicketsFilter />
        <MyTab>
          <TicketsList />
        </MyTab>
      </div>

    </div>
  );
}

export default App;
