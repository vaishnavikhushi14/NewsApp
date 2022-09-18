import { getByTitle } from '@testing-library/dom'
import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
     let {title,description,imageUrl,newsUrl} = this.props
    return (
      <div className="my-3"><div className="card" >
      <img src={!imageUrl?"https://images.livemint.com/img/2022/08/16/600x338/Employee_1645171959926_1660627188081_1660627188081.png":imageUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>
        <a rel="noreffrer" href={newsUrl} target = "_blank" className="btn btn-sm btn-dark">Read More</a>
      </div>
    </div></div>
    )
  }
}

export default NewsItem