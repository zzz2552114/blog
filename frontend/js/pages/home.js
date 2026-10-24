import { getHealth } from "../api/client.js"
const health_line = document.getElementById("health_line")
const health_btn = document.getElementById("health_button")

health_btn.addEventListener("click",async function(){
    try {
        const response = await getHealth();
        health_line.innerHTML = `status : ok<br>time : ${response.time}`;
    }
    catch (error) {
        health_line.textContent = `backend connect error : ${error}`
    }
})

