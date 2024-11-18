let products= [
    {
        name: "Красное Господство",
        tag:"pux1",
        price: 1800,
        inCart: 0
    },
    {
        name: "Пуховик-Укрывашка",
        tag:"pux2",
        price: 1400,
        inCart: 0
    },
    {
        name: "Пуховик-Укрывашка 2.0",
        tag:"pux3",
        price: 1500,
        inCart: 0
    },
    {
        name: "Пуховик-Пальто из гуся",
        tag:"pux4",
        price: 1300,
        inCart: 0
    },
    {
        name: "Розовое вино",
        tag:"pux5",
        price: 1700,
        inCart: 0
    },
    {
        name: "Синий глянец",
        tag:"pux6",
        price: 1449,
        inCart: 0
    },
    {
        name: "Страж",
        tag:"pux7",
        price: 999,
        inCart: 0
    },
    {
        name: "Королева гор",
        tag:"pux8",
        price: 3200,
        inCart: 0
    },
    {
        name: "У-угольники",
        tag:"cross",
        price: 1900,
        inCart: 0
    },
    {
        name: "КиттиКет(kitty cat)",
        tag:"cross2",
        price: 1400,
        inCart: 0
    },
    {
        name: "Промежуточный Ветер",
        tag:"cross3",
        price: 1390,
        inCart: 0
    },
    {
        name: "Промежуточный ветер Nike Детский",
        tag:"cross4",
        price: 790,
        inCart: 0
    },
    {
        name: "Красный Карп",
        tag:"cross5",
        price: 1550,
        inCart: 0
    },
    {
        name: "МодестПинк-Грейрат",
        tag:"cross6",
        price: 1400,
        inCart: 0
    },
    {
        name: "Яд Цербера",
        tag:"cross7",
        price: 1200,
        inCart: 0
    },
    {
        name: "ФинМакФил stile",
        tag:"cross8",
        price: 1499,
        inCart: 0
    },

    {
        name: "KofeVarKa",
        tag:"by",
        price: 6700,
        inCart: 0
    },
    {
        name: "Iphone replic 3.4",
        tag:"by2",
        price: 5690,
        inCart: 0
    },
    {
        name: "Системный блок i5 2gen",
        tag:"by3",
        price: 14099,
        inCart: 0
    },
    {
        name: "Что это вообще?",
        tag:"by4",
        price: 1,
        inCart: 0
    },
    {
        name: "Процессор i5 3gen",
        tag:"by5",
        price: 10399,
        inCart: 0
    },
    {
        name: "0_0",
        tag:"by6",
        price: 0.000001,
        inCart: 0
    }
];
let carts = document.querySelectorAll(".a__btn")
let closes = document.querySelectorAll(".close")
let FAQ__block = document.querySelectorAll(".FAQ__block")

FAQ__block.forEach((block)=>{
    block.addEventListener("click", ()=>{
        block.classList.toggle("active") 
    })
    
})



for(let i=0; i < carts.length; i++){
    carts[i].addEventListener("click", () =>{
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoudCartNumber(){
    let productNumber = localStorage.getItem("cartNumbers")
    if(productNumber){
        document.querySelector(".nav__basket span").textContent = productNumber
    }
}

function cartNumbers(product){
    
    let productNumber = localStorage.getItem("cartNumbers")
    productNumber = parseInt(productNumber)
    if(productNumber){
        localStorage.setItem("cartNumbers", productNumber + 1)
        document.querySelector(".nav__basket span").textContent = productNumber + 1
    }else{
        localStorage.setItem("cartNumbers",  1)
        document.querySelector(".nav__basket span").textContent =  1
    }
   
    setItems(product)
}

function setItems(product){
    let cartItems=  localStorage.getItem("productCartIn")
    cartItems = JSON.parse(cartItems)

    if(cartItems != null){
        if( cartItems[product.tag] == undefined){
            cartItems ={
                ...cartItems,
                [product.tag] : product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1
        cartItems = {
            [product.tag] : product
        }
    }
   
    

    localStorage.setItem("productCartIn", JSON.stringify(cartItems))
}

function totalCost(product){
    let cartCost = localStorage.getItem("totalcost");
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalcost", cartCost + product.price)
    }else{
        localStorage.setItem("totalcost", product.price)
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productCartIn")
    cartItems = JSON.parse(cartItems)
    let productContiner = document.querySelector(".basket__wrapper")
    let cartCost = localStorage.getItem("totalcost");
    if(cartItems && productContiner){
        productContiner.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContiner.innerHTML += `
            <div class="item__basket">  <!--  
                <img class="close" src="img/close.png" alt="">
                -->
                <img class="img__product img__basket" src="img/${item.tag}.jpg" alt="">
                <div class="a__block block__basket">
                    <p class="a__name">${item.name}</p>
                    <span class="a__price">${item.price} р.</span>
                </div>
                <div class="boxxx">
                <!--  
                    <img class="arrow__left" src="img/arrow.png" alt="">
                    -->
                    <span class="aaa">${item.inCart}</span>
                    <!--  
                    <img class="arrow__right" src="img/arrow.png" alt="">
                    -->
                </div>
                <div class="total">
                    
                   ${item.price * item.inCart}p
                </div>
            </div>
          
            `
        
       
        })
        productContiner.innerHTML += `
            <div class="dfg"><span class="gdlxef">Итого к оплате: </span>${cartCost}</div>
        `
    }

}

onLoudCartNumber();
displayCart();