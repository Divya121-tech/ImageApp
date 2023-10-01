const accessKey = "ClkGY_OmnF0Nbee10uDVDpjCMF0BcpLqewV0dd2dT1w";

const E1 = document.querySelector("form");
const inputE = document.getElementById("find");
const searchDivs = document.querySelector(".find-divs");
const showMore = document.getElementById("show-more");

let inputData = "";
let page = 1;

//fetch and response method
async function searchImg() {
    inputData = inputE.value;
    //dynamic url
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page === 1){
        searchDivs.innerHTML= "";
    }
    results.map((result)=> {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("find-div");
        const img = document.createElement("img");
        img.src = result.urls.small ;
        img.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(img);
        imageWrapper.appendChild(imageLink);
        searchDivs.appendChild(imageWrapper);
    });
    page++;

    if(page>1){
        showMore.style.display = "block";
    }
};

E1.addEventListener("submit", (event)=>{
event.preventDefault();
page = 1;
searchImg();
});

showMore.addEventListener("click", ()=>{
    searchImg();
});