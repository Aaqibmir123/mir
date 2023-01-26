import {Container, Navbar} from 'react-bootstrap';
import React, { Suspense } from 'react';
import "./App.css"
import { NavLink, Redirect, Route,Switch,} from 'react-router-dom';
import { useContext, useState ,useEffect} from 'react';
 import { LoginContext } from './LoginPages/LoginContext'; 
const CartProvider=React.lazy(()=>import('./Store/CartProvider'))
 const ProductDetails=React.lazy(()=>import('./Sharp/ProductDetails'));
 const Products=React.lazy(()=>import('./Sharp/Products'));
 const Cart=React.lazy(()=>import('./Cart/Cart'));
 const CartBtn=React.lazy(()=>import('./Cart/CartBtn'))
 const AboutComp=React.lazy(()=>import('./About/AboutComp'));
const Home=React.lazy(()=>import('./Home/Home'));
const Contact=React.lazy(()=>import( './Contact_us/Contact'));
const Login =React.lazy(()=>import('./LoginPages/Login'));
const Logout=React.lazy(()=>import('./LoginPages/LOgout'))

function App() {
  const[state,setState]=useState(false)
  const ctx=useContext(LoginContext);
  
 
  return (<>
      <CartProvider >
    <Navbar bg="dark" expand="lg">

     <Container>
       
      <NavLink to="/Home/home.js"  >Home</NavLink>
       
         {/* <NavLink to="/Sharp/products">Store </NavLink> */}
          {/* <NavLink to="/About/aboutcomp">about </NavLink> */}
             <NavLink to="/Contact_us/Contact" >Contact Us </NavLink>
             <NavLink to="/LoginPages/Login">Login</NavLink>
             {ctx.isLoggedIn && <NavLink to='/LoginPages/LOgout' >Logout</NavLink> }
        
         
         
        <Navbar href="#"><CartBtn onClick={()=>setState(true)}></CartBtn>  </Navbar>
      </Container>

    </Navbar>
      <Suspense fallback={<h1 style={{textAlign:"Center",fontWeight:"bold",margin:"30%"}}>Loading... 🚗 </h1>} >
     {state && <Cart onClose={()=>setState(false)}/>}
    
     
          <Switch>
          

            <Route path='/Sharp/products' exact>
            
            {ctx.isLoggedIn &&    <Products />}
            {!ctx.isLoggedIn &&  <Redirect to="/LoginPages/Login" />}
      
     
        
           </Route> 


            <Route path="/"  exact> <Home /> </Route>
             <Route path="/Home/home.js"  exact> <Home /> </Route> 
     
           <Route path="/About/aboutcomp" exact>  <AboutComp/>  </Route> 
     
   
    <Route path='/Contact_us/Contact' exact><Contact /></Route>
     <Route path='/Sharp/products/:productId' > <ProductDetails /> </Route>
     
    
  
    <Route path='/LoginPages/Login' exact><Login /></Route>
    <Route path='/LoginPages/LOgout' exact><Logout /> </Route>
   
     
    </Switch>
    </Suspense>
      </CartProvider>
  
     </>
      
    
  );
}

export default App;


