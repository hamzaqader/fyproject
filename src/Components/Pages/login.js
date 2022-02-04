import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, signInWithEmailAndPassword, onAuthStateChanged } from "../../config/firebase";
import { useNavigate } from "react-router";
import { db, get, ref, onValue } from "../../config/firebase";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = (e) => {
    // e.preventDefault();
    let obj = {
      email,
      password,
    };
    signInWithEmailAndPassword(auth, obj.email, obj.password)
      .then((succes) => {
        console.log("User Sign In Successfully ", succes);
        const refrence = ref(db, `/users/${succes.user.uid}`);

        setEmail("");
        setPassword("");
        navigate("/Home", { state: obj });
      })
      .catch((err) => {

        console.log(err.message);
      });
    console.log(obj);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/Home");
      }
    });
  }, []);

  return (

    <>
<Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box  
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5"   style={{color:"white"}}>
        ADMIN LOGIN
      </Typography>
      
      <Box noValidate sx={{ mt: 1 }}>

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          style={{backgroundColor:"white",color:"white"}}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
         
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          style={{backgroundColor:"white",color:"white"}}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
       
       <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
                type="submit"
                
                onClick={login}
              >
                Login
              </Button>
        <Grid container>
          <Grid item xs>
            
          </Grid>
          <Grid item>
           
          </Grid>
        </Grid>
      </Box>
    </Box>
   
   
  </Container>
    </>
  );
}

export default Login;
