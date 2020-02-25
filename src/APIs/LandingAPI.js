import React, { Component } from 'react';

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
    
                <div>
                    <ul>
                        {hits.map(summary =>                    
                        <li key={summary.objectID}>
                            <a href={summary.url}>{summary.tittle}</a>
                            {/* <span> {summary.marketSummaryResponse.result} </span> */}
                        </li>
                        )}
                    </ul>
                        
                    );}
                </div>
            );
    }
}



// const Messages=withFirebase(LandingAPI);
export default LandingAPI


