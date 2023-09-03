

const newsAllCategoriesData = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    const allCategoriesData = data.data.news_category.slice(0, 4);
    // console.log(allCategoriesData)

    const getCategoriesNames = document.getElementById('tab-container');
    allCategoriesData.forEach(category => {
        // console.log(category.category_name)
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="getCategoryId('${category.category_id}')" class="tab text-xl ">${category.category_name}</a>
        `;

        getCategoriesNames.appendChild(div)
    });
}


const getCategoryId = async (categoryID) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryID}`)
    const data = await res.json();
    const idData = data.data;
    console.log(idData)

    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = "";

    idData.forEach((news) => {

        const div = document.createElement('div');
        div.innerHTML = `
    <div class="card card-compact bg-red-50 shadow-xl">
    <figure><img src="${news.image_url} " /></figure>
        <div class="card-body">

        <div class = "flex justify-between">
        <h2 class="card-title">${news?.title.slice(0, 30)}</h2>
        <button class="btn bg-orange-300 rounded-full">${news?.rating?.badge}</button>
        </div>

        <p> ${news?.details.slice(0, 100)}</p>
        <p>Views: ${news?.total_view || 'no views'}</p>

       
        <div class="flex justify-between items-center">
            <div class="flex gap-5 mt-7">
                <img class="w-[60px] rounded-full " src="${news?.author.img} " /> 
                <div>
                <h3 class="text-xl">${news.author.name}</h3>
                <small>${news.author.published_date}</small>
                </div> 
            </div>
            <button class="btn btn-primary">Buy Now</button>
        </div>
      
         
         


       
        </div>
    </div>
    `;

        cardContainer.appendChild(div);

    })

}



newsAllCategoriesData();
