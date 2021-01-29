import React, {useState, useEffect} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

const Ingredients = () => {
    const [userIngredients, setUserIngredients] = useState([]);

    // useEffect acts like componentDidUpdate.
    // It runs the function after every component update (re-render).
    // But you can change how often it gets re-run using the second input.
    // with [] as second argument, useEffect acts like componentDidMount.
    // It runs only once after the first render
    useEffect(() => {
        fetch('https://react-hooks-update-948aa-default-rtdb.firebaseio.com/ingredients.json').then(response => {
            return response.json();
        }).then(responseData => {
            const loadedIngredients = [];
            for (const key in responseData) {
                loadedIngredients.push({
                    id: key,
                    title: responseData[key].title,
                    amount: responseData[key].amount
                });
            }
            setUserIngredients(loadedIngredients);
        });
    }, []);

    const addIngredientHandler = ingredient => {
        fetch('https://react-hooks-update-948aa-default-rtdb.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            return response.json();
        }).then(responseData => {
            setUserIngredients(prevIngredients => [...prevIngredients, { id: responseData.name, ...ingredient}]);
        });
    };

    const removeIngredientHandler = id => {
      setUserIngredients(prevIngredients => prevIngredients.filter(ig => ig.id !== id))
    };

    return (
        <div className="App">
            <IngredientForm onAddIngredient={addIngredientHandler}/>

            <section>
                <Search/>
                <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
            </section>
        </div>
    );
}

export default Ingredients;
