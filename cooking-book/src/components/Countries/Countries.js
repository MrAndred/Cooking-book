import { useEffect, useState } from "react"
import { instance } from "../../axios"
import { AddCountry } from "./AddCountry"
import './Countries.css'
import { Country } from "./Country"

export const Countries = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    reload();
  }, [])

  const reload = () => {
    instance.get('nationality')
      .then(res =>
        setCountries(res.data)
      );
  }
  return (
    <div>
      {<AddCountry reload={reload} />}
      <div className="producttypes_grid">
        {
          countries.map((element, i) => {
            return <Country key={i} data={element} reload={reload} />
          })
        }
      </div>

    </div>
  )
}