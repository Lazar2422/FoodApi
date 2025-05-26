let link = "http://www.themealdb.com/api/json/v1/1/random.php"
let extraditarcomida = document.getElementById("second-content")

function añadirimg(){
    axios.get(link)
    .then((response)=>{
        console.log(response)
            extraditarcomida.innerHTML += `
            <div id="imagenesadd">
            <img class="imagencita"src="${response.data.meals[0].strMealThumb}" data-id="${response.data.meals[0].strMeal}" onclick="obervar(this)">
            <p>${response.data.meals[0].strMeal}</p>
            </div>`
    })
}
for (let i=0;i<8;i++){
    añadirimg();
}
function buscar(key){
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`)
    .then((respuesta)=>{
        console.log(respuesta)
        let añadido= document.getElementById("searched")
        for(let i =0; i<respuesta.data.meals.length;i++){
            console.log(respuesta.data.meals[i])
            añadido.innerHTML += `
            <div id="imagenesadd">
            <img class="imagencita" src="${respuesta.data.meals[i].strMealThumb}" data-id="${respuesta.data.meals[i].strMeal}" onclick="obervar(this)">
            <p>${respuesta.data.meals[i].strMeal}</p>
            </div>`
        }
    })
}
document.getElementById("formularito").addEventListener("submit", function(e){
    e.preventDefault()
    buscar(document.getElementById("subido").value)
})
axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=ho`)
.then((respuestica)=>{
    console.log(respuestica)
})
function obervar(elemento){
    let muestrica = document.getElementById("mostrado")
    muestrica.style.display = "block";
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${elemento}`)
    .then((respuestica)=>{
        let ingredientes = ""
        for (let i =0; i<20;i++){
            let numerito = `strIngredient${i}`
            ingredientes += `${respuestica.data[0][numerito]}`
        }
        muestrica.innerHTML = `
        <img src="${respuestica.data.meals[0].strMealThumb}">
        <p>${respuestica.data.meals[0].strMeal}</p>
        <p>${respuestica.data.meals[0].strCategory} ${respuestica.data.meals[0].strTags}</p>
        <p>${ingredientes}</p>
        <p>${respuestica.data.meals[0].strInstructions}</p>
        `
    })
}