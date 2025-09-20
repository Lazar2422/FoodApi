let link = "https://www.themealdb.com/api/json/v1/1/random.php"
let extraditarcomida = document.getElementById("second-content")

// Añadir imágenes aleatorias
function añadirimg(){
    axios.get(link)
    .then((response)=>{
        let meal = response.data.meals[0]
        extraditarcomida.innerHTML += `
        <div class="imagenesadd">
            <img class="imagencita" src="${meal.strMealThumb}" data-id="${meal.strMeal}" onclick="obervar('${meal.strMeal}')">
            <p>${meal.strMeal}</p>
        </div>`
    })
}
for (let i=0;i<8;i++){
    añadirimg();
}

// Función de búsqueda
function buscar(key){
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`)
    .then((respuesta)=>{
        let añadido= document.getElementById("searched")
        añadido.innerHTML = "" // limpiar resultados previos
        if(respuesta.data.meals){
            respuesta.data.meals.forEach(meal=>{
                añadido.innerHTML += `
                <div class="imagenesadd">
                    <img class="imagencita" src="${meal.strMealThumb}" data-id="${meal.strMeal}" onclick="obervar('${meal.strMeal}')">
                    <p>${meal.strMeal}</p>
                </div>`
            })
        } else {
            añadido.innerHTML = "<p>No se encontraron resultados</p>"
        }
    })
}

document.getElementById("formularito").addEventListener("submit", function(e){
    e.preventDefault()
    buscar(document.getElementById("subido").value)
})

// Mostrar información completa al hacer click
function obervar(mealName){
    let muestrica = document.getElementById("mostrado")
    muestrica.style.display = "block";

    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then((res)=>{
        if(res.data.meals){
            let meal = res.data.meals[0]

            // Construir lista de ingredientes
            let ingredientes = ""
            for(let i=1;i<=20;i++){
                let ingrediente = meal[`strIngredient${i}`]
                let medida = meal[`strMeasure${i}`]
                if(ingrediente && ingrediente.trim() !== ""){
                    ingredientes += `${ingrediente} - ${medida}<br>`
                }
            }

            muestrica.innerHTML = `
                <img src="${meal.strMealThumb}" style="width:50%; border-radius:1vw;">
                <h2>${meal.strMeal}</h2>
                <p><strong>Categoría:</strong> ${meal.strCategory} | <strong>Tags:</strong> ${meal.strTags || "N/A"}</p>
                <p><strong>Ingredientes:</strong><br>${ingredientes}</p>
                <p><strong>Instrucciones:</strong> ${meal.strInstructions}</p>
                <button onclick="cerrarMostrado()">Cerrar</button>
            `
        }
    })
}

// Función para cerrar el bloque
function cerrarMostrado(){
    document.getElementById("mostrado").style.display = "none"
}
