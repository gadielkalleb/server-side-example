module.exports = async (model, conditions, params) => {
  const total = await model.countDocuments(conditions)
  const pageSize = parseInt(params.pageSize) || 5
  const currentPage = parseInt(params.page) || 0

  const pagination = {
    currentPage: currentPage,
    pageSize: pageSize,
    pages: parseInt(total / pageSize)
  }
  const results = await model
  .find(conditions)
  .skip(currentPage * pageSize)
  .limit(pageSize)
  
  console.log(results)
  return {
    data: results,
    pagination
  }
}