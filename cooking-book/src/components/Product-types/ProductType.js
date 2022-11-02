import { instance } from "../../axios";

import "./ProductType.css"

export const ProductType = ({ data, reload }) => {
  const { id, name, type_name } = data;
  const deleteItem = async () => {
    await instance.delete('delete-product-type/' + id).then(res => {
      console.log(res);
      if (res.data.message) {
        console.log(res.data);
        alert(res.data.message)
      }
      reload();
    })
  }
  return (
    <div className="product_type_wrapper">
      <h3>{name}</h3>
      <hr />
      <h4>{type_name}</h4>
      <hr />
      <button onClick={deleteItem}>Delete</button>
    </div>
  )
}
