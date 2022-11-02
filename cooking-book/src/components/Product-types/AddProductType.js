import { useState } from "react"
import { instance } from "../../axios"
export const AddProductType = ({ reload }) => {
  const [formData, setFormData] = useState({
    type_name: '',
  })

  const typNameChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      type_name: event.target.value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await instance.post('product-types', formData);
    reload()
  }

  return (
    <form action="">
      <div>
        <p>Type name: <input type="text" onChange={typNameChange} value={formData.type_name} /></p>
      </div>
      <input type="submit" onClick={handleSubmit} />
    </form>
  )
}
