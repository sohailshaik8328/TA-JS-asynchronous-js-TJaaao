(function () {
    let ul = document.querySelector('ul');
    let select = document.querySelector('select');
    let errorMessage = document.querySelector('.error_message');
    let main = document.querySelector('.main');
    let allNews = [];

function handleError(message = "Something went wrong!") {
    main.style.display = "none";
    errorMessage.style.display = "block";
    errorMessage.innerText = message;
}

function handleSpinner(status = false) {
    if(status) {
        ul.innerHTML = `<div class="spinner center"><div class="donut"></div></div>`;
    }
}

let data = fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=30`);

function displayUI(newsData) {
    ul.innerHTML = "";
    newsData.forEach((news) => {
        let li = document.createElement('li');
        li.classList.add("card");
        li.classList.add('flex')

        let img = document.createElement('img');
        img.src = news.imageUrl;

        let div = document.createElement('div');
        div.classList.add('card_data')

        let source = document.createElement('p');
        source.innerText = news.newsSite
        source.classList.add('source');

        let title = document.createElement('h2');
        title.innerText = news.title;

        let readMoreBtn = document.createElement('a');
        readMoreBtn.innerText = `Read More`;
        readMoreBtn.href = news.url;

        div.append(source, title, readMoreBtn);

        li.append(img, div);
        ul.append(li);
    })
}


function displayOptionsUI(sources) {
    sources.forEach((source) => {
        let option = document.createElement('option');
        option.innerText = source;
        option.value = source;
        select.append(option)

    })
}


function init() {
    handleSpinner(true);
    data
    .then((res) => {
        if(res.ok) {
            return res.json();
        } else {
            throw new Error("response is not OK!")
        } 
    })
    .then((result) => {
        handleSpinner();
        allNews = result;
        displayUI(result);
        let allSources = Array.from(new Set(result.map(n => n.newsSite)));
        console.log(allSources);
        displayOptionsUI(allSources);
    })
    .catch((error) => {
        handleError(error);
    })
    .finally(() => handleSpinner());
}

select.addEventListener('change', (event) => {
    let source = event.target.value.trim();
    let filteredNews;
    if(source) {
        filteredNews = allNews.filter((news) => news.newSite === source);
    } else {
        filteredNews = allNews
    }
    displayUI(filteredNews); 
});


if(navigator.onLine) {
    init();
} else {
    handleError("Check your internet connection! ❌")
}
})();