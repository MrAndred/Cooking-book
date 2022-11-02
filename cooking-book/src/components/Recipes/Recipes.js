import { useEffect, useState } from "react"
import { instance } from "../../axios"
import { Recipe } from "../Recipe/Recipe"
import { AddRecipie } from "./AddRecipie"
import './Recipes.css'
export const Recipes = () => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    reload()

  }, [])
  const reload = () => {
    instance.get('all-recipes')
      .then(res =>
        setRecipes(res.data)
      );
  }

  return (
    <div>
      <div>
        <AddRecipie reload={reload} />
      </div>
      <div className="recipes_grid">
        {
          recipes.map((element, i) => {
            return <Recipe key={i} data={element} reload={reload}/>
          })
        }
      </div>

    </div>
  )
}