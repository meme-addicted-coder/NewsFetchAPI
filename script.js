//const axios = require('axios');

const apiKey = "d19c8564e1e443c4a86da2b7952a82fa";

const blogcontainer = document.getElementById("blogcont");
const search = document.getElementById("search");
const searchbtn = document.getElementById("searchBtn");
async function fetchnews(){
    try {
        const apiUrl=`https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=16&apiKey=${apiKey}`;
        const response=await fetch(apiUrl);
        const data=await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching random news', error);
        return [];
    }
}

searchbtn.addEventListener('click',async()=>{

    const query=search.value.trim();
    if(query!==""){
        try {
            const articles=await fetchnewsquery(query);
            displayblogs(articles);
        } catch (error) {
            console.error('Error fetching random news', error);
        }
    }
});

async function fetchnewsquery(query){
    try {
        const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=14&apiKey=${apiKey}`;
        const response=await fetch(apiUrl);
        const data=await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching random news', error);
        return [];
    }

}
function displayblogs(articles){
    blogcontainer.innerHTML="";
    articles.forEach(article => {
        const blogdiv=document.createElement('div');
        blogdiv.classList.add('blogcard');
        const img=document.createElement('img');
        img.src=article.urlToImage;
        img.alt=article.title;
        const title=document.createElement('h2');
        title.textContent=article.title;
        const desc=document.createElement('p');
        desc.textContent=article.title.length>50? article.description.slice(0,50)+" ..." :article.description.slice(0,200-article.title.length)+" ...";
        blogdiv.appendChild(img);
        blogdiv.appendChild(title);
        blogdiv.appendChild(desc);
        blogdiv.addEventListener('click',()=>{
            window.open(article.url, '_blank');
        });
        blogcontainer.appendChild(blogdiv);

    });
}
        


(async()=>{
    try {
        const articles=await fetchnews();
        displayblogs(articles);
        }
    catch (error) {
        console.error('Error fetching random news', error);
    }
})();

