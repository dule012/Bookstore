const homeIcon = document.querySelector('.home-icon')
const info = document.querySelector('.info')
homeIcon.addEventListener('click', () => {
    info.style.display = 'block'
})

const loginIcon = document.querySelector('.login-icon')
const login = document.querySelector('.login-wrapper')
loginIcon.addEventListener('click', () => {
    login.style.display = 'block'
})