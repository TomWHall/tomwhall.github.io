const Logger = {
    log(...args) {
        if (console) {
            console.log(...args);
        }
    }
};
export default Logger;
