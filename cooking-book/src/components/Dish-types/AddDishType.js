import { useState } from "react"
import { instance } from "../../axios"
export const AddDishType = ({ reload }) => {
  const [formData, setFormData] = useState({
    name: '',
  })

  const nameChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      name: event.target.value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await instance.post('dish-type', formData);
    reload()
  }

  return (
    <form action="">
      <div>
        <p>Dish Type: <input type="text" onChange={nameChange} value={formData.name} /></p>
      </div>
      <input type="submit" onClick={handleSubmit} />
    </form>
  )
}
