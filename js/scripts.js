// Seleção de elementos
const cartDiv = document.querySelector(".cart-div");
const footerCart = document.querySelector(".footer-cart");
const spanCart = document.querySelector(".span-cart-add");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector(".cart-finish a");
const menuItem = document.querySelectorAll(".menu-item"); 
const menu = document.querySelector(".container-menu");
const buttonAdd = document.querySelectorAll(".btn-add");
const cartModal = document.querySelector(".cart-modal");
const cartTotal = document.querySelector(".cart-total");

let listCart = [];

// Funções
function addCart(name, price) {
    const existing = listCart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        listCart.push({
            name,
            price,
            quantity: 1
        });
    }

    updateCartModal();
}

function updateCartModal() {
    cartModal.innerHTML = "";
    let total = 0;

    listCart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `<div>
                    <h3>${item.name}</h3>
                    <p>Quantidade: ${item.quantity}</p>
                    <p>R$ ${item.price}</p>
                    </div>
                <div>
                    <a class="btn-remove" data-index="${index}">Remover</a>
                </div>
            `;

        cartModal.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    cartTotal.innerHTML = total.toFixed(2);

    // Remover Item
    const removeModal = document.querySelectorAll(".btn-remove");

    removeModal.forEach((element) => {
        element.addEventListener("click", (event) => {
            const index = Number(event.target.getAttribute('data-index'));
            const item = listCart[index];
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else if (item.quantity === 1) {
                    listCart.splice(index, 1);
                }
                updateCartModal();
            }
        });
    });

    if(listCart.length >= 0){
        let cartCont = listCart.reduce((accumulator, item) => {
            return accumulator + item.quantity;
        }, 0); 
        spanCart.innerHTML = cartCont;
    }else{
        spanCart.innerHTML = "0";
    }
}

// Eventos

footerCart.addEventListener("click", () => {
    cartDiv.style.display = "flex";
    updateCartModal();
});

cartDiv.addEventListener("click", (event) => {
    if (event.target === cartDiv || event.target === closeCart) {
        cartDiv.style.display = "none";
    }
});

menu.addEventListener("click", (event) => {
    const parentButton = event.target.closest(".btn-add");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));

        addCart(name, price);
    }
});

