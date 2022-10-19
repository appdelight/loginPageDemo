

 export const setLocalStorage = (key, value) => {
    return localStorage.setItem(key, value);
}



export const getLocalStorage = (key) => {
    return localStorage.getItem(key);
}

export const clearLocalStorage = () => {
    return localStorage.clear()
}


export const removeLocalStorageKey = (key) => {
    return localStorage.removeItem(key)
}


