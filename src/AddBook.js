import React, { Component } from 'react';
import { Button, Row, Col, Modal, Form } from 'react-bootstrap';
// import AllBookList from './AllBookList';

class AddBook extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
        };        
        this.onSubmit = this.onSubmit.bind(this);        
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    onSubmit(event){
        event.preventDefault();
        /* object of the books to store  in db */
        let books = {
            id: 0,
            book_name: this.bookNameInput.value,
            book_desc: this.bookDescInput.value,
            book_author: this.bookAuthorInput.value,
            price : this.bookPriceInput.value,
        };

        // const self = this;
        fetch('http://localhost:4000/book/',{
            method: "POST",
            body: JSON.stringify(books),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            response.json().then(data => {                                            
                this.handleClose();                
                this.props.onAdd(); /* update all books List  */
            })
        })
    }    

    render() {
        return (
            <div>                
                <Row>
                <Col md="auto">
                <Button variant="primary" onClick={this.handleShow}> Add a book</Button>
                    <br/>
                    <br/>
                </Col>
                </Row>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add book </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Book name"  ref={bookNameInput => this.bookNameInput = bookNameInput}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Author name"  ref={bookAuthorInput => this.bookAuthorInput = bookAuthorInput}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="number" placeholder="Price" ref={bookPriceInput => this.bookPriceInput = bookPriceInput}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control as="textarea" rows="3"  placeholder="Description about book"  ref={bookDescInput => this.bookDescInput = bookDescInput}/>
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

        );
    }
}

export default AddBook;
