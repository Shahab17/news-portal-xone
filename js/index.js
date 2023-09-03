

const newsAllCategoriesData = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    const allCategoriesData = data.data.news_category.slice(0,4);
    console.log(allCategoriesData)


    const getCategoriesNames = document.getElementById('tab-container');
    
    allCategoriesData.forEach(category => {
        console.log(category.category_name)

        const div = document.createElement('div');
        div.innerHTML = `
        <a class="tab text-2xl ">${category.category_name}</a>
        `;

        getCategoriesNames.appendChild(div)
    });
   

}



newsAllCategoriesData();