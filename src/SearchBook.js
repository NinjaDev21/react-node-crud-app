import React, { Component } from 'react';
// import { Button, Table } from 'react-bootstrap';

class SearchBook extends Component {

    constructor(props){
        super (props);        
    }

    componentDidMount() {

    }

    render() {

        return (
            <div>
                {this.props.sendId}
                    i am coming to search you !
            </div>

        );
    }
}

export default SearchBook;

