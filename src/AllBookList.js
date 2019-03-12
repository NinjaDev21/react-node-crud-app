import React, { Component } from 'react';
import {Button, Table, Modal, Form, Row, Col} from 'react-bootstrap';
import AddBook from './AddBook';

function searchForBooks(searchParams) {
    return function (getbook) {
        return getbook.book_name.toLowerCase().includes(searchParams.toLowerCase()) || getbook.book_author.toLowerCase().includes(searchParams.toLowerCase()) || !searchParams;
    }
}

class AllBookList extends Component {

    constructor(props){
        super (props);
        this.state = { books : [], show: false, editBookValue : [
                {
                    id : '',
                    book_name : '',
                    book_desc : '',
                    book_author : '',
                    price: 0,
                }]
        }
        this.getBooks = this.getBooks.bind(this);        
        this.onAdd = this.onAdd.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    componentDidMount() {
        this.getBooks();
    }        

    getBooks = _ => {
        fetch('http://localhost:4000/book')
            .then(response => response.json())
            .then(response => this.setState({books:response }))
            .catch(err=> console.error(err))
    }

    renderBooks = ({id, book_name, book_desc, price, book_author}) => <tr key={id}>
        <td>{book_name}</td>
        <td>{book_author}</td>
        <td>{price}</td>
        <td>{book_desc}</td>
        <td>
            <Button variant="warning" onClick={() =>this.onEdit(id)}>Edit</Button>
            {` `}
            <Button variant="danger" onClick={() =>this.onDelete(id)}>Delete</Button>                        
        </td>        
    </tr>

onAdd(){       
    this.getBooks();    
}

onEdit(id){            
    this.handleShow();            
    const book = this.state.books;    
    const filteredBooks = book.filter(book => {
        return book.id === id;
      });
     this.setState({ editBookValue:filteredBooks });
    this.setState({show:true});
}

    onSubmit(event){
        event.preventDefault();
        /* object of the books to store  in db */
        let books = {
            id: this.bookIdInput.value,
            book_name: this.bookNameInput.value,
            book_desc: this.bookDescInput.value,
            book_author: this.bookAuthorInput.value,
            price : this.bookPriceInput.value,
        };
        fetch('http://localhost:4000/book/',{
            method: "PUT",
            body: JSON.stringify(books),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if(response.status === 200){
                this.handleClose();
                this.getBooks();
            }
        })
    }


/**
 * function to delete a book
 * @param {*} id 
 */
onDelete(id){     
        fetch('http://localhost:4000/book/'+ id,{
            method: "DELETE",            
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if(response.status){
                this.getBooks();    
            }else{                
            }            
        })
}

    searchHandler(event){
        event.preventDefault();
        let value = this.searchBookName.value;
        if(value === ''){
            this.getBooks();
        }
        let allBooks = this.state.books;
        allBooks = allBooks.filter(searchForBooks(value)).map(book => {
            return book;
        });
        this.setState({books:allBooks});
    }



    render() {        
        const { books } = this.state;
        const id = this.state.editBookValue[0].id;
        const  book_name  = this.state.editBookValue[0].book_name;
        const  book_author  = this.state.editBookValue[0].book_author;
        const  price  = this.state.editBookValue[0].price;
        const  book_desc  = this.state.editBookValue[0].book_desc;
        return (            
            <div>

                    <Row>
                        <Col xs lg="6">
                            <AddBook onAdd={this.onAdd}/>
                        </Col>
                        <Col xs lg="6">
                            <Form.Control type="text" placeholder="type to search a book..."  ref={searchBookName => this.searchBookName = searchBookName} onKeyUp={this.searchHandler}/>
                        </Col>
                    </Row>

                    <Table striped bordered hover responsive="md">
                        <thead>
                        <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Description </th>
                        <th>Action </th>
                        </tr>
                        </thead>
                        <tbody>
                            {books.map(this.renderBooks)}
                        </tbody>
                    </Table>

                <div>

                    {/*this is a modal */}
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit book </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Group>
                                    <Form.Control type="hidden" defaultValue={id} ref={bookIdInput => this.bookIdInput = bookIdInput}/>
                                    <Form.Control type="text" placeholder="Book name"  ref={bookNameInput => this.bookNameInput = bookNameInput} defaultValue={book_name}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Author name"  ref={bookAuthorInput => this.bookAuthorInput = bookAuthorInput} defaultValue={book_author}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="number" placeholder="Price" ref={bookPriceInput => this.bookPriceInput = bookPriceInput} defaultValue={price}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control as="textarea" rows="3"  placeholder="Description about book"  ref={bookDescInput => this.bookDescInput = bookDescInput} defaultValue={book_desc}/>
                                </Form.Group>
                                <Button variant="primary" type="button" onClick={this.onSubmit}>
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>
                </div>
                {/*this is a modal */}

            </div>


        );
    }
}

export default AllBookList;
