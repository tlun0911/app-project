import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';

const NewMeal = () => {

    const [newMeal, setNewMeal] = useState('');
    const [mealType, setMealType] = useState('');
    const [ingredients, setIngredients] = useState([[], [], [], [], []]);

    const addInputField = () => {
        setIngredients([...ingredients, '']);
      };

    const handleIngredientChange = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index][0] = event.target.value;
        setIngredients(newIngredients);
    };

    const handleQuantityChange = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index][1] = event.target.value;
        setIngredients(newIngredients);
    };

    const handleQuantityType = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index][2] = event.target.value;
        setIngredients(newIngredients);
    }

    const submit_meal = async () => {

        let submit_url = window.location.origin+"/api/submit_meals/";

        const res = await fetch(submit_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'name': newMeal,
                'type': mealType,
                'ingredients': ingredients,
            })
        });

        const json = await res.json();
        if (json.status === '201'){
            alert("Meal submitted sucsessfully!");
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
                <br/>
            </div>
            <div>
            <h1>Add Ingredients for Meal</h1>
            {ingredients.map((ingredient, index) => (
                <div key={index}>
                    <div class="input-group">
                        <span class="input-group-text">Ingredient</span>
                        <input 
                            type="text" 
                            aria-label="Ingredient" 
                            className="form-control"
                            value={ingredient[0]}
                            onChange={(event) => handleIngredientChange(index, event)}
                            placeholder={`Ingredient ${index + 1}`}
                        />
                        <input type="text" 
                            aria-label="Quantity" 
                            class="form-control"
                            value={ingredient[1]}
                            onChange={(event) => handleQuantityChange(index, event)}
                            placeholder="Quantity" 
                        />
                        <select className="form-select" aria-label="Default select example" onChange={(event) => handleQuantityType(index, event)}>
                            <option selected>Select Unit</option>
                            <option value="UNITS">units</option>
                            <option value="PKG">pkg</option>
                            <option value="LB">lb</option>
                            <option value="OZ">oz</option>
                            <option value="GAL">gal</option>
                        </select>
                    </div>
                
                </div>
            ))}
            <br/>
            <button onClick={addInputField}>Add Additional Ingredient</button>
            </div>
            <div>
                <br/>    
                <button className="btn btn-primary" type="button" onClick={submit_meal}>Save New Meal</button>
            </div>
        </div>
);

}

export default NewMeal