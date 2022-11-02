export const Product = (data) => {
  const { name, product_count } = data.data
  return (
    <div>NAME: {name} COUNT: {product_count}</div>
  )
}
