import React, { Component } from 'react';
import styled from "styled-components";
import StockItem from '../Components/StockItem';

const Div = styled.div`
  background-color:#F7DC6F;
  margin 40px;
  align-text: centre;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  text-align: center;
`;
const Ul = styled.ul`
  display: flex;
  flex-direction: column;

`;
export const Li = styled.li`
  color: red;

`;
const A = styled.a`
  height: 40px;
  width: 500px;
  
`;
const Span = styled.span`
  height: 40px;
  width: 500px;
  
`;

const Input = styled.input`
  font-size: 16px;
  border: solid 1px #dbdbdb;
  color: #262626;
  padding: 7px 33px;
  border-radius: 10px;
  color: #999;
  cursor: text;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  background: #fafafa;
  &:active,
  &:focus {
    text-align: left;
  }
`;

const response = {
    "price": 273.52,
    "beta": "1.228499",
    "volAvg": "32629022",
    "mktCap": "1.19678121E12",
    "lastDiv": "2.92",
    "range": "169.5-327.85",
    "changes": -19.13,
    "changesPercentage": "(-6.54%)",
    "companyName": "Apple Inc.",
    "exchange": "Nasdaq Global Select",
    "industry": "Computer Hardware",
    "website": "http://www.apple.com",
    "description": "Apple Inc is designs, manufactures and markets mobile communication and media devices and personal computers, and sells a variety of related software, services, accessories, networking solutions and third-party digital content and applications.",
    "ceo": "Timothy D. Cook",
    "sector": "Technology",
    "image": "https://financialmodelingprep.com/images-New-jpg/AAPL.jpg"
}
const BASE_URL = 'https://financialmodelingprep.com/api/v3/';
const COMPANY_PROFILE = 'company/profile/';
const SYMBOL = 'AAPL';
// https://financialmodelingprep.com/api/v3/search?query=AA&limit=10&exchange=NASDAQ
const LIMIT = '&limit=10';
const EXCHANGE = '&exchange=NASDAQ';
const API = 'https://financialmodelingprep.com/api/v3/company/profile/AAPL';
const SEARCH = 'search?query=';
const SEARCH_SYMBOL = 'AA';

//const defaultQuery = "redux";

class Landing2 extends Component {
    constructor(props) {
        super(props);
        this.state = {

            symbol: "",
            profile: {},
            isLoading: false,
            error: null,


        };

    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        //alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
        console.log("FORM SUBMITTED; DO SEARCH")
        this.setState({ isLoading: true });

        fetch(BASE_URL + SEARCH + this.state.symbol.toUpperCase() + LIMIT + EXCHANGE)
            //fetch(BASE_URL + COMPANY_PROFILE + SYMBOL)
            .then(response => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Something went wrong...")
                }
            })
            //.then(data => { this.setState({ symbol: data.symbol, profile: data.profile, isLoading: false }) })
            .then(data => { this.setState({ data: data, isLoading: false }) })
            .catch(error => this.setState({ error, isLoading: false }));
    }
    componentDidMount() {
        /*         this.setState({ isLoading: true });
        
                fetch(BASE_URL + SEARCH + SEARCH_SYMBOL + LIMIT + EXCHANGE)
                    //fetch(BASE_URL + COMPANY_PROFILE + SYMBOL)
                    .then(response => {
                        console.log(response);
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error("Something went wrong...")
                        }
                    })
                    //.then(data => { this.setState({ symbol: data.symbol, profile: data.profile, isLoading: false }) })
                    .then(data => { this.setState({ data: data, isLoading: false }) })
                    .catch(error => this.setState({ error, isLoading: false })); */

        //this.setState({ isLoading: false, profile: response })
    }

    render() {
        const { symbol, profile, isLoading, error } = this.state;
        if (error) {
            return <p> {error.message}</p>;
        }
        if (isLoading) {

            return <p> Loading.....</p>;
        }
        console.log(profile);
        return (

            <Div>
                <form onSubmit={this.handleSubmit}>
                    <Input value={this.state.symbol} name="symbol" type="text" placeholder="Search" onChange={this.handleChange} />
                </form>
                <Ul>
                    {/* hits.map(summary =>                    
                        <Li key={summary.symbol}>
                            <A href={summary.image}>{summary.companyName}</A>
                        <Span> {summary.description} </Span>
                        </Li>
                        ) */}

                    {this.state.data && this.state.data.map((stock, index) => <Li key={index}><StockItem data={stock} /></Li>)}
                </Ul>
            </Div>
        );
    }
}



// const Messages=withFirebase(LandingAPI);
export default Landing2;