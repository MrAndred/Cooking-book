import { useEffect, useState } from "react"
import { instance } from "../../axios"
import { AddHashtag } from "./AddHashtag"
import { Hashtag } from "./Hashtag"
import './Hashtags.css'

export const Hashtags = () => {
  const [cookingTypes, setCookingTypes] = useState([])

  useEffect(() => {
    reload()
  }, [])

  const reload = () => {
    instance.get('hashtags')
      .then(res =>
        setCookingTypes(res.data)
      );

  }
  return (
    <div>
      {<AddHashtag reload={reload} />}
      <div className="producttypes_grid">
        {
          cookingTypes.map((element, i) => {
            return <Hashtag key={i} data={element} reload={reload} />
          })
        }
      </div>

    </div>
  )
}