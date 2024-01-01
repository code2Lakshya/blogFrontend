import { useState } from "react"



export const useFetch = (other = false) => {

    const [data, setData] = useState(null);
    const [loader, setLoader] = useState(false);
    const [similarPosts, setSimilarPosts] = useState(null);

    const fetchResponse = async (url, obj = null, page = 0, skip = 0) => {
        try {
            let fetchurl = process.env.REACT_APP_BASE_URL + url;
            if (page)
                fetchurl += `&page=${page}`;
            if (skip)
                fetchurl += `&skip=${skip}`;
            setLoader(true);
            let response;
            if (obj)
                response = await fetch(fetchurl, obj);
            else
                response = await fetch(fetchurl);
            const res = await response.json();
            if (!res.success)
                throw new Error(res.message);
            if (other) {
                setData(res?.response.post);
                setSimilarPosts(res?.response?.similar_posts);
            }
            else {
                setData(res.response);
            }
            setLoader(false);
        }
        catch (error) {
            setLoader(false);
            console.log(error.message);
            return;
        }
    }

    return { data, setData, loader, setLoader, fetchResponse, similarPosts, setSimilarPosts };

}