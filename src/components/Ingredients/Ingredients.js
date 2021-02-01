import React, {useState, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

const Ingredients = () => {
    const [userIngredients, setUserIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // useCallback: return a memoized version of the callback function that only changes if one of the dependencies has changed,
    // or else it will return a cached version
    // it is helpful to prevent unnecessary renders.
    const filteredIngredientsHandler = useCallback(filteredIngredients => {
        setUserIngredients(filteredIngredients);
    }, [setUserIngredients]);

    const addIngredientHandler = ingredient => {
        setIsLoading(true);
        fetch('https://react-hooks-update-948aa-default-rtdb.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            setIsLoading(false);
            return response.json();
        }).then(responseData => {
            setUserIngredients(prevIngredients => [...prevIngredients, {id: responseData.name, ...ingredient}]);
        });
    };

    const removeIngredientHandler = id => {
        setIsLoading(true);
        fetch(`https://react-hooks-update-948aa-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
            method: 'DELETE'
        }).then(response => {
            setIsLoading(false);
            setUserIngredients(prevIngredients => prevIngredients.filter(ig => ig.id !== id))
        });
    };

    return (
        <div className="App">
            <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading}/>

            <section>
                <Search onLoadIngredients={filteredIngredientsHandler}/>
                <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
            </section>
        </div>
    );
}

export default Ingredients;
