const axiosGetHeader = () => {
    let headers = {
        'Content-Type': 'application/json'
    }
    return headers;
}

module.exports = {
    axiosGetHeader
}