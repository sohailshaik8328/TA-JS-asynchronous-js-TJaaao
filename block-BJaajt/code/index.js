let profile_pic = document.querySelector('.profile_pic');
let username = document.querySelector('.username');
let profile_link = document.querySelector('.profile_link');
let followers_img_ul = document.querySelector(".followers_img_ul");
let following_img_ul = document.querySelector(".following_img_ul");
let input = document.querySelector('input');
let cat_img = document.querySelector('.cat_img');
let btn = document.querySelector('.btn');

function createUI(data) {
    profile_pic.src = data.avatar_url;
    username.innerHTML = data.name;
    profile_link.innerHTML = `@${data.login}`;
    let followers_url = data.followers_url;
    console.log(followers_url);
    let xhr = new XMLHttpRequest();
    xhr.open("GET", followers_url);
    xhr.onload = function() {
        let followers_url_data = JSON.parse(xhr.response);
        followers_url_data.forEach((elm) => {
            let img = document.createElement('img');
            img.src = elm.avatar_url;
            img.classList.add("image")
            followers_img_ul.append(img);
        })
    }
    xhr.send();

    let following_url = data.following_url;
    console.log(following_url);
    let xhr1 = new XMLHttpRequest();
    xhr1.open("GET", following_url);
    xhr1.onload = function() {
        let following_url_data = JSON.parse(xhr1.response);
        following_url_data.forEach((elm) => {
            let img = document.createElement('img');
            img.src = elm.avatar_url;
            img.classList.add("image")
            following_img_ul.append(img);
        })
    }
}

function handleInput(event) {
    if(event.keyCode === 13) {
        let xhr = new XMLHttpRequest();
        let url = `https://api.github.com/users/${event.target.value}`;
        xhr.open("GET", url);
        xhr.onload = function() {
            let userData = JSON.parse(xhr.response);
            createUI(userData);
        }
        xhr.send();
    }
}

function handleClick(event) {
        let xhr = new XMLHttpRequest();
        let url = `https://api.unsplash.com/photos/random/?client_id=QQAJSEijlpuWwJYh3lZcwEH2gN3XeKaGZemhrv6zqzc`
        xhr.open("GET", url);
        xhr.onload = function() {
            let catData = JSON.parse(xhr.response);
            console.log(catData)
            cat_img.src = catData.urls.small;
        }
        xhr.send();
}

// QQAJSEijlpuWwJYh3lZcwEH2gN3XeKaGZemhrv6zqzc
// https://api.unsplash.com/photos/random/?client_id=QQAJSEijlpuWwJYh3lZcwEH2gN3XeKaGZemhrv6zqzc
btn.addEventListener('click', handleClick);
input.addEventListener('keyup', handleInput);
