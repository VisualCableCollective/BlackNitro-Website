export class HttpRequestUtil {
    static Request = async (endpoint, method = "GET", authToken = "", body = null) => {
        if (authToken === "") {
            authToken = localStorage.getItem("accessToken");
        }

        if (method === "DELETE") {
            method = "POST";
            body = JSON.stringify({
                "_method": "DELETE"
            });
        }

        return await fetch("http://localhost:8000/" + endpoint, {
            body,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + authToken,
                Accept: 'application/json'
            },
            method
        });
    }
}