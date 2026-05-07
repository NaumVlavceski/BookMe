import {useState} from "react";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import {useAuth} from "../../context/AuthContext.jsx";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalType, setModalType] = useState(null);

    const {user, logout, isLoggedIn,login} = useAuth();
    return (
        <>
            <header className="bg-white border-b">
                <div className="flex items-center justify-between px-6 py-4 md:px-10">
                    <div className="text-xl font-bold text-gray-800">
                        BookMe
                    </div>

                    <nav className="hidden md:flex items-center space-x-6">
                        <a href="#" className="text-gray-600 hover:text-black text-sm">
                            How it Works?
                        </a>
                    </nav>
                    {isLoggedIn ? (

                        <button onClick={() => logout()}
                                className="text-gray-600 hover:text-black text-sm">
                            Logout
                        </button>
                    ) : (
                        <div className="hidden md:flex items-center space-x-4">
                            <button onClick={() => setModalType("login")}
                                    className="text-gray-600 hover:text-black text-sm">
                                Login
                            </button>
                            <button onClick={() => setModalType("register")}
                                    className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">
                                Register
                            </button>
                        </div>
                    )}

                    <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
                        ☰
                    </button>
                </div>

                {menuOpen && (
                    <div className="px-6 pb-4 md:hidden">
                        <button onClick={() => setModalType("login")} className="block py-2 text-gray-600">
                            Login
                        </button>
                        <button onClick={() => setModalType("register")}
                                className="block py-2 text-blue-500 font-medium">
                            Register
                        </button>
                    </div>
                )}
            </header>

            {/* Modal */}
            {modalType && (
                <div
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            setModalType(null);
                        }
                    }}
                    className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
                    >

                        {/* Tabs */}
                        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setModalType("login")}
                                className={`flex-1 py-2 text-sm rounded-md transition ${
                                    modalType === "login"
                                        ? "bg-white shadow font-medium"
                                        : "text-gray-500"
                                }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setModalType("register")}
                                className={`flex-1 py-2 text-sm rounded-md transition ${
                                    modalType === "register"
                                        ? "bg-white shadow font-medium"
                                        : "text-gray-500"
                                }`}
                            >
                                Register
                            </button>
                        </div>

                        {modalType === "register" ?
                            <Register modalType={modalType} login={login} user={user}/>
                            :
                            <Login modalType={modalType} login={login} user={user}/>}
                    </div>
                </div>
            )}
        </>
    );
}