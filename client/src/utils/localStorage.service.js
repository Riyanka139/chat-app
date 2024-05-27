export const setLocalStroage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const getLocalStroage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const removeLocalStroage = (key) => {
    localStorage.removeItem(key);
}