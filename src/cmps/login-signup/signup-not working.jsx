// import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


export const SignUp = ({ setIsLogin }) => {
    const theme = createTheme()

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        })
    }

    const FirstNameField = () => {
        (
            <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
            />
        )
    }

    const LastNameField = () => {
        (
            <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
            />
        )
    }

    const EmailField = () => {
        (
            <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
            />
        )
    }

    const openLogin = () => {
        setIsLogin(true)
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Form>
                            <Formik
                                initialValues={{
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={values => {
                                    console.log(values)
                                }}>
                                {({ errors, touched }) => (
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Field as={FirstNameField} name="firstName" />
                                            {errors.firstName && touched.firstName ? (
                                                <div>{errors.firstName}</div>
                                            ) : null}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field as={LastNameField} name="lastName" />
                                            {errors.lastName && touched.lastName ? (
                                                <div>{errors.lastName}</div>
                                            ) : null}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field as={EmailField} name="email" type="email" />
                                            {errors.email && touched.email ? <div>{errors.email}</div> : null}
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}>
                                            Sign Up
                                        </Button>
                                    </Grid>
                                )}
                            </Formik>
                        </Form>
                        {/* <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <button onClick={openLogin} variant="body2">
                                    Already have an account? Sign in
                                </button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
                    {'Copyright © '}
                    <Link color="inherit" href="https://mui.com/">
                        Your Website
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </ThemeProvider >
    )
}