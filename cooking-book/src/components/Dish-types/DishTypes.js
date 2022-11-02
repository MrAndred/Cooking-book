import { useEffect, useState } from "react"
import { instance } from "../../axios"
import { AddDishType } from "./AddDishType"
import { DishType } from "./DishType"
import './DishTypes.css'

export const DishTypes = () => {
  const [dishTypes, setDishTypes] = useState([])

  useEffect(() => {
    reload()
  }, [])

  const reload = () => {
    instance.get('dish-type')
      .then(res =>
        setDishTypes(res.data)
      );
  }
  return (
    <div>
      {<AddDishType reload={reload} />}
      <div className="producttypes_grid">
        {
          dishTypes.map((element, i) => {
            return <DishType key={i} data={element} reload={reload} />
          })
        }
      </div>

    </div>
  )
}