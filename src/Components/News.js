import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes  from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
      }
    static propTypes={
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string
    }
    constructor(){
        super();
        this.state = {
        articles : [],
        loading : false,
        page : 1,
        //totalResults: 0
        
        

        }


        
    }

   async componentDidMount(){
          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f07e7c6aaebc452ca1ce1b52b4f47331&page=1&pageSize=${this.props.pageSize}`;
          this.setState({
            loading : true
        });
          let data = await fetch(url);
          console.log(data);
          let parsedData = await data.json();
          this.setState ({articles: parsedData.articles,totalResults: parsedData.totalResults,loading :false});
       
        }

        handleNextClick=async () =>{
            if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)))
            {
                let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f07e7c6aaebc452ca1ce1b52b4f47331&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
                this.setState({
                    loading : true
                });
                let data = await fetch(url);
                console.log(data);
                let parsedData = await data.json();
               
                this.setState({
                    page: this.state.page+1,
                    articles: parsedData.articles,
                    loading :false
                })

            }
            else{
      
        }
        }

        handlePreviousClick=async () =>{
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f07e7c6aaebc452ca1ce1b52b4f47331&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
            this.setState({
                loading : true
            });
            let data = await fetch(url);
            console.log(data);
            let parsedData = await data.json();
           
            this.setState({
                page: this.state.page-1,
                articles: parsedData.articles,
                loading : false
            })
           
        }


  render() {
    return (<>
    
    <div className="container my-3" >
      <h2 className="text-center" style={{margin:'40px 0'}}>News Monkey - Top Headlines</h2>
      {this.state.loading && <Spinner/>}
      <div className="row">
     {!this.state.loading && this.state.articles.map((element)=>{
         return <div className="col-md-4" key ={element.url}>
          <NewsItem  title ={element.title} description = {element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div>
      })}
     
       
       
      </div>
      <div className="container d-flex justify-content-between">
      <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousclick}>&laquo; Previous</button>
      <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
      </div>
      
      
      </div>
      
      </>
    )
  }
}

export default News