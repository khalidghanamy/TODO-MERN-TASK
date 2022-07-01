const wrapper = (fn) => {
    try {
        fn();

    } catch (error) {
        next(error);
        
    }
}