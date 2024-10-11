
document.getElementById("search-btn").addEventListener("click",(event) => {
    document.getElementById("product-container").innerHTML = "";
    const receive = document.getElementById("search-box").value;
    //console.log(receive);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${receive}`)
        .then(res => res.json())
        .then( data=> displayAmeals(data.meals))//THis is an object thats why written .meals otherwise if it will array it will writen data
})

const displayAmeals = ( items ) => {
        console.log(items);
        //console.log(items.length);
        const con = document.getElementById("product-container");
        if(items){
            items.forEach((item) => {
                const div = document.createElement("div");
                div.classList.add('product-cls');
                div.innerHTML = `
                    <img class = "img-pro" src = ${item.strMealThumb} onClick="showiteminfo('${item.idMeal}')" />
                    <h5> <span class="name-item"> ${item.strMeal.slice(0,20)} </span> </h5>
                    
                     <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick = "singleProduct('${item.idMeal}')">
                        Details
                    </button>
                    <button class="Detail-item" onClick= "handleAddtocart('${item.strMeal}')"> Add to cart </button>
                `;
                con.appendChild(div); 
            })
        }
        else{
            alert('No data Found');
            location.reload();
        }       
}
const singleProduct = (id) => {
    //alert(id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(res => res.json())
            .then(data => displayitemusingmodal(data.meals));//THis is an object thats why written .meals otherwise if it will array it will writen data
}

const displayitemusingmodal = (item) => {
    //document.getElementById("showiteminfo").innerHTML = "";
    const tmp = document.getElementById("showiteminfo");
    
    item.forEach(( data ) => {
        console.log(data.idMeal);
        const name = document.getElementById("staticBackdropLabel");
        name.innerText =` ID : ${data.idMeal}`;

        const d = document.getElementById("modal-body-text");
        d.innerHTML = `<b> Name : </b>  ${data.strMeal} <br /> 
                        <img src = ${data.strMealThumb} width="200" height="180" /> <br /> 
                        <b> Area : </b> ${data.strArea} <br />
                        <b> Category : </b> ${data.strCategory} <br />
                        <b> Ingredients : </b> ${data.strIngredient1}, ${data.strIngredient2}, ${data.strIngredient3}, 
                        ${data.strIngredient4}, ${data.strIngredient5}, ${data.strIngredient6}
        `;



    })
        
}
const handleAddtocart = (title) => {
    const c = document.getElementById("count-cart").innerText;
    let totalcart = parseInt(c);
    totalcart += 1;
    document.getElementById("count-cart").innerText = totalcart;
    const con = document.getElementById("cart-main-container");
    const div = document.createElement("div");
    div.classList.add('div-cls');
    div.innerHTML = `
         <b> ${title} </b>
         <label > 1 </label>
    `;
    con.appendChild(div);
    
}
