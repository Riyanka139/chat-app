const baseUrl = "http://localhost:5000/api";

export const postRequest = async (url,body) => {
    body = JSON.stringify(body);
    
    const res = await fetch(`${baseUrl}${url}`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body
    });

    const data = await res.json();

    if(!res.ok){
       const message = data?.message ? data.message : data;

       return {error: true, message};
    }

    return data;
}

export const getRequest = async (url) => {
    try {
        const res = await fetch(`${baseUrl}${url}`);
    const data = await res.json();

    if(!res.ok){
       const message = data?.message ? data.message : 'An error occured...';

       return {error: true, message};
    }

    return data;
    } catch (error) {
        console.log(error,"err");
        const message ='An error occured...';

       return {error: true, message};
    }
    
}