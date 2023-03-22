import React from 'react'

const newsitem = (props) => {
        let {title, description, imgURL, newsURL, author, date} = props;
        return (
            <div>
                <div className="card">
                    <img className="card-img-top" src={imgURL} alt="Card image" />
                    <div className="card-body">
                        <h4 className="card-title">{title}</h4>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()} </small></p>
                        <a href={newsURL} target="_blank" className="btn btn-dark">See Profile</a>
                    </div>
                </div>
            </div>
        )
    }

export default newsitem
