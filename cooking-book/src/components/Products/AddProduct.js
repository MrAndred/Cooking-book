import { useEffect, useState } from "react"
import { instance } from "../../axios"
export const AddProduct = ({ reload }) => {
  const [formData, setFormData] = useState({
    name: '',
    productType: '',
    info: '',
  })

  const [productTypes, setProductType] = useState([])

  const nameChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      name: event.target.value
    }))
  }

  const infoChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      info: event.target.value
    }))
  }

  const productTypeChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      productType: event.target.value
    }))
  }

  useEffect(() => {
    instance.get('product-type')
      .then(res => {
        if (res.data[0].id) {
          setFormData((prevState) => ({
            ...prevState,
            productType: res.data[0].id
          }))
        }


        setProductType(res.data)
      });
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    await instance.post('products', formData);
    reload()
  }

  return (
    <form action="">
      <div>
        <p>Name: <input type="text" onChange={nameChange} value={formData.name} /> </p>
        <p>Product Type: <select onChange={productTypeChange} name="cooking">
          {productTypes.map((element, i) => <option key={element.id} value={element.id}>{element.type_name}</option>)}
        </select> </p>
        <p>Info: <input type="text" onChange={infoChange} value={formData.info} /></p>
      </div>
      <input type="submit" onClick={handleSubmit} />
    </form>
  )
}
