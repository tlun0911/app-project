import React, { useState, useEffect } from 'react';
import "../assets/style.css";
import "../assets/bootstrap.min.css";
import "./MealList.css";
import Header from '../Header/Header';

const MealList = () =>{

    const [mealList, setMealList] = useState([]);

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
                <th>Meal Type</th>
                <th>Ingredients</th>
            </tr>
            {mealList.map(meal => (
                <tr>
                    <td>{meal['name']}</td>
                    <td>{meal['type']}</td>
                    <td>
                        <a className="btn btn-outline-primary link-opacity-100" href={'/meal/'+meal['id']} role="button">Meal Ingredients</a>
                    </td>
                </tr>
            ))}
        </table>



    </div>
);

};

export default MealList