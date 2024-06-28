import axios from "axios";

export const commonRequest = async (method, url, body, reqHeader) => {
    let config = {
        method,
        url,
        data: body,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
    }
    return await axios(config)
        .then(res => {
            return res
        })
        .catch(res => {
            return res
        })
}

