const {
    addBookHandler,
    showAllBookHandler,
    showDetailBookHandler,
    editBookHandler,
    deleteBookHandler
} = require("./handler");

const routes = [

    // Route Menyimpan Buku
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },

    // Route Menampilkan Seluruh Buku
    {
        method: 'GET',
        path: '/books',
        handler: showAllBookHandler,
    },

    // Route Menampilkan Detail Buku
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: showDetailBookHandler,
    },

    // Route Mengubah Data Buku
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBookHandler,
    },

    // Route Menghapus Buku
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookHandler
    },

];

module.exports = routes;