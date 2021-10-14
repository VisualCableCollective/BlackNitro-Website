export async function EnsureUserIsAuthenticated(req) {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
        return {
            success: false,
            action: {
                redirect: {
                    destination: '/',
                },
            }
        }
    }else{
        const res = await fetch("http://localhost:8000/api/user", {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
            method: 'GET'
        });

        if (res.status !== 200) {
            return {
                success: false,
                action: {
                    redirect: {
                        destination: '/',
                    },
                }
            }
        }

        const resJson = await res.json();

        if (!resJson.id) {
            return {
                success: false,
                action: {
                    redirect: {
                        destination: '/',
                    },
                }
            }
        }
    }

    return {
        success: true,
    }
}