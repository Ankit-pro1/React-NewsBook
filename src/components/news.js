import React, { Component } from 'react'
import Newsitem from './newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class news extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        // pageSize: PropTypes.number,
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(props.category)} - News Book`;
    }
    
    async componentDidMount() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a6906cc0799b4e16beb6388028bbab44&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        this.props.setProgress(20);
        let parseData = await data.json();
        this.props.setProgress(30);
        console.log(parseData);

        this.setState({ articles: parseData.articles, 
                        totalResults: parseData.totalResults,
                        loading: false});
        console.log(this.state.totalResults);
        this.props.setProgress(100);
    }

    fetchMoreData =  async () => {
        this.setState({ page: this.state.page + 1 })

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a6906cc0799b4e16beb6388028bbab44&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true });

        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);

        this.setState({ 
                        articles: this.state.articles.concat(parseData.articles),
                        totalResults: parseData.totalResults,
                        loading: false 
                     });
        console.log(this.state.totalResults);
    }

    render() {
        return (
            <>
                <div className="container my-2">
                    <div className="row">
                        <h1 className="text-center">News Book on {this.capitalizeFirstLetter(this.props.category)}</h1>
                    </div>
                </div>
                {this.state.loading && <Spinner />}

                <div className='container my-2'>
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length!==this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className="row my-4">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <Newsitem title={element.title} description={element.description ? element.description.slice(0, 100) : ""} imgURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} />
                                </div>
                            })}
                        </div>
                    </InfiniteScroll>
                </div>
            </>
        )
    }
}

export default news
