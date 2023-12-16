


export const fetchData = async (url, obj = null) => {
    try {
        let response;
        if (!obj)
            response = await fetch(process.env.REACT_APP_BASE_URL + url);
        else
            response = await fetch(process.env.REACT_APP_BASE_URL + url, obj);
        const res = await response.json();
        return res.response;
    }
    catch (error) {
        console.log(error.message);
    }
}