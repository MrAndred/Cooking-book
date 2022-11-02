import { instance } from '../../axios'
import './Dish.css'

export const Dish = ({ data, reload }) => {
  const { id, name, dish_type } = data
  const deleteItem = async () => {
    await instance.delete('/dishes/' + id);
    reload();
  }
  return (
    <div className="dish_wrapper" key={id}>
      <h2>NAME: {name}</h2>
      <hr />
      <h4>DISH_TYPE: {dish_type}</h4>
      <hr />
      <button onClick={deleteItem}>Delete</button>
    </div>
  )
}
