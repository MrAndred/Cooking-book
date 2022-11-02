import { useEffect, useState } from "react"
import { instance } from "../../axios"
export const AddDish = ({ reload }) => {
  const [formData, setFormData] = useState({
    name: '',
    dishType: ''
  })

  const [dishTypes, setDishType] = useState([])

  const nameChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      name: event.target.value
    }))
  }


  const dishTypeChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      dishType: event.target.value
    }))
  }

  useEffect(() => {
    instance.get('dish-type')
      .then(res => {
        console.log(res.data);
        setDishType(res.data)

        if (res.data[0].id) {
          setFormData((prevState) => ({
            ...prevState,
            dishType: res.data[0].id
          }))
        }
      });
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    await instance.post('dishes', formData);
    reload();
  }

  return (
    <form action="">
      <div>
        <p>Name: <input type="text" onChange={nameChange} value={formData.name} /> </p>
        <p>Dish Type: <select onChange={dishTypeChange} name="cooking">
          {dishTypes.map((element, i) => <option key={element.id} value={element.id}>{element.name}</option>)}
        </select> </p>
      </div>
      <input type="submit" onClick={handleSubmit} />
    </form>
  )
}
