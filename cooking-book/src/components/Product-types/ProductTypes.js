import { useEffect, useState } from "react"
import { instance } from "../../axios"
import './ProductTypes.css'
import { ProductType } from "./ProductType"
import { AddProductType } from "./AddProductType"

export const ProductTypes = () => {
  const [productTypes, setProductTypes] = useState([])

  useEffect(() => {
    instance.get('product-type')
      .then(res =>
        setProductTypes(res.data)
      );
  }, [])

  const reload = () => {
    instance.get('product-type')
      .then(res =>
        setProductTypes(res.data)
      );
  }
  return (
    <div>
      {<AddProductType reload={reload} />}
      <div className="producttypes_grid">
        {
          productTypes.map((element, i) => {
            return <ProductType key={i} data={element} reload={reload} />
          })
        }
      </div>

    </div>
  )
}