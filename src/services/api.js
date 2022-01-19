export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const request = await fetch(URL);
  const response = await request.json();

  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const URLQuery = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const URLCategory = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const URLQueryCategory = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  let response = '';
  if (!categoryId) response = await fetch(URLQuery);
  if (!query) response = await fetch(URLCategory);
  response = await fetch(URLQueryCategory);
  return response.json();
}
