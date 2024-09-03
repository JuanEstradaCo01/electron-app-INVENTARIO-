function useState(initialValue) {
    let state = initialValue;

    function setState(newValue) {
        state = newValue;
    }

    function getState() {
        return state;
    }

    return [getState, setState];
}

export default useState;