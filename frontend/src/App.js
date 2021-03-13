import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Header from './components/Header'
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import { Container } from 'react-bootstrap'
const  App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/register' component={RegisterScreen} />
          <Route exact path='/profile' component={ProfileScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
