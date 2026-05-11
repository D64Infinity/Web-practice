import { useState } from 'react';
import './css/App.css'
import buildings from './data.js'
import Table from './components/Table.jsx';
import Chart from './components/Chart.jsx';


function App() {
    const [filteredData, setFilteredData] = useState(buildings);

    return (
        <div className='App'>
            <h3>Самые высокие здания и сооружения</h3>
            <Chart data={ filteredData } />
            <Table data={ filteredData } fullData={ buildings } onFilter={ setFilteredData } amountRows="15" enablePages="true" />
        </div>
    );
}

export default App;
