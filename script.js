let wrapper = document.querySelector(".store__wrapper")
let card = document.createElement("div")
fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then((data) => fetchData(data))  //здесь можем сразу запустить функцию и передать в него наш массив с объектами

const fetchData = (data) => {   // здесь мы создаем эту функцию и принимаем нашу data массив с объектами
    return data.forEach(el => { // перебираем data и при каждой итерации создаем карточку
        
        let card = document.createElement("div")
        card.classList = "store__card"
        wrapper.appendChild(card)

        let cardWrap = document.createElement("div")
        cardWrap.classList = "store__img"
        card.appendChild(cardWrap)
        
        let img = document.createElement("img")
        cardWrap.appendChild(img)
        img.src = el.image

        let title = document.createElement("p")
        title.classList = "store__title"
        card.appendChild(title)
        title.innerHTML = el.title

        let btn = document.createElement("button")      
        btn.className = "store__btn"    
        btn.innerText = "В корзину"     
        card.appendChild(btn)           

    })
}

let container = document.querySelector('.container') // здесь мы достаем нащ контейнер для того что бы положить в него ul
let categoriesList = document.createElement('ul')
container.appendChild(categoriesList)

categoriesList.className = 'store__list'
const categoriesText = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
]

categoriesText.forEach((el) => { // перебираем ранее созданный массив и при каждой итерации создаем li
   let categories = document.createElement('li')
   categories.className = 'store__categories'
   categoriesList.appendChild(categories)
   categories.innerHTML = el
})

let categories = Array.from(document.querySelectorAll('.store__categories')) 

const removeActive = () => { // тут создаем функцию которая в дальнейшем будет удалять активные классы
    categories.forEach((el) => {
        el.classList.remove("active");
    })
}
let modal = document.createElement('div')

categories.forEach((el) => {
    el.addEventListener("click", (e) => {
        console.log(e);
        removeActive()
        modal.remove()
        modal = document.createElement('div')
        container.appendChild(modal)
        modal.className = 'store__wrapper-list'
        
        el.classList.add("active"); 
        modal.style.display = "flex"
        let a = el.innerHTML
        fetch(`https://fakestoreapi.com/products/category/${a}`)
            .then(res=>res.json())
            .then((data) => {

                     data.forEach(el => {

                    let card = document.createElement("div")
                    card.className = "store__card"
                    modal.appendChild(card)

                    let cardWrap = document.createElement("div")
                    cardWrap.className = "store__img"
                    card.appendChild(cardWrap)
                    
                    let img = document.createElement("img")
                    cardWrap.appendChild(img)
                    img.src = el.image
        
                    let title = document.createElement("p")
                    title.classList = "store__title"
        
                    let modifyCard = () => {
                        if (card.lastChild == title) {
                            title.remove()
                        } else 
                        if (card.lastChild === cardWrap) {
                            card.appendChild(title)
                            title.innerHTML = el.title
                        }
                    }
                    card.addEventListener("click", modifyCard)
                })
                
            })
    })
})

