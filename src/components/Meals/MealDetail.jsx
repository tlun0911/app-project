import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';

const MealDetail = () =>{
    const [meal, setMeal] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    let curr_url = window.location.href;
    let root_url = curr_url.substring(0,curr_url.indexOf("meal"));
    let params = useParams();
    let id = params.id;
    let meal_url = root_url+`api/meal/${id}`;

    const get_meal = async ()=>{
        const res = await fetch(meal_url, {
          method: "GET"
        });
        const retobj = await res.json();
        
        if(retobj.status == '200') {
          setMeal(retobj['meal']);
          setIngredients(retobj['ingredients']);
          console.log(meal);
          console.log(ingredients);
        }
      }

    const deleteMeal = async () =>{
        if (window.confirm('Are you sure you want to delete this meal?')) {
            const res = await fetch(meal_url, {
                method: "DELETE"
              });
              const retobj = await res.json();
              if (retobj.status = '205'){
                alert('Meal successfully deleted');
                window.location.assign(root_url+'/meal_list');
              }
              else{
                alert('Error deleting meal');
                window.location.assign('/');
              }
        }

    }

    useEffect (() =>{
        get_meal();
    }, []);


    return (
        <div>
            <Header />

            <div className="card text-bg-info mb-3">
                <div className="card-header fs-3 fw-bold">
                    {meal['name']}
                </div>
                    <ul className="list-group list-group-flush">
                        {ingredients.map(ingredient => (
                            <li className="list-group-item" key={ingredient['name']}>
                                {ingredient['name']}  -  {ingredient['quantity']} {ingredient['unit']}
                            </li>
                        ))}
                    </ul>
            </div>
            <button type="button" class="btn btn-outline-primary" onClick={deleteMeal}>Delete Meal</button>


        </div>
    );
}

export default MealDetail