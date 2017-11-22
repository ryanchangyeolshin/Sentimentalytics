module.exports = (err, req, res, next) => {
  res.sendStatus(500)
  console.error(err)
  process.exit(1)
}
