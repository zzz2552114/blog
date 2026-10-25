import {GetHealth,ListPosts} from "../api/client.js"
const health_line = document.getElementById("health_line")
const health_btn = document.getElementById("health_button")


health_btn.addEventListener("click",async function(){
    try {
        const response = await GetHealth();
        health_line.innerHTML = `status : ok<br>time : ${response.time}`;
    }
    catch (error) {
        health_line.textContent = `backend connect error : ${error}`
    }
})

let skip = 0;
let limit = 3;
let Posts;
const params = new URLSearchParams(window.location.search);
skip = params.get("skip") || skip;
limit = params.get("limit") || limit;
skip = Number(skip),limit = Number(limit);
if(!Number.isInteger(skip) || skip < 0 || !Number.isInteger(limit) || limit <= 0){
    console.log("Invalid");
}
else{
    Posts = await ListPosts(skip,limit);
}


const ul = document.getElementById("list");
ul.innerHTML = "";
if (Posts.length === 0) {
    ul.innerHTML = "<li>暂无数据</li>";
}else{
    for ( const post of Posts){
        const li = document.createElement("li");
        li.innerHTML = post.title + "<br>" + `<a href="post.html?id=${post.id}">查看详情</a>` + "<br>" + post.summary + "<br>" + post.published_at + "<br>";
        ul.append(li);
    }
}

const next = document.createElement("a");
const prev = document.createElement("a");

next.href = `index.html?skip=${skip+limit}&limit=${limit}`;
prev.href = `index.html?skip=${Math.max(skip-limit,0)}&limit=${limit}`;
next.textContent = "下一页";
prev.textContent = "上一页";
if (skip === 0) {
    prev.style.display = "none";
}
if (Posts.length < limit) {
    next.style.display = "none";
}
const page = document.getElementById("page");
page.appendChild(prev);
page.appendChild(next);
