import ProductVarinetsListItems from '../ProductVarientsListItems'
import './index.css'

const ListItems = props => {
  const {Details, FlexGrid} = props
  const {productBadge, productImage, productTitle, productVariants} = Details
  console.log(productTitle[0])

  return (
    <li className={FlexGrid ? 'ListItemsContainer2' : 'ListItemsContainer'}>
      <div className="ContainerImgBadgeHeading">
        <img src={productImage} alt="productImage" className="imgSizing2" />
        <h1 className={FlexGrid ? 'HeadingBadge2' : 'HeadingBadge'}>
          {productBadge}
        </h1>
      </div>
      <div className="ProductVarListItemsContainer">
        <h1 className="HeadingTitle">{productTitle}</h1>
        {productVariants.map(eachItem => (
          <ProductVarinetsListItems Events={eachItem} />
        ))}
      </div>
    </li>
  )
}
export default ListItems
