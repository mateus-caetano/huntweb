import React, { Component } from 'react'
import '../../services/api'
import api from '../../services/api'
import { Link } from 'react-router-dom'

import './styles.css'

export default class Main extends Component {

    state = {
        products: [],
        productInfo: {},
        currentPage: 1
    }

    componentDidMount() {
        this.loadProduct()
    }

    loadProduct = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`) 
        const {docs, ...productInfo} = response.data
        this.setState({products: response.data.docs, productInfo, currentPage: page})        
    }

    prevPage = () => {
        const { currentPage } = this.state

        if(currentPage === 1) return
        const pageNumber = currentPage - 1
        this.loadProduct(pageNumber)
    }

    nextPage = () => {
        const { currentPage, productInfo } = this.state

        if(currentPage === productInfo.pages) return
        const pageNumber = currentPage + 1
        this.loadProduct(pageNumber)
    }

    render() {
        const { products, currentPage, productInfo } = this.state
        return (
            <div className="product-list">{
                products.map((product) => {
                    return <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        <Link to={`/products/${product._id}`} >Acessar</Link>
                    </article>
                })}
                <div className="actions">
                    <button disabled={currentPage === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={currentPage === productInfo.pages}onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        )
    }
}