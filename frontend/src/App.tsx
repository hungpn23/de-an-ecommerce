import { Routes, Route } from 'react-router-dom';
import { About, Cart, Collection, Contact, Home, Login, Order, PlaceOrder, Product } from './pages';
import { Footer, Navbar, SearchBar } from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="collection" element={<Collection />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="product/:productId" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="place-order" element={<PlaceOrder />} />
        <Route path="order" element={<Order />} />
      </Routes>
      <Footer />
    </div>
  );
}
