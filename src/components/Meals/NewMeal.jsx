import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';

const NewMeal = () => {

    const [newMeal, setNewMeal] = useState('');
    const [mealType, setMealType] = useState('');
    const [mealList, setMealList] = useState([]);
    
    const append_meals = () => {
        let temp_list = [newMeal, mealType];
        setMealList(mealList => [...mealList, temp_list]);

    };

    const submit_meals = async () => {

        let submit_url = window.location.origin+"/api/submit_meals/";

        const res = await fetch(submit_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mealList),
        });

        const json = await res.json();
        if (json.status === '201'){
            alert("Meals submitted sucsessfully!");
            window.location.assign('/meal_list/');
        } else if (json.error){
            alert(json.error.value);
        }


    };

return(
    <div style={{margin:"20px"}}>
            <Header />
            <div className="new_meal_panel" style={{marginTop:"10px"}}>
                <div>
                    <label className="input_field">New Meal </label>
                    <input type="text"  name="new_meal" placeholder="New Meal" className="input_field" onChange={(e) => setNewMeal(e.target.value)}/>
                </div>
                <div>
                <select className="form-select" aria-label="Default select example" onChange={(e) => setMealType(e.target.value)}>
                    <option selected>Select Type of Meal</option>
                    <option value="BREAKFAST">Breakfast</option>
                    <option value="LUNCH">Lunch</option>
                    <option value="DINNER">Dinner</option>
                    <option value="SNACK">Snack</option>
                </select>            
                </div>
                <div>
                    <button className="btn btn-primary" type="submit" onClick={append_meals}>Add Meal</button>
                </div>
                </div>
            <table className='table'>
                <tr>
                    <th>Meal</th>
                    <th>Meal Type</th>
                </tr>
                    {mealList.map(meal => (
                <tr>
                    <td>{meal[0]}</td>
                    <td>{meal[1]}</td>
                </tr>
                    ))}
                </table>
                <button className="btn btn-primary" type="submit" onClick={submit_meals}>Save New Meals</button>
          </div>
);

}

export default NewMeal