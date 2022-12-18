import React from "react";
import { initializeApp } from "firebase/app"
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const Login = () => {

    const navigate = useNavigate();

    const signInWithGoogle = () => {
        const firebaseConfig = {
            apiKey: "AIzaSyDo2ZQnpyP_K4Em2F4B3Gt06LWlWDydTQ0",
            authDomain: "fir-337c6.firebaseapp.com",
            projectId: "fir-337c6",
            storageBucket: "fir-337c6.appspot.com",
            messagingSenderId: "246295619382",
            appId: "1:246295619382:web:96ff7d93a7e3981fabf597",
            measurementId: "G-CSVY9JXFQH"
        };
        // Initialize Firebase
        const app = initializeApp(firebaseConfig)

        const auth = getAuth(app)

        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)
            .then(result => {
                if (result?._tokenResponse.emailVerified) {
                    typeof sessionStorage !== `undefined` &&
                        sessionStorage.setItem("userData", JSON.stringify(result._tokenResponse))
                    navigate("/Products");
                }
            })
            .catch(error => {
                console.log("error", error);
            })
    }
    return (
        <Container maxWidth="sm" sx={{
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: '100vh'
        }}>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    my: 3,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'BLUE',
                    textDecoration: 'none',
                }}
            >
                STARWARS PORTAL LOGIN
            </Typography>
            <Button variant="contained" onClick={signInWithGoogle} startIcon={<GoogleIcon />}>
                Login With Google
            </Button>
        </Container>
    )
}

export default Login;