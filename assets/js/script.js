const imageMapping = {
    'assets/images/image-product-1.jpg': '1400px',
    'assets/images/image-product-2.jpg': '0',
    'assets/images/image-product-3.jpg': '-1400px',
    'assets/images/image-product-4.jpg': '-2800px'
}
let quantidade = parseInt(document.querySelector('.number').textContent)
let slideIndex = 0
let showBolinha = false
const slideShow = document.querySelector('.slideshow')

const ampliarImagem = (event) => {
    document.querySelector('.sneaker--slider').style.display = `flex`

    const imageUrl = event.target.getAttribute('src')
    slideShow.style.marginLeft = imageMapping[imageUrl]
    document.querySelector('.close').addEventListener('click', () => {
        document.querySelector('.sneaker--slider').style.display = `none`
    })
    document.querySelectorAll('.imgs--carrossel').forEach((item, index) => {
        item.classList.remove('border')
        if (event.target.getAttribute('data-index') == index + 1) {
            item.classList.add('border')
        }
    })
}

const carrossel = (event) => {
    const imageUrl = event.target.getAttribute('src')
    slideShow.style.marginLeft = imageMapping[imageUrl]
    document.querySelectorAll('.imgs--carrossel').forEach(item => {
        item.classList.remove('border')
    })
    event.target.classList.add('border')
}

const voltarSlide = () => {
    let slideshow = document.querySelector('.slideshow')
    let currentMarginLeft = parseInt(slideShow.style.marginLeft)
    if (currentMarginLeft === 1400) return
    slideShow.style.marginLeft = `${currentMarginLeft + 1400}px`
    atualizarBorda(document.querySelectorAll('.imgs--carrossel'), slideshow.style.marginLeft)
}

const passarSlide = () => {
    let slideshow = document.querySelector('.slideshow')
    let currentMarginLeft = parseInt(slideshow.style.marginLeft)

    if (currentMarginLeft === -2800) return
    slideshow.style.marginLeft = `${currentMarginLeft - 1400}px`
    atualizarBorda(document.querySelectorAll('.imgs--carrossel'), slideshow.style.marginLeft)
}

const atualizarBorda = (imagens, margem) => {
    const marginToIndex = {
        '0px': 1,
        '-1400px': 2,
        '-2800px': 3,
        '1400px': 0
    }
    imagens.forEach(item => {
        item.classList.remove('border')
        if (item.getAttribute('data-foto') == marginToIndex[margem]) {
            item.classList.add('border')
        }
    })
}

const adicionarAoCarrinho = () => {
    document.querySelector('.quantidade-cart').style.display = `block`
    const carrinhoQuantidade = parseInt(document.querySelector('.quantidade-cart').textContent)
    document.querySelector('.quantidade-cart').textContent = showBolinha === false ? quantidade : quantidade + carrinhoQuantidade
    showBolinha = true
}

const abrirCarrinho = () => {
    document.querySelector('.cart').style.display = `flex`

    const carrinhoQuantidade = document.querySelector('.quantidade-cart').textContent
    if (showBolinha === true) {
        document.querySelector('.resumo').innerHTML = `
        <div class="img--resumo"><img src="assets/images/image-product-1-thumbnail.jpg"></div>
        Fall Limited Edition Sneakers $125.00 x${carrinhoQuantidade}<span><b>$${(125 * parseInt(carrinhoQuantidade)).toFixed(2)}</b></span>
        <img class="delete" src="assets/images/icon-delete.svg">`
        document.querySelector('.delete').style.display = `flex`
        document.querySelector('.delete').addEventListener('click', limparCarrinho)
    }
}

const fecharCarrinho = () => {
    document.querySelector('.cart').style.display = `none`
}

const limparCarrinho = () => {
    document.querySelector('.quantidade-cart').textContent = `0`
    document.querySelector('.resumo').innerHTML = `<div class="text--resumo">Your cart is empty.</div>`
    document.querySelector('.quantidade-cart').style.display = `none`
    showBolinha = false
}

document.querySelectorAll('.imagem').forEach((item) => {
    item.addEventListener('click', ampliarImagem)
})
document.querySelectorAll('.imgs--carrossel').forEach(item => {
    item.addEventListener('click', carrossel)
})
document.querySelector('.mais').addEventListener('click', () => {
    quantidade++
    document.querySelector('.number').textContent = quantidade
})
document.querySelector('.menos').addEventListener('click', () => {
    if (quantidade > 1) {
        quantidade--
        document.querySelector('.number').textContent = quantidade        
    }
})
document.querySelector('.voltar').addEventListener('click', voltarSlide)
document.querySelector('.passar').addEventListener('click', passarSlide)
document.querySelector('.img--cart img').addEventListener('mouseenter', abrirCarrinho)
document.querySelector('.cart').addEventListener('mouseleave', fecharCarrinho)
document.querySelector('.bttn').addEventListener('click', adicionarAoCarrinho)