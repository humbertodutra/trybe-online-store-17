const verifyCart = (data, item) => {
  const verifyData = data.find((crrData) => {
    if (crrData.id === item.id) return crrData;
    return false;
  });
  if (verifyData) {
    console.log(verifyData);
    verifyData.quantity += 1;
    const filterData = data.filter((crrData) => crrData.id !== verifyData.id);
    return [...filterData, verifyData];
  }
  return [...data, item];
};

const adcCartItem = (item) => {
  const { id, title, thumbnail, price } = item;
  const newItem = { id, title, thumbnail, quantity: 1, price };
  if (localStorage.length > 0) {
    const data = JSON.parse(localStorage.getItem('cartItems'));
    const verifiedItens = verifyCart(data, newItem);
    localStorage.setItem('cartItems', JSON.stringify(verifiedItens));
  } else {
    localStorage.setItem('cartItems', JSON.stringify([{
      id, title, thumbnail, quantity: 1, price }]));
  }
};
export default adcCartItem;
