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




const API= 'https://hn.algolia.com/api/v1/search?query=';
const defaultQuery="redux";

class LandingAPI extends Component {
    constructor(props){
        super(props);
        this.state={
            
            hits:[],
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
        .then (data=>{ this.setState({hits: data.hits, isLoading:false})})
        .catch(error => this.setState({error, isLoading: false}));
    }      
    
    render() {
            const {hits, isLoading, error}=this.state;
            if (error){
            return <p> {error.message}</p>;
            }
            if (isLoading){
                console.log(hits);
                return <p> Loading.....</p>;
            }
            return(
    
                <Div>
                    <Ul>
                        {hits.map(summary =>                    
                        <Li key={summary.objectID}>
                            <A href={summary.url}>{summary.title} </A>
                            {/* <span> {summary.marketSummaryResponse.result} </span> */}
                        </Li>
                        )}
                    </Ul>
                        
                    
                </Div>
            );
    }
}



// const Messages=withFirebase(LandingAPI);
export default LandingAPI


