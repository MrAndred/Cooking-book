
import { instance } from "../../axios";
import "./Hashtag.css"

export const Hashtag = ({ data, reload }) => {
  const { id, name } = data;
  const deleteItem = async () => {
    await instance.delete('hashtag/' + id)
    reload()
  }
  return (
    <div className="cooking_type_wrapper">
      <h3>{name}</h3>
      <hr />
      <button onClick={deleteItem}>Delete</button>
    </div>
  )
}
