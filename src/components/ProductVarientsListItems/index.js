import './index.css'

const ProductVarinetsListItems = props => {
  const {Events} = props
  const {v1, v2, v3} = Events
  return (
    <div className="ProductListItemsMainContainer">
      <p className="ParaV1">{v1}</p>
      <p className="ParaV1">{v2}</p>
      <p className="ParaV1">{v3}</p>
    </div>
  )
}
export default ProductVarinetsListItems
