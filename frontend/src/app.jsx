import { useState } from "react";
import UserList from "./components/UserList";
import "./App.css";

function App() {
    const [page, setPage] = useState("register");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        city: "",
        state: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        try {
            const response = await fetch(
                "http://localhost:5000/api/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage("Registration successful!");

                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    city: "",
                    state: ""
                });

                console.log(data);
            } else {
                setError(data.message || "Registration failed");
            }

        } catch (error) {
            console.error("Registration failed:", error);
            setError("Unable to connect to the server");
        }
    };

    return (
        <div className="portal">

            <nav className="navbar">

                <button onClick={() => setPage("register")}>
                    Registration
                </button>

                <button onClick={() => setPage("users")}>
                    Registered Users
                </button>

            </nav>

            <main className="container">

                {page === "register" && (
                    <div className="card">

                        <h1>Registration Form</h1>

                        {message && (
                            <div className="success-message">
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label>Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email ID</label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>City</label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>State</label>

                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="register-button"
                            >
                                Register
                            </button>

                        </form>

                    </div>
                )}

                {page === "users" && (
                    <div className="card">
                        <UserList />
                    </div>
                )}

            </main>

        </div>
    );
}

export default App;