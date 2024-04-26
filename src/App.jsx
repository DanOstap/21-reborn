// App.js
import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Page404 from './pages/Page404'
import SignUp from './pages/Signup'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import ItemList from './components/ItemList/ItemList'
import Login from './pages/Loginup'
import Cart from './pages/Cart/cart'
import ProductPage from './pages/ProductPage'
import { CartProvider } from '/src/utils/CartContext'
import MainPage from './pages/MainPage'

function App () {
  const [loginName, setLoginName] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  return (
    <Router>
      <CartProvider>
        <Header isLogin={isLogin} />
        <Switch>
          <Route path='/' exact>
            <MainPage />
          </Route>
          {isLogin ? (
            <Route path='/profile'>
              <Profile
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                loginName={loginName}
              />
            </Route>
          ) : (
            <Route path='/signup'>
              <SignUp
                setIsLogin={setIsLogin}
                setLoginName={setLoginName}
                loginName={loginName}
              />
            </Route>
          )}
          <Route path='/product/:id' component={ProductPage}></Route>
          <Route path='/login'>
            <Login
              setIsLogin={setIsLogin}
              setLoginName={setLoginName}
              loginName={loginName}
            />
          </Route>
          <Route path='/cart'>
            <Cart />
          </Route>
          <Route path='/*'>
            <Page404 />
          </Route>
        </Switch>
        <Footer />
      </CartProvider>
    </Router>
  )
}

export default App
