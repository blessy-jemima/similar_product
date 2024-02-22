import {Component} from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import Loader from 'react-loader-spinner'
import SimilarProductItem from '../SimilarProductItem'
import FiltersGroup from '../FiltersGroup'
import Header from '../Header'
import './index.css'

class ProductItemDetails extends Component {
  state = {productItemList: [], isLoading: true,count:1,isSuccess:false}

  componentDidMount() {
    this.getProuductDetails()
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getProductInfo= product=>{
      title: product.title,
      brand: product.brand,
      price: product.price,
      description: product.description,
      id: product.id,
      imageUrl: product.image_url,
      rating: product.rating,
      totalReview: product.total_review,
      availability: product.availability,
      style:product.style,
}

getSimilarProductInfo= product=>{
    title: product.title,
      brand: product.brand,
      price: product.price,
      description: product.description,
      id: product.id,
      imageUrl: product.image_url,
      rating: product.rating,
      totalReview: product.total_review,
      availability: product.availability,
      style:product.style,
}

  getProuductDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/products/${id}`)
    const fetchedData = await response.json()
    const formattedData = {
        productInfo:fetchedData.map(each=>this.getProductInfo(each))
        similarProductInfo:fetchedData.similar_products.map(each=>this.getSimilarProductInfo(each))
    }
   if(response.ok===true){
       this.setState({isLoading:false,isSuccess:true})
   }

   if(response.status===404){
       this.setState({isLoading:false,isSuccess:false})
   }

   this.setState({productItemList:formattedData})
  }

onClickPlus=()=>{
    this.setState(prevState=>({count:prevState.count+1}))
}

onClickMinus=()=>{
    if(count<=0){
        this.setState({count:1})
    }else{
        this.setState(prevState=>({count:prevState.count-1}))
    }
}

  renderProductDetails = ()=>{
      const{productItemList,count}= this.state 
      const{productInfo} = productItemList
      const{imageUrl,title,price,rating,totalReview,description,availability,brand}=productInfo

    return(
        <>
        <Header/>
        <div className="product-container">
            <img src={imageUrl} alt={title} className="product-img"/>
            <div className="product-inner-card">
                <h1 className='product-title'>{title}</h1>
                <p className='product-price'>Rs {price}/</p>
                <div className="product-rating-container">
                      <div className="rating-container">
            <p className="product-rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="product-star"
            />
          </div>
          <p className='product-review'>{totalReview}</p>
                </div>
                <p className='product-description'>{description}</p>
                <p className='product-availability'><span className='span'>Availability: </span>{availability}</p>
                 <p className='product-brand'><span className='span'>Brand: </span>{brand}</p>
                 <hr className='hr'/>
                 <div className='button-container'>
                     <button type="button" className="btn-icon" onClick={this.onClickPlus}>
                     <CiSquarePlus/>
                 </button>
                 <p className="count">{count}</p>
                 <button type="button" className="btn-icon" onClick={this.onClickMinus}>
                     <CiSquareMinus/>
                 </button>
                 </div>
                 <button type="button" className='cart-btn'>
                     Add to Cart
                 </button>
            </div>
        </div>
        </>
    )
  }


  renderFailureView = ()=>{
    <div className='failure-container'>
    <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png" alt="error view" className="failure-img"/>
    <p className='failure-para'>Product Not Found</p>
    </div>
  }

  render() {
    const {isLoading,productItemList,isSuccess} = this.state
    const{similarProductInfo} = productItemList
    return (
      <div>
        <FiltersGroup />
        {isLoading ? this.renderLoadingView() : ''}
        {isSuccess?this.renderProductDetails():this.renderFailureView()}
        <ul className="similar-product-container">
        {similarProductInfo.map(each=>(
            <SimilarProductItem key={each.id} similarProductDetails={each} />
        ))}</ul>
      </div>
    )
  }
}

export default ProductItemDetails
