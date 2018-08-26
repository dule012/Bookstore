import { Book } from './dataModule.js'

const apiBookById = `https://www.googleapis.com/books/v1/volumes/${localStorage.getItem('id')}`

fetch(apiBookById)
    .then((data) => {
        return data.json()
    })
    .then((data) => {
        const book = new Book(data)
        console.log(book)

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
            title.textContent = book.title
            const author = document.querySelector('.author')
            author.textContent = book.author

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
        }
        addingApiPropsToBookInfo()
    })