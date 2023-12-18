


export const fetchData = async (url, obj = null) => {
    try {
        let responsee;
        if (!obj)
            responsee = await fetch(process.env.REACT_APP_BASE_URL + url);
        else
            responsee = await fetch(process.env.REACT_APP_BASE_URL + url, obj);
        const res = await responsee.json();
        return res.response;
    }
    catch (error) {
        return Promise.reject(error.message);
    }
}