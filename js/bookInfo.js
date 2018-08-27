import { Book, booksArr } from './dataModule.js'

const apiBookById = `https://www.googleapis.com/books/v1/volumes/${localStorage.getItem('id')}`

fetch(apiBookById)
    .then((data) => {
        return data.json()
    })
    .then((data) => {
        // kada je greska valjda pri serveru vraca objekat {error: {...}}
        if (typeof data.error != 'object') {

            const book = new Book(data)

            const addingApiPropsToBookInfo = () => {
                const info = document.querySelector('.info')
                if (book.smallThumbnail != undefined) {
                    const img = document.createElement('img')
                    img.setAttribute('src', book.smallThumbnail)
                    info.append(img)

                    const background = document.querySelector('.background')
                    background.style.backgroundImage = `url(${book.smallThumbnail})`
                }

                const title = document.querySelector('.title')
                if (book.title != undefined) {
                    title.textContent = book.title
                }
                const author = document.querySelector('.author')
                if (book.author != undefined) {
                    author.textContent = book.author
                }

                const starWrapper = document.querySelector('.star-wrapper')
                if (book.averageRating != undefined) {
                    for (let i = 0; i < 5; i++) {
                        if (i < Math.floor(book.averageRating)) {
                            let i = document.createElement('i')
                            i.setAttribute('class', 'fa fa-star yellow')
                            starWrapper.append(i)
                        } else {
                            let i = document.createElement('i')
                            i.setAttribute('class', 'fa fa-star grey')
                            starWrapper.append(i)
                        }
                    }
                }

                const description = document.querySelector('.description')
                if (book.description != undefined) {
                    description.innerHTML = book.description
                }

                const published = document.querySelector('.published > span')
                if (book.publishedDate != undefined)
                    published.textContent = book.publishedDate

                const categorie = document.querySelector('.categories > span')
                if (book.categories != undefined) {
                    categorie.textContent = book.categories
                }

                const pages = document.querySelector('.pageCount > span')
                if (book.pageCount != undefined) {
                    pages.textContent = book.pageCount
                }

                const price = document.querySelector('.buy > span')
                price.textContent = book.price + '$'
            }
            addingApiPropsToBookInfo()

            const searchBooks = () => {
                const searchWrapper = document.querySelector('.search-output')
                const searchOutputCard = document.getElementsByClassName('search-output-card')
                const input = document.querySelector('header > input')

                input.addEventListener('keydown', () => {

                    if (input.value.length >= 2) {

                        for (let i = 0; i < searchOutputCard.length; i++) {
                            searchOutputCard[i].remove()
                            i--
                        }

                        fetch(`https://www.googleapis.com/books/v1/volumes?q=${input.value}&printType=books&projection=full&maxResults=15`)
                            .then((data) => {
                                return data.json()
                            })
                            .then((data) => {

                                if (typeof data.error == 'object') {
                                    return
                                }

                                const arr = booksArr(data)

                                arr.forEach((el, i) => {
                                    let div = document.createElement('div')
                                    div.setAttribute('class', 'search-output-card')
                                    div.setAttribute('key', el.id)

                                    let a = document.createElement('a')
                                    a.setAttribute('href', './bookInfo.html')

                                    let img = document.createElement('img')
                                    img.setAttribute('src', el.smallThumbnail)
                                    a.append(img)

                                    let aDiv = document.createElement('div')
                                    let p1 = document.createElement('p')
                                    let p1t = document.createTextNode(el.title.length > 36 ? el.title.slice(0, 35) + '...' : el.title)
                                    p1.append(p1t)
                                    aDiv.append(p1)
                                    let p2 = document.createElement('p')
                                    let p2t = document.createTextNode(el.author)
                                    p2.append(p2t)
                                    aDiv.append(p2)
                                    a.append(aDiv)

                                    div.append(a)
                                    searchWrapper.append(div)

                                    searchOutputCard[i].addEventListener('click', (e) => {
                                        localStorage.setItem('id', e.target.closest('.search-output-card').getAttribute('key'))
                                        localStorage.setItem('lastViewed', e.target.closest('.search-output-card').firstElementChild.lastElementChild.firstElementChild.textContent)
                                    })
                                })
                            })

                        searchWrapper.style.display = 'block'
                    } else {
                        searchWrapper.style.display = 'none'
                    }
                })
            }
            searchBooks()

            const displayCartCardsFromLocalStorage = (arr) => {
                const cartWrapper = document.querySelector('.cart-wrapper')
                const noOfBooks = document.querySelector('.no-of-books > span')
                const total = document.querySelector('.total > span')

                const cartCards = document.getElementsByClassName('cart-card')
                const deleteCartCard = document.getElementsByClassName('delete-cart-card')
                const counter = document.getElementsByClassName('cart-card-counter')
                const price = document.getElementsByClassName('cart-card-price')

                if (arr != null) {
                    arr.forEach((el, j) => {
                        let div = document.createElement('div')
                        div.setAttribute('class', 'cart-card')

                        let img = document.createElement('img')
                        img.setAttribute('src', el.img)
                        div.append(img)

                        let p1 = document.createElement('p')
                        p1.setAttribute('class', 'cart-card-title')
                        let p1T = document.createTextNode(el.title)
                        p1.append(p1T)
                        div.append(p1)

                        let divDiv = document.createElement('div')
                        let p2 = document.createElement('p')
                        p2.setAttribute('class', 'cart-card-counter')
                        let p2T = document.createTextNode(el.counter)
                        p2.append(p2T)
                        divDiv.append(p2)

                        let p3 = document.createElement('p')
                        p3.setAttribute('class', 'cart-card-price')
                        let p3T = document.createTextNode(el.price)
                        p3.append(p3T)
                        divDiv.append(p3)

                        let i = document.createElement('i')
                        i.setAttribute('class', 'fa delete-cart-card')
                        i.innerHTML = '&#xf00d;'
                        divDiv.append(i)

                        div.append(divDiv)
                        cartWrapper.append(div)

                        total.textContent = (parseFloat(total.textContent) + (parseFloat(arr[j].counter) * parseFloat(arr[j].price))).toFixed(2)
                    })
                    noOfBooks.textContent = arr.length

                    for (let i = 0; i < deleteCartCard.length; i++) {

                        (function (i) {

                            deleteCartCard[i].addEventListener('click', (e) => {
                                for (let j = 0; j < cartCards.length; j++) {
                                    if (e.target.closest('.cart-card') == cartCards[j]) {

                                        noOfBooks.textContent = parseFloat(noOfBooks.textContent) - 1
                                        total.textContent = Math.abs(parseFloat(total.textContent) - (parseFloat(counter[j].textContent) * parseFloat(price[j].textContent))).toFixed(2)
                                        cartCards[j].remove()
                                        let localStorageArr = JSON.parse(localStorage.getItem('cartCardsArr'))
                                        localStorageArr.splice(j, 1)
                                        localStorage.setItem('cartCardsArr', JSON.stringify(localStorageArr))
                                        console.log(localStorageArr, ' removed 2')
                                    }
                                }
                            })

                        })(i)

                    }
                }
            }
            displayCartCardsFromLocalStorage(JSON.parse(localStorage.getItem('cartCardsArr')))

            const sumOfPricesAndCreateCartCard = () => {
                const buy = document.querySelector('.buy')
                const imageInfo = document.querySelector('.info > img')
                const titleInfo = document.querySelector('.title')
                const authorInfo = document.querySelector('.author')
                const priceInfo = document.querySelector('.buy > span')
                const noOfBooks = document.querySelector('.no-of-books > span')
                const total = document.querySelector('.total > span')

                const iX = document.getElementsByClassName('delete-cart-card')

                const cartWrapper = document.querySelector('.cart-wrapper')

                const cartCard = document.getElementsByClassName('cart-card')
                const cartCardsTitle = document.getElementsByClassName('cart-card-title')
                const cartCardCounter = document.getElementsByClassName('cart-card-counter')
                const cartCardPrice = document.getElementsByClassName('cart-card-price')

                let localStorageArr = JSON.parse(localStorage.getItem('cartCardsArr')) == null ? localStorage.setItem('cartCardsArr', JSON.stringify([])) : JSON.parse(localStorage.getItem('cartCardsArr'))

                buy.addEventListener('click', () => {
                    for (let j = 0; j < cartCardsTitle.length; j++) {
                        if (titleInfo.textContent.slice(0, 35) == cartCardsTitle[j].textContent.slice(0, 35)) {

                            cartCardCounter[j].textContent = parseFloat(cartCardCounter[j].textContent) + 1

                            total.textContent = (parseFloat(total.textContent) + parseFloat(cartCardPrice[j].textContent)).toFixed(2)

                            localStorageArr = JSON.parse(localStorage.getItem('cartCardsArr'))
                            localStorageArr[j].counter = cartCardCounter[j].textContent
                            localStorage.setItem('cartCardsArr', JSON.stringify(localStorageArr))
                            console.log(localStorageArr, 'same', cartCardsTitle.length)
                            return
                        }
                    }
                    // Create Cart Cards
                    let cartCardDiv = document.createElement('div')
                    cartCardDiv.setAttribute('class', 'cart-card')

                    let img = document.createElement('img')
                    img.setAttribute('src', imageInfo == undefined ? '' : imageInfo.src)
                    cartCardDiv.append(img)

                    let p = document.createElement('p')
                    p.setAttribute('class', 'cart-card-title')
                    let pText = document.createTextNode(titleInfo.length > 35 ? titleInfo.textContent.slice(0, 35) : titleInfo.textContent)
                    p.append(pText)
                    cartCardDiv.append(p)

                    let div = document.createElement('div')
                    let p1 = document.createElement('p')
                    p1.setAttribute('class', 'cart-card-counter')
                    let p1text = document.createTextNode('1')
                    p1.append(p1text)
                    div.append(p1)
                    let p2 = document.createElement('p')
                    p2.setAttribute('class', 'cart-card-price')
                    let p2Text = document.createTextNode(priceInfo.textContent)
                    p2.append(p2Text)
                    div.append(p2)
                    let iDelete = document.createElement('i')
                    iDelete.className = 'fa delete-cart-card'
                    iDelete.innerHTML = '&#xf00d;'
                    div.append(iDelete)
                    cartCardDiv.append(div)
                    cartWrapper.append(cartCardDiv)
                    // Suming in total  for new cart card
                    total.textContent = (parseFloat(total.textContent) + parseFloat(cartCardPrice[cartCardPrice.length - 1].textContent)).toFixed(2)
                    noOfBooks.textContent = cartCard.length

                    localStorageArr = JSON.parse(localStorage.getItem('cartCardsArr'))
                    localStorageArr.push({
                        title: titleInfo.textContent,
                        img: imageInfo == undefined ? '' : imageInfo.src,
                        counter: 1,
                        price: priceInfo.textContent,
                    })
                    console.log(localStorageArr, 'new')
                    localStorage.setItem('cartCardsArr', JSON.stringify(localStorageArr))
                    //             Delete Cart Cards
                    iX[iX.length - 1].addEventListener('click', (e) => {
                        for (let k = 0; k < cartCard.length; k++) {
                            if (e.target.closest('.cart-card') == cartCard[k]) {
                                total.textContent = Math.abs((parseFloat(total.textContent) - (parseFloat(cartCardCounter[k].textContent) * parseFloat(cartCardPrice[k].textContent))).toFixed(2))
                                noOfBooks.textContent = parseFloat(noOfBooks.textContent) - 1
                                cartCard[k].remove()

                                localStorageArr = JSON.parse(localStorage.getItem('cartCardsArr'))
                                localStorageArr.splice(k, 1)
                                localStorage.setItem('cartCardsArr', JSON.stringify(localStorageArr))
                                console.log(localStorageArr, ' removed 1')
                            }
                        }
                    })
                })
            }
            sumOfPricesAndCreateCartCard()

            const openAndCloseCart = () => {
                const cart = document.querySelector('.cart')
                const cartWrapper = document.querySelector('.cart-wrapper')
                const XCartWrapper = document.querySelector('.close')

                const deleteCartCard = document.getElementsByClassName('delete-cart-card')
                let Xarr = [...deleteCartCard]

                cart.addEventListener('click', () => {
                    cartWrapper.style.display = 'block'
                })

                XCartWrapper.addEventListener('click', () => {
                    cartWrapper.style.display = 'none'
                })

                window.addEventListener('click', (e) => {

                    const XCartCard = () => {
                        for (let i = 0; i < Xarr.length; i++) {
                            if (e.target.closest('.delete-cart-card') == Xarr[i]) {
                                return Xarr[i]
                            }
                        }
                        return 1
                    }
                    if (e.target.closest('.delete-cart-card') != XCartCard()) {
                        Xarr = [...deleteCartCard]
                    }
                    if (e.target.closest('.cart-wrapper') != cartWrapper && e.target.closest('.cart') != cart && e.target.closest('.delete-cart-card') != XCartCard()) {
                        cartWrapper.style.display = 'none'
                    }
                })
            }
            openAndCloseCart()



        }

    })