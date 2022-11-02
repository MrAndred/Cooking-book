import { useState } from "react"
import { instance } from "../../axios"
export const AddCountry = ({ reload }) => {
  const [formData, setFormData] = useState({
    country_name: '',
  })

  const countryNameChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      country_name: event.target.value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await instance.post('nationality', formData);
    reload()
  }

  return (
    <form action="">
      <div>
        <p>Country name: <input type="text" onChange={countryNameChange} value={formData.country_name} /></p>
      </div>
      <input type="submit" onClick={handleSubmit} />
    </form>
  )
}
