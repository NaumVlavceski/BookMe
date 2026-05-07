import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Login = ({modalType,login}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const [error, setError] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const loggedUser = await login(formData.email, formData.password)
            if (loggedUser.role === "BUSINESS_OWNER"){
                await navigate("/business/dashboard");
            }else if (loggedUser.role === "CUSTOMER"){
                navigate("/dashboard")
            }
        }catch (e){
            if (e.response?.status === 401){
                setError("Email or password incorrect")
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div>
                    {error}
                </div>
            )}
            <div className="space-y-4">
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    onChange={(e) => handleOnChange(e)}
                    value={formData.email}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={(e) => handleOnChange(e)}
                    value={formData.password}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    {modalType === "login" ? "Login" : "Create Account"}
                </button>
                <div>
                    Forgot password? <a>click here</a>
                </div>
            </div>
        </form>
    )
}
export default Login;