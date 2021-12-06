import BrokerLogin from "./broker/broker-login";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import './broker/css/styles.css'
import Admin from "./broker/admin";
import Nav from "./broker/nav";

function App() {

    return (
        <div className="app">
            <Nav>
            </Nav>
            <BrowserRouter>
                <Routes>
                    <Route path="/exchange" element={<BrokerLogin/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
