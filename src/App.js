import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setCartItems, setTotalPrice } from "./redux/slices/drawerSlice";
import { setItems } from "./redux/slices/tiresSlice";
import { setFavoriteItems } from "./redux/slices/tiresSlice";

import Header from "./components/Header";
import { Home } from "./pages/Home";
import { Footer } from "./components/Footer";
import { Drawer } from "./components/Drawer";
import "./scss/app.scss";
import { Card } from "./pages/Card";
import { Favorite } from "./pages/Favorite";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import LoginDialog from "./components/LoginDialog";

function App() {
  const { authToken } = useSelector((state) => state.loginSlice);
  const { items } = useSelector((state) => state.tiresSlice);
  const { cartItems } = useSelector((state) => state.drawerSlice);

  const dispatch = useDispatch();

  React.useEffect(() => {
    async function fetchData() {
      try {

        if( authToken.length !== 0 ) {
          const [cartItemsResponse, favItemsResponse] = await Promise.all([
            axios.get("http://127.0.0.1:8000/api/v1/cart/",  {
            headers: {
              "Authorization": `Token ${authToken.auth_token}`,
            }
          }),
          axios.get("http://127.0.0.1:8000/api/v1/favorites/",  {
            headers: {
              "Authorization": `Token ${authToken.auth_token}`,
            }
          })
          ]);
          const cartItems = [];
          const favItems = [];
          items.map((item) => {
            cartItemsResponse.data.map((cartItem) => {
              if (item.id === cartItem.item) {
                const count = cartItem.count;
                const cartId = cartItem.id;
                cartItems.push({cartId, count, ...item});
              }
            })
            favItemsResponse.data.map((favItem) => {
              if (item.id === favItem.item) {
                const count = favItem.count;
                const cartId = favItem.id;
                favItems.push({cartId, count, ...item});
              }
            })
          })
          dispatch(setCartItems(cartItems));
          dispatch(setFavoriteItems(favItems));
        };

        const  itemsResponse = await axios.get("http://127.0.0.1:8000/api/v1/items");
        dispatch(setItems(itemsResponse.data));
        // dispatch(setFavoriteItems(favoritesResponse.data));
        dispatch(setTotalPrice());
      } catch (error) {
        alert("Ошибка при запросе данных");
        console.error(error);
      }
    }
    fetchData();
  }, [authToken]);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<Card />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
      <Drawer />
      <Registration />
      <Login />
      <LoginDialog />
      <Footer />
    </div>
  );
}

export default App;
