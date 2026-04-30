import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import Dash from "./pages/asd.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
