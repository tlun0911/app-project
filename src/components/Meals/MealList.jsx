import React, { useState, useEffect } from 'react';
import "../assets/style.css";
import "../assets/bootstrap.min.css";
import "./MealList.css";
import Header from '../Header/Header';

const MealList = () =>{

    const [mealList, setMealList] = useState([]);
    const [type, setType] = useState('ALL');

    let meal_url = "/api/meal_list/";

    const get_meals = async () =>{
        const res = await fetch(meal_url, {
            method: 'GET'
        });
        const retobj = await res.json();
        if(!retobj.error){
            let all_meals = Array.from(retobj);
            setMealList(all_meals);
        } else{
            alert("Error retrieving data")
        }     

    }


    useEffect(() =>{
        get_meals();
    }, []);


return(
    <div>
        <Header />

        <table className='table'>
            <tr className='top-row'>
                <th>Meal</th>
                <th>Meal Type
                    <select class="form-select" aria-label="Default select example" onChange={(e) => setType(e.target.value)}>
                        <option selected>Filter Meal Type</option>
                        <option value="ALL">All</option>
                        <option value="BREAKFAST">Breakfast</option>
                        <option value="LUNCH">Lunch</option>
                        <option value="DINNER">Dinner</option>
                        <option value="SNACK">Snack</option>
                    </select>
                </th>
                <th>Details</th>
            </tr>
            {mealList.map(meal => (
                (meal.type === type || type === 'ALL') ? (
                <tr>
                    <td>{meal['name']}</td>
                    <td>{meal['type']}</td>
                    <td>
                        <a className="btn btn-outline-primary link-opacity-100" href={'/meal/'+meal['id']} role="button">Meal Details</a>
                    </td>
                </tr>
                ) : null
                
            ))}
        </table>



    </div>
);

};

export default MealList