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

                            for(let i = 0; i < searchOutputCard.length; i++) {
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

        }
    })