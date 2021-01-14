import './App.css';
import RepoTable from './components/repoTable/RepoTable.js';

function App() {
  return (
    <div className="App">
    <h1 className="Header">My GitHub Repos</h1>
    <div className="Table">
    <RepoTable />
    </div>
    </div>
    );
  }
  
  export default App;
  