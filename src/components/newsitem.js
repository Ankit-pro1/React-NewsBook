import React, { Component } from 'react'

export class newsitem extends Component {
    render() {
        let {title, description, imgURL, newsURL, author, date} = this.props;
        return (
            <div>
                <div className="card">
                    <img className="card-img-top" src={imgURL} alt="Card image" />
                    <div className="card-body">
                        <h4 className="card-title">{title}</h4>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small class="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()} </small></p>
                        <a href={newsURL} target="_blank" className="btn btn-dark">See Profile</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default newsitem
