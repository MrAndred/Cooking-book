import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import { Dishes } from "./components/Dishes/Dishes";
import { Products } from "./components/Products/Products";
import { Recipes } from "./components/Recipes/Recipes";
import { ProductTypes } from "./components/Product-types/ProductTypes";
import { Countries } from "./components/Countries/Countries";
import { DishTypes } from "./components/Dish-types/DishTypes";
import { Hashtags } from "./components/Hashtag/Hashtags";

function App() {
  return (
    <div className="App">

      <Router>
        <div style={{
          display: "flex",
          background: 'grey',
          padding: '5px 0 5px 5px',
          fontSize: '20px'
        }}>
          <div style={{ margin: '10px' }}>
            <NavLink to="/recipes" style={({ isActive }) => ({
              color: isActive ? 'yellow' : 'black'
            })}>
              Recipes
            </NavLink>
          </div>

          <div style={{ margin: '10px' }}>
            <NavLink to="/dishes" style={({ isActive }) => ({
              color: isActive ? 'yellow' : 'black'
            })}>
              Dishes
            </NavLink>
          </div>

          <div style={{ margin: '10px' }}>
            <NavLink to="/products" style={({ isActive }) => ({
              color: isActive ? 'yellow' : 'black'
            })}>
              Products
            </NavLink>
          </div>

          <div style={{ margin: '10px' }}>
            <NavLink to="/product-types" style={({ isActive }) => ({
              color: isActive ? 'yellow' : 'black'
            })}>
              Product Types
            </NavLink>
          </div>

          <div style={{ margin: '10px' }}>
            <NavLink to="/countries" style={({ isActive }) => ({
              color: isActive ? 'yellow' : 'black'
            })}>
              Countries
            </NavLink>
          </div>

          <div style={{ margin: '10px' }}>
            <NavLink to="/cooking" style={({ isActive }) => ({
              color: isActive ? 'yellow' : 'black'
            })}>
              Hashtags
            </NavLink>
          </div>

          <div style={{ margin: '10px' }}>
            <NavLink to="/dish-types" style={({ isActive }) => ({
              color: isActive ? 'yellow' : 'black'
            })}>
              Dish Types
            </NavLink>
          </div>
        </div>
        <Routes>
          <Route exac path="/recipes" element={<Recipes />} />
          <Route exac path="/dishes" element={<Dishes />} />
          <Route exac path="/products" element={<Products />} />
          <Route exac path="/product-types" element={<ProductTypes />} />
          <Route exac path="/dish-types" element={<DishTypes />} />
          <Route exac path="/cooking" element={<Hashtags />} />
          <Route exac path="/countries" element={<Countries />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
