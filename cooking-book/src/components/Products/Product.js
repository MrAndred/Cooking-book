
import { instance } from "../../axios";
import "./Product.css"

export const Product = ({ data, reload }) => {
  const { id, name, type_name, info } = data;
  const deleteItem = async () => {
    await instance.delete('products/' + id);
    reload()
  }
  return (
    <div className="product_wrapper">
      <h3>{name}</h3>
      <hr />
      <h4>{type_name}</h4>
      <hr />
      <h4>{info}</h4>
      <hr />
      <button onClick={deleteItem}>Delete</button>
    </div>
  )
}
