import {useState} from "react";
import {register} from "../../services/AuthService.js";
import {useNavigate} from "react-router-dom";

const Register = ({modalType, login}) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        role: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        try {
            if (formData.password !== formData.repeatPassword) {
                setError("Passwords don't match");
                return;
            } else if (formData.password.length <= 8) {
                setError("Password must be at least 8 characters long");
                return;
            }
            const data = await register(formData.username, formData.email, formData.password, formData.role);
            const loggedUser = await login(formData.email, formData.password);
            console.log("USER:",loggedUser)
            console.log("DATA", data)
            if (loggedUser.role === "BUSINESS_OWNER") {
                navigate("/business/dashboard")
            } else if (loggedUser.role === "CUSTOMER") {
                navigate("/dashboard")
            }
        } catch (err) {
            if (err.response?.status === 409) {
                setError("This email already exists");
            }
            console.log(err.response)
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
                    type="text"
                    name="username"
                    required
                    placeholder="Username"
                    onChange={(e) => handleOnChange(e)}
                    value={formData.username}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
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
                    required
                    placeholder="Password"
                    onChange={(e) => handleOnChange(e)}
                    value={formData.password}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    name="repeatPassword"
                    required
                    placeholder="Repeat Password"
                    onChange={(e) => handleOnChange(e)}
                    value={formData.repeatPassword}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <select className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
                        name="role"
                        onChange={(e) => handleOnChange(e)}
                        value={formData.role}
                >
                    <option value="" disabled>You are</option>
                    <option>BUSINESS_OWNER</option>
                    <option>CUSTOMER</option>
                </select>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
                {modalType === "login" ? "Login" : "Create Account"}
            </button>

        </form>
    )
}
export default Register;