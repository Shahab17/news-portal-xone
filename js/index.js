

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
    // console.log(idData)

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
        <button class=" btn text-blue-700 border-1 border-blue-700 rounded-full">${news?.rating?.badge}</button>
        </div>

        <p> ${news?.details.slice(0, 100)}</p>
        <p>Views: ${news?.total_view || 'no views'}</p>

       
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-3 mt-7">
                <img class="w-[60px] rounded-full " src="${news?.author.img} " /> 
                <div>
                <h3 class="">${news.author.name? news.author.name : 'TamSha'}</h3>
                <small>${news.author.published_date}</small>
                </div> 
            </div>
            <button onclick="getModalDetails('${news._id}')" class="btn text-xl rounded-xl bg-gradient-to-r from-cyan-50 to-blue-700">Details</button>
        </div>
      
         
        </div>
    </div>
    `;
        cardContainer.appendChild(div);
    })
}


const getModalDetails = async (modalId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${modalId} `);
    const data = await res.json();
    const modalData = data.data[0];
    // console.log(modalData)

    const modalContainer = document.getElementById('modal-container');

    const div = document.createElement('div');
    div.innerHTML = `
            
         
        <dialog id="modal_details" class="modal modal-bottom px-6 sm:modal-middle">
        <form method="dialog" class="modal-box">

        <figure><img src="${modalData?.image_url} " /></figure>

        <div class = "flex justify-between items-center mt-7">
        <h2 class="card-title">${modalData?.title.slice(0, 20)}</h2>
        <button class=" btn text-blue-700 border-1 border-blue-700 rounded-full">${modalData?.rating?.badge}</button>
        </div>

        <h4>${modalData?.title.slice(0,20)}</h4>
        <p>Views: ${modalData?.total_view || 'no views'}</p>
        
        <div class="flex items-center gap-3 mt-7">
        <img class="w-[60px] rounded-full " src="${modalData?.author?.img} " /> 
        <div>
        <h3 class="">${modalData?.author?.name? modalData?.author?.name : 'TamSha' }</h3>
        <small>${modalData?.author?.published_date}</small>
        </div> 
        </div>

            <div class="modal-action">
            <button class="btn w-full text-xl rounded-md bg-gradient-to-r from-cyan-50 to-blue-700 ">Close</button>
            </div>
        </form>
        </dialog>

    `;
    modalContainer.appendChild(div);

    const modal = document.getElementById('modal_details');
    modal.showModal();

}



newsAllCategoriesData();
getCategoryId('01')