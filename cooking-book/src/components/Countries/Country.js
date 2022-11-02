
import { instance } from "../../axios";
import "./Country.css"

export const Country = ({ data, reload }) => {
  const { id, country_name } = data;
  const deleteItem = async () => {
    await instance.delete('nationality/' + id);
    reload();
  }
  return (
    <div className="country_wrapper">
      <h3>{country_name}</h3>
      <hr />
      <button onClick={deleteItem}>Delete</button>
    </div>
  )
}
