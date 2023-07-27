function format(queryString){
    let result = queryString.split(" ");

    result = result.join("%20");

    return result;
}

export default format;