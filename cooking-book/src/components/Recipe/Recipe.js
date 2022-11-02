import { useEffect, useState } from 'react';
import { instance } from '../../axios';
import { Product } from '../Product/Product';
import './Recipe.css'

export const Recipe = ({ data, reload }) => {
  const [products, setProducts] = useState([])
  const [hashtags, setHashtags] = useState([])
  const { name, country_name, id } = data;

  useEffect(() => {
    instance.get('recipe-products/' + id)
      .then(res =>
        setProducts(res.data)
      );
    instance.get('recipe-hashtags/' + id)
      .then(res =>
        setHashtags(res.data)
      );

  }, [id])

  const deleteItem = async () => {
    await instance.delete('delete-recipe/' + id);
    reload();
  }

  return (
    <div className="recipe_wrapper" key={id}>
      <h2>NAME: {name}</h2>
      <hr />
      <h4>COUNTRY: {country_name}</h4>
      <hr />
      <h5>HASHTAGS: {
        hashtags.map((el, i) => {
          console.log(el);
          return <p key={el.name}>
            name: {el.name}
          </p>
        })
      }</h5>
      <h5>PRODUCTS: {
        products.map((el, i) => {
          return <Product key={i} data={el} />
        })
      }</h5>
      <button onClick={deleteItem}>Delete</button>
    </div >
  )
} 