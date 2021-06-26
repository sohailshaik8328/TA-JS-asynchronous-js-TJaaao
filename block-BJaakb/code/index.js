let input = document.querySelector("input");
let ul = document.querySelector('ul');
let url = `https://api.unsplash.com/photos/?client_id=O6-HgHCU6Jg_aNZvpAHOAACPMyV5RZ4RiEo5tvgg9vY`;
let searchURL = (query) => `https://api.unsplash.com/search/photos/?query=${query}&client_id=O6-HgHCU6Jg_aNZvpAHOAACPMyV5RZ4RiEo5tvgg9vY`;

function fetch(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => resolve(JSON.parse(xhr.response));
        xhr.onerror = () => reject(`Something went wrong!`);
        xhr.send();
    });
}


function displayUI(data) {
    ul.innerHTML = "";
    data.forEach((elm) => {
        let li = document.createElement('li');
        let img = document.createElement('img');
        img.src = elm.urls.thumb;
        li.append(img);
        ul.append(img);
    });
};

fetch(url).then(displayUI).catch((error) => console.log(error));


function handleInput(event) {
    if(event.keyCode === 13) {
        fetch(searchURL(input.value)).then((searchResult) => {
            displayUI(searchResult.results);
        }).catch((error) => console.log(error));
        input.value = "";
    }
}

input.addEventListener("keyup", handleInput);