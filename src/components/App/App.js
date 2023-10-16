import '../App/App.css';
import Logo from '../Logo/Logo';
import MyTab from '../MyTab/MyTab';
import TicketsList from '../TicketsList/TicketsList';
import TicketsFilter from '../TicketsFilter/TicketsFilter';

import store from '../redux/store';

function App() {
  return (
    <div className="App">
      <Logo />
      <div className='ticketsContent'>
        <TicketsFilter store={store} />
        <MyTab>
          <TicketsList />
        </MyTab>
      </div>

    </div>
  );
}

export default App;
