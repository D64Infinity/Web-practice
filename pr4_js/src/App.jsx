import './CSS/App.css'
import tanks from './tanksData.js'
import Table from './components/Table.jsx';


function App() {
    return (
        <div className='App'>
            <h3>Танки Победы</h3>
            <Table data={ tanks } amountRows="15" enablePages="true" />
        </div>
    );
}

export default App;
