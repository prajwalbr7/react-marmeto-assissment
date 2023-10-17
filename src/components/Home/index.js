import {Component} from 'react'
import ListItems from '../ListItems'
import './index.css'

const Loader = require('react-loader')

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    Data: [],
    FlexGrid: false,
    InputValue: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.GetListOfItems()
  }

  GetListOfItems = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {InputValue} = this.state
    console.log(InputValue)
    const Url = `https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093?search=${InputValue}`
    const response = await fetch(Url)
    const responseData = await response.json()
    console.log(responseData)

    if (response.ok) {
      this.setState({
        Data: responseData.data,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  OnChangeEventHandler = event => {
    this.setState({InputValue: event.target.value})
  }

  DataFetchedShow = event => {
    if (event.key === 'Enter') {
      this.GetListOfItems()
    }
  }

  ChangeFlexGrid = () => {
    this.setState(prevState => ({FlexGrid: !prevState.FlexGrid}))
  }

  RenderSuccessView = () => {
    const {Data, FlexGrid, InputValue} = this.state

    const UpDateDataFormat = Data.map(eachItem => ({
      productBadge: eachItem.product_badge,
      productImage: eachItem.product_image,
      productTitle: eachItem.product_title,
      productVariants: eachItem.product_variants,
    }))
    const SortProduct = UpDateDataFormat.filter(eachItem =>
      eachItem.productTitle.toLowerCase().includes(InputValue.toLowerCase()),
    )
    const NoDataFound = SortProduct.length > 0

    return NoDataFound ? (
      <ul className={FlexGrid ? 'UlStyleContainer2' : 'UlStylingHome'}>
        {SortProduct.map(eachItem => (
          <ListItems
            Details={eachItem}
            key={eachItem.productTitle}
            FlexGrid={FlexGrid}
          />
        ))}
      </ul>
    ) : (
      <div className="NoProductsFoundContainer">
        <h1 className="NoProductsFoundHeading">No Products Found</h1>
      </div>
    )
  }

  renderLoader = () => <div className="LoaderContainer">{Loader}</div>

  renderFailureDataFetched = () => {
    const ErrorMessage = 'Oop s 404 Error'
    return <h1 className="">{ErrorMessage}</h1>
  }

  renderStateOfFetchedData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.RenderSuccessView()

      case apiStatusConstants.failure:
        return this.renderFailureDataFetched()

      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="MainContainer">
        <h1 className="">PLP</h1>
        <div className="ContainerInputElements">
          <input
            type="search"
            placeholder="Type something to search ..."
            className="InputStyle"
            onChange={this.OnChangeEventHandler}
            onKeyDown={this.DataFetchedShow}
          />
          <button className="Button1" type="button">
            <img src="/img/list 1.jpg" alt="List1" className="List1" />
          </button>
          <button
            className="Button1"
            type="button"
            onClick={this.ChangeFlexGrid}
          >
            <img src="/img/menu 1.jpg" alt="menu1" className="List1" />
          </button>
        </div>
        {this.renderStateOfFetchedData()}
      </div>
    )
  }
}
export default Home
