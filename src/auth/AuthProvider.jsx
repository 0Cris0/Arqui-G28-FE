import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
require('dotenv').config()

const backendURL = process.env.BACKEND_URL;

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isVerifying, setIsVerifying] = useState(true);

    useEffect(() => {
        async function validateToken() {
            setIsVerifying(true);
            if (token) {
                try {
                    const response = await axios.get(`${backendURL}/validate-token`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.status == 200) {
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                        setToken(null);
                    }

                } catch (error) {
                    console.error("Error validating token:", error);
                    setIsAuthenticated(false);
                    setToken(null);
                }

            } else {
                setIsAuthenticated(false);
            }
            setIsVerifying(false);
        }

        validateToken();

        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    function logout() {
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, setToken, logout, isAuthenticated, isVerifying }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;