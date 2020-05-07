export default (value, type) => {
    const date = new Date(value);
    if (type === 'date') {
        return date.toLocaleDateString();
    } else if(type === 'time') {
        return date.toLocaleTimeString();
    } else {
        return new Date(value).toLocaleString();
    }
};