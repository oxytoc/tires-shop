import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
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

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartItemsResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get("http://localhost:4000/cart"),
            axios.get("http://localhost:4000/favorite"),
            axios.get("http://127.0.0.1:8000/api/v1/items"),
            // axios.get("http://127.0.0.1:8000/api/v1/items"),
          ]);
        // setIsLoading(false);
        dispatch(setCartItems(cartItemsResponse.data));
        dispatch(setItems(itemsResponse.data));
        dispatch(setFavoriteItems(favoritesResponse.data));
        dispatch(setTotalPrice());
        // console.log(items.data, itemsResponse.data);
        // setCartItems(cartItemsResponse.data);
        // setFavorites(favoritesResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных");
        console.error(error);
      }
    }
    fetchData();
  }, []);

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
      <Footer />
    </div>
  );
}

export default App;
