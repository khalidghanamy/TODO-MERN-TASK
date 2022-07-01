import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTask from './Components/AddTask.jsx';
import Tasks from './Pages/Tasks';
function App() {
  return (
    <>
    <div className="App">
    <div className="container p-0 m-0">
      <div className="row mt-5 p-0 m-0">
          <div className="col-lg-8 col-md-8 col-ms-12 d-flex justify-content-md-center p-0 m-0 ">
          <AddTask />
          </div>
        <div className="col-lg-4 col-md-4 col-ms-12">
          <Tasks />
          </div>
        </div>          
    </div>
    </div>
    </>
  );
}

export default App;
