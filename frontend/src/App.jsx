import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import BusinessDashboard from "./pages/BusinessDashboard.jsx";
import {useAuth} from "./context/AuthContext.jsx";
import BusinessEdit from "./pages/BusinessEdit.jsx";
import BusinessOwnerRoute from "./context/ProtectedRoute.jsx";

function App() {
    const {user} = useAuth();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route element={<BusinessOwnerRoute user={user} />}>
                    <Route path="/business/dashboard" element={<BusinessDashboard />} />
                    <Route path="/business/edit"      element={<BusinessEdit />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
