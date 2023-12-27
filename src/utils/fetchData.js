


export const fetchData = async (url, obj = null, form = false) => {
    try {
        let output;
        if (!obj)
            output = await fetch(process.env.REACT_APP_BASE_URL + url);
        else
            output = await fetch(process.env.REACT_APP_BASE_URL + url, obj);
        const res = await output.json();
        if (!form)
            return res.response;
        else
            return res;
    }
    catch (error) {
        return Promise.reject(error.message);
    }
}