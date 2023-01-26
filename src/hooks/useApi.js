const apiURL=process.env.REACT_APP_API_URL;
export const useApi = (props) => {
    const urls={
        getProviders:apiURL+"/Provider/GetAll",
        getProductsSold:apiURL+"/Provider/GetProductsSoldByProvider",
        postProvider:apiURL+"/Provider/new",

    }
    return urls;
}