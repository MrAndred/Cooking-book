import { useEffect, useState } from "react"
import { instance } from "../../axios"
export const AddRecipie = ({ reload }) => {
  const hashes = {};
  const prods = {};
  const [formData, setFormData] = useState({
    name: '',
    nationality: '',
    dish: ''
  })

  const [nationality, setNationality] = useState([])
  const [dish, setDish] = useState([])
  const [hashtags, setHashtag] = useState([])
  const [products, setProducts] = useState([])

  const nameChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      name: event.target.value
    }))
  }

  const nationalityChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      nationality: event.target.value
    }))
  }

  const dishChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      dish: event.target.value
    }))
  }

  useEffect(() => {
    instance.get('nationality')
      .then(res => {
        if (res.data.length > 0) {
          setFormData((prevState) => ({
            ...prevState,
            nationality: res.data[0].id
          }))
        }
        setNationality(res.data)
      }
      );

    instance.get('all-dishes')
      .then(res => {
        if (res.data.length > 0) {
          setFormData((prevState) => ({
            ...prevState,
            dish: res.data[0].id
          }))
        }
        return setDish(res.data)
      }
      );

    instance.get('hashtags')
      .then(res =>
        setHashtag(res.data)
      );

    instance.get('products')
      .then(res => {
        if (res.data) {
          return setProducts(res.data)
        }
      }
      );

  }, [])

  const toggleChangeHash = (event) => {
    if (event.target.checked) {
      hashes[event.target.value] = event.target.value
    }
    else {
      delete hashes[event.target.value]
    }
  }

  const toggleChangeProds = (event) => {
    if (event.target.checked) {
      prods[event.target.value] = event.target.value
    }
    else {
      delete prods[event.target.value]
    }
  }

  const addRecipe = async (event) => {
    event.preventDefault();
    await instance.post('add-recipe', {
      formData,
      hashtags: hashes,
      products: prods
    })
    reload()
  }

  return (
    <form>
      <div>
        <p>Name: <input type="text" onChange={nameChange} value={formData.name} /> </p>
        <p>Nationality: <select onChange={nationalityChange} name="nationality">
          {nationality.map((element, i) => <option key={element.id} value={element.id}>{element.country_name}</option>)}
        </select></p>
        <p>Dish: <select onChange={dishChange} name="nationality">
          {dish.map((element, i) => <option key={element.id} value={element.id}>{element.name}</option>)}
        </select></p>
      </div>

      <div style={{ display: "flex" }}>
        HASHTAGS: {hashtags.map((element, i) =>
          <p key={element.id}><input type="checkbox" onChange={toggleChangeHash} value={element.id} />{element.name}</p>
        )}
      </div>

      <div style={{ display: "flex" }}>
        PRODUCTS: {products.map((element, i) =>
          <p key={element.id}><input type="checkbox" onChange={toggleChangeProds} value={element.id} />{element.name}</p>
        )}
      </div>
      <input type="submit" onClick={addRecipe} />
    </form>
  )
}
