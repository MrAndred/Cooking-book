import { useState } from "react"
import { instance } from "../../axios"
export const AddHashtag = ({ reload }) => {
  const [formData, setFormData] = useState({
    hashtag: '',
  })

  const hashtagNameChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      hashtag: event.target.value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await instance.post('hashtag', formData);
    reload()
  }

  return (
    <form action="">
      <div>
        <p>Hashtag: <input type="text" onChange={hashtagNameChange} value={formData.hashtag} /></p>
      </div>
      <input type="submit" onClick={handleSubmit} />
    </form>
  )
}
