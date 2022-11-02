import { useState, useEffect } from "react";
import { instance } from "../../axios";
import { Dish } from "../Dish/Dish";
import { AddDish } from "./AddDish";
import "./Dishes.css"
export const Dishes = () => {
  const [dishes, setDishes] = useState([])

  useEffect(() => {
    reload()
  }, [])

  const reload = () => {
    instance.get('all-dishes')
      .then(res =>
        setDishes(res.data)
      );
  }
  return (
    <div>
      <div>
        {<AddDish reload={reload} />}
      </div>
      <div className="dishes_grid">
        {
          dishes.map((element, i) => {
            return <Dish key={i} data={element} reload={reload} />
          })
        }
      </div>
    </div>

  )
}
