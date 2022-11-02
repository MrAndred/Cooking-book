import { instance } from "../../axios";
import "./DishType.css"

export const DishType = ({ data, reload }) => {
  const { id, name } = data;
  const deleteItem = async () => {
    instance.delete('dish-type/' + id)
    reload()
  }
  return (
    <div className="dish_type_wrapper">
      <h3>{name}</h3>
      <hr />
      <button onClick={deleteItem}>Delete</button>
    </div>
  )
}
