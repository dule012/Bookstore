const homeIcon = document.querySelector('.home-icon')
const info = document.querySelector('.info')
homeIcon.addEventListener('click', () => {
    info.classList.toggle('block')
})

const loginIcon = document.querySelector('.login-icon')
const login = document.querySelector('.login-wrapper')
loginIcon.addEventListener('click', () => {
    login.classList.toggle('block')
})

const comments = document.querySelector('.comments')
const commentsIcon = document.querySelector('.comments-icon')

commentsIcon.addEventListener('click', () => {
    comments.classList.toggle('block')
})

const cartWrapperMobile = document.querySelector('.cart-wrapper-mobile')
const cartIcon = document.querySelector('.cart-icon')

cartIcon.addEventListener('click', () => {
    cartWrapperMobile.classList.toggle('block')
})

