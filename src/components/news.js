import React, { useEffect, useState } from 'react'
import Newsitem from './newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) =>{
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    document.title = `${capitalizeFirstLetter(props.category)} - News Book`;

    const newsUpdate = async() => {
        props.setProgress(10);

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;

        setLoading(true);
        let data = await fetch(url);
        props.setProgress(20);

        let parseData = await data.json();
        props.setProgress(30);
                
        setArticles(parseData.articles)
        setLoading(false)
        setTotalResults(parseData.totalResults)

        // console.log(this.state.totalResults);
        props.setProgress(100);
    }

    useEffect(()=>{
        newsUpdate();
    },[])

    const fetchMoreData =  async () => {
        setPage(page+1)

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
        setLoading(true);

        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        setArticles(articles.concat(parseData.articles));
        setTotalResults(parseData.totalResults);
        setLoading(false)
    }

        return (
            <>
                <div className="container my-2">
                    <div className="row" style={{marginTop: 76}}>
                        <h1 className="text-center">News Book on {capitalizeFirstLetter(props.category)}</h1>
                    </div>
                </div>
                {loading && <Spinner />}

                <div className='container my-2'>
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length!==totalResults}
                        loader={<Spinner />}
                    >
                        <div className="row my-4">
                            {articles.map((element) => {
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


News.defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    // pageSize: PropTypes.number,
}

export default News
