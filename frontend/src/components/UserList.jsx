import { useEffect, useState } from "react";

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/users"
            );

            const data = await response.json();

            if (response.ok) {
                setUsers(data.users);
            } else {
                setError(data.message || "Failed to load users");
            }

        } catch (error) {
            console.error("Error fetching users:", error);
            setError("Unable to connect to the server");

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>

            <h1>Registered Users</h1>

            {users.length === 0 ? (
                <p>No users registered yet.</p>
            ) : (
                <table className="users-table">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>State</th>
                        </tr>
                    </thead>

                    <tbody>

                        {users.map((user) => (
                            <tr key={user._id}>

                                <td>{user.name}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td>{user.city}</td>
                                <td>{user.state}</td>

                            </tr>
                        ))}

                    </tbody>

                </table>
            )}

        </div>
    );
}

export default UserList;