import './App.css';
import RegisterPanel from "./components/Register/Register";
import Home from './components/Home/Home';
import { Routes, Route } from "react-router-dom";
import LoginPanel from "./components/Login/Login";
import MealList from './components/Meals/MealList';
import NewMeal from './components/Meals/NewMeal';

function App() {
  return (
    <Routes>
    <Route path='/register' element={<RegisterPanel />} />
    <Route path='' element={ <Home />} />
    <Route path='/login' element={ <LoginPanel />} />
    <Route path='/logout' element={ <Home /> } />
    <Route path='/meal_list' element={ <MealList />} />
    <Route path='/new_meal' element={ <NewMeal /> } />


    </Routes>
  );
}

export default App;
