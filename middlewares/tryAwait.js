module.exports = async (getResult, callback) => {
  try {
    callback.try(await getResult)
  } catch (error) {
    callback.catch(error)
  }
}