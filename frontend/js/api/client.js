const BASE_URL = "http://127.0.0.1:8000"

export async function getHealth(){
    try{
        const response = await fetch(BASE_URL+"/health");
        if(response.ok){
            return response.json();
        }
        else{
            throw new Error(`Error fetching health status: ${response.status}`);
        }
    }
    catch(error){
        throw error;
    }
}