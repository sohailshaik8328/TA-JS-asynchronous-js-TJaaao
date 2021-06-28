let ul = document.querySelector('ul');
let select = document.querySelector('select');
let allNews = [];

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


data
.then(res => res.json())
.then((result) => {
    allNews = result;
    displayUI(result);
    let allSources = Array.from(new Set(result.map(n => n.newsSite)));
    console.log(allSources);
    displayOptionsUI(allSources);
})
.catch((error) => {
    ul.innerText = error;
});

select.addEventListener('change', (event) => {
    let source = event.target.value.trim();
    let filteredNews;
    if(source) {
        filteredNews = allNews.filter((news) => news.newSite === source);
    } else {
        filteredNews = allNews
    }
    displayUI(filteredNews); 
})