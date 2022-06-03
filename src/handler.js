const books = require('./book');
const { nanoid } = require('nanoid');

// Handler Menyimpan Buku
const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;


    if (name === undefined) {


        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;

    }

    if (readPage > pageCount) {


        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;

    }



    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const finished = pageCount === readPage;

    const newBooks = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading,
        insertedAt, updatedAt
    }

    books.push(newBooks);

    const isSuccess = books.filter((books) => books.id === id).length > 0;

    if (isSuccess) {

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    } else {

        const response = h.response({
            status: 'error',
            message: 'Buku gagal ditambahkan',
        });
        response.code(500);
        return response;

    }



};

// Handler Menampilkan Seluruh Buku
const showAllBookHandler = (request, h) => {

    const { name, reading, finished } = request.query;

    // Query Reading
    if (reading == 1) {

        const checkBook = books.filter((b) => b.reading === true);

        var book = [];
        for (var i in checkBook){
            book.push({
                id: books[i].id,
                name: books[i].name,
                publisher: books[i].publisher
            });
        }

        const response = h.response({
            status: 'success',
            data: {
                books: book
            }
        });
        response.code(200);
        return response;

    } else if (reading == 0) {

        const checkBook = books.filter((b) => b.reading === false);

        var book = [];
        for (var i in checkBook){
            book.push({
                id: books[i].id,
                name: books[i].name,
                publisher: books[i].publisher
            });
        }

        const response = h.response({
            status: 'success',
            data: {
                books: book
            }
        });
        response.code(200);
        return response;

    }

    // Query Finished
    if (finished == 1) {

        const checkBook = books.filter((b) => b.finished === true);

        var book = [];
        for (var i in checkBook){
            book.push({
                id: books[i].id,
                name: books[i].name,
                publisher: books[i].publisher
            });
        }

        const response = h.response({
            status: 'success',
            data: {
                books: book
            }
        });
        response.code(200);
        return response;

    } else if (finished == 0) {

        const checkBook = books.filter((b) => b.finished === false);

        var book = [];
        for (var i in checkBook){
            book.push({
                id: books[i].id,
                name: books[i].name,
                publisher: books[i].publisher
            });
        }

        const response = h.response({
            status: 'success',
            data: {
                books: book
            }
        });
        response.code(200);
        return response;

    }

    // Query Name
    if (name !== undefined) {
        const checkBook = books.filter((b) => b.name.toLowerCase().match(name.toLowerCase()));
        var book = [];
        for (var i in checkBook){
            book.push({
                id: books[i].id,
                name: books[i].name,
                publisher: books[i].publisher
            });
        }

        const response = h.response({
            status: 'success',
            data: {
                books: book
            }
        });
        response.code(200);
        return response;
        
    }



    const booksLength = books.length
    if (booksLength === 0) {

        const response = h.response({
            status: 'success',
            data: {
                books: books
            }
        });
        response.code(200);
        return response;

    } else {

        var book = [];
        for (var i in books){
            book.push({
                id: books[i].id,
                name: books[i].name,
                publisher: books[i].publisher
            });
        }


        const response = h.response({
            status: 'success',
            data: {
                books: book
            }
        });
        response.code(200);
        return response;

    }

};

// Handler Menampilkan Detail Buku
const showDetailBookHandler = (request, h) => {
    const { bookId } = request.params;

    const checkBook = books.filter((b) => b.id === bookId)[0];

    if (checkBook !== undefined) {

        const response = h.response({
            status: 'success',
            data: {
                book: checkBook
            }
        });
        response.code(200);
        return response;

    } else {

        const response = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan'
        });
        response.code(404);
        return response;
    }
}

// Handler Mengubah Data Buku
const editBookHandler = (request, h) => {

    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();

    if (name === undefined) {

        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;

    }

    if (readPage > pageCount) {

        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;

    }

    const indexBooks = books.findIndex((books) => books.id === bookId);

    if (indexBooks !== -1) {

        books[indexBooks] = {
            ...books[indexBooks],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;

    } else {

        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    }

}

// Handler Menghapus Buku
const deleteBookHandler = (request, h) => {
    const { bookId } = request.params;
    const checkBook = books.findIndex((book) => book.id === bookId);

    if (checkBook !== -1) {

        books.splice(checkBook, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;

    } else {

        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        });
        response.code(404);
        return response;

    }

}


module.exports = {
    addBookHandler,
    showAllBookHandler,
    showDetailBookHandler,
    editBookHandler,
    deleteBookHandler,

}