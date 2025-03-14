import { useState, useEffect } from "react";

function getSavedValue(key, initialVal) {
    const savedValue = JSON.parse(localStorage.getItem(key)) //gets a value out of localStorage based on a key
    if(savedValue) return savedValue                         //if we were already used localStroage on a page and saved some info previously

    if(initialVal instanceof Function) return initialVal()   //just like useState can take in a callback function this line gets the value out of the func that is passed in
    return initialVal
}

//will work just like useState, returning an array of two things
export default function useLocalStorage(key, initialVal) {
    
    //since JSON.parse is slow we only want to do it when we first mount our component by using callback in useState
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialVal)
    })

    //now when we refresh the page the value will persist in localStorage
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value)) //localStorage only takes in strings as a value
    }, [value, key])

    return [value, setValue]
}