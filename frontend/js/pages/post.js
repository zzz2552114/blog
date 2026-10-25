import { GetPost } from "../api/client.js";

let post;
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
if (!Number.isInteger(id) || id <= 0) {
    alert("缺少文章id")
} else {
    post = await GetPost(id);
}


const post_title = document.createElement("h1");
const post_content = document.createElement("p");
const post_summary = document.createElement("p");
const link = document.createElement("a");
const post_container = document.getElementById("post-container");
if (post == null) {
    post_title.textContent = "文章不存在";
    post_content.textContent = "";
    post_summary.textContent = "";
} else {
    post_title.textContent = post.title;
    post_content.textContent = post.content_md;
    post_summary.textContent = post.summary;
    link.href = "index.html?skip=0&limit=3";
    link.textContent = "返回文章列表";
}
post_container.appendChild(post_title);
post_container.appendChild(post_summary);
post_container.appendChild(post_content);
post_container.appendChild(link);
