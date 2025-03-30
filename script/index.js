function loadCatagories (){
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res=>res.json())
    .then((data)=>displayCatagories(data.categories));
}


function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res=>res.json())
    .then(data =>displayVideos(data.videos))
}



const loadCatagoriesVideos = (id) => {
  console.log(id);
  const url=`
    https://openapi.programming-hero.com/api/phero-tube/category/${id}
  `;
  console.log(url);

  fetch(url)
  .then(res=>res.json())
  .then((data)=> {

    const clickedButton=document.getElementById(`btn-${id}`);
    clickedButton.classList.add("active");
    displayVideos (data.category)
  });
};






function displayCatagories(categories){
    const catagoryContainer= document.getElementById("catagory-container");
    for(let cat of categories){
        console.log(cat)

        const catagoryDiv=document.createElement("div");
        catagoryDiv.innerHTML=`
        <button id="btn-${cat.category_id}" onclick="loadCatagoriesVideos(${cat.category_id})" class="btn btn-sm hover:bg-red-500 hover:text-white ">${cat.category}</button>
        `;
        catagoryContainer.append(catagoryDiv)
    }
}

const displayVideos=(videos)=>{
  const videocontainer=document.getElementById("video-container");

  videocontainer.innerHTML="";

  if(videos.length==0){

    videocontainer.innerHTML=`<div class="col-span-full flex flex-col text-center justify-center items-center py-20">
            <img class="w-[120px]" src="./Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops! sorry,There is no content here</h2>
        </div>`;

    return;
  }

  videos.forEach(video=>{
        //console.log(video);

        const videocard=document.createElement("div");

        videocard.innerHTML=`

       <div class="card bg-base-100">
        <figure class="relative">
          <img class="w-full object-cover h-[150px]"
            src="${video.thumbnail}"
            alt="Shoes" />
            <span class="absolute bottom-2 right-2 text-sm text-white bg-black px-2 rounded">3hrs 56 min ago</span>
        </figure>
        <div class="flex gap-3 px-0 py-5">
            <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
            </div>
            <div class="intro">
                <h2 class="text-sm font-semibold">Midnight Serenade</h2>
                <p class="text-sm text-gray-500 flex gap-1 "> 
                    ${video.authors[0].profile_name}
                <img class="h-5 w-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""></p>
                <p class="text-sm text-gray-500">${video.others.views} views</p>
            </div>
        </div>
      </div>
        `
    videocontainer.append(videocard);
  });
};


loadCatagories();
// loadVideos();