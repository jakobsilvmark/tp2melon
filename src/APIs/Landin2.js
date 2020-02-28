import React, { Component } from 'react';
import styled from "styled-components";

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
const Li = styled.li`
  color: blue;

`;
const A = styled.a`
  height: 40px;
  width: 500px;
  
`;
const Span = styled.span`
  height: 40px;
  width: 500px;
  
`;

const API= 'https://financialmodelingprep.com/api/v3/company/profile/AAPL';

const defaultQuery="redux";

class Landing2 extends Component {
    constructor(props){
        super(props);
        this.state={
            
            symbol:" ",
            profile: {},
            isLoading: false,
            error: null,
            

        };
    }
    componentDidMount(){
        this.setState({isLoading: true});
        
        fetch(API+defaultQuery) 
        .then(response => {
            console.log(response);
            if (response.ok){
                return response.json();
            } else {
                throw new Error("Something went wrong...")
            }
            })
        .then (data=>{ this.setState({symbol: data.symbol, profile: data.profile, isLoading:false})})
        .catch(error => this.setState({error, isLoading: false}));
    }      
    
    render() {
            const {symbol, profile, isLoading, error}=this.state;
            if (error){
            return <p> {error.message}</p>;
            }
            if (isLoading){
                console.log(symbol, profile );
                return <p> Loading.....</p>;
            }
            return(
    
                <Div>
                    <Ul>
                        {hits.map(summary =>                    
                        <Li key={summary.symbol}>
                            <A href={summary.image}>{summary.companyName}</A>
                        <Span> {summary.description} </Span>
                            {/* <span> {summary.marketSummaryResponse.result} </span> */}
                        </Li>
                        )}
                    </Ul>
                        
                    );}
                </Div>
            );
    }
}



// const Messages=withFirebase(LandingAPI);
export default Landing2;

