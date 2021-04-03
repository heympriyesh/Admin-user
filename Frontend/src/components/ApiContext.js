import React, { useState, createContext } from 'react';

export const ApiContext = createContext();


export const ApiProvider = (props) => {
    const [truevalue, settruevalue] = useState(false);
    const [isAuth,setIsAuth]=useState(true);
    const [drop, setDrop]=useState();
    return (
        <ApiContext.Provider value={{ truevalue, settruevalue, isAuth, setIsAuth,drop,setDrop}}>
            {props.children}
        </ApiContext.Provider>
    )
}