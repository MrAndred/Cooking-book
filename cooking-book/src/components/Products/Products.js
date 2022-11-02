import { useEffect, useState } from "react"
import { instance } from "../../axios"
import { AddProduct } from "./AddProduct"
import { Product } from "./Product"
import './Products.css'

export const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    reload()

  }, [])
  const reload = () => {
    instance.get('products')
      .then(res =>
        setProducts(res.data || [])
      );
  }

  return (
    <div>
      <div>
        <AddProduct reload={reload} />
      </div>
      <div className="products_grid">
        {
          products.map((element, i) => {
            return <Product key={i} data={element} reload={reload} />
          })
        }
      </div>

    </div>
  )
}