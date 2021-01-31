import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
    const {onLoadIngredients} = props;
    const [enteredFilter, setEnteredFilter] = useState('');
    const inputRef = useRef();

    // useEffect acts like componentDidUpdate.
    // It runs the function after every component update (re-render).
    // But you can change how often it gets re-run using the second input.
    // with [] as second argument, useEffect acts like componentDidMount.
    // It runs only once after the first render
    useEffect(() => {
        const timer = setTimeout(() => {
            // js closure. enteredFilter here contains the old value the it just stepped into setTimeout function
            if(enteredFilter === inputRef.current.value) {
                const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
                fetch('https://react-hooks-update-948aa-default-rtdb.firebaseio.com/ingredients.json' + query).then(response => {
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
                    onLoadIngredients(loadedIngredients);
                });
            }
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [enteredFilter, onLoadIngredients, inputRef]);

    return (
        <section className="search">
            <Card>
                <div className="search-input">
                    <label>Filter by Title</label>
                    <input ref={inputRef} type="text" value={enteredFilter} onChange={event => setEnteredFilter(event.target.value)}/>
                </div>
            </Card>
        </section>
    );
});

export default Search;
