exports.get404 = (req, res, next) => {
  res.status(404).json({ msg: 'Not found' })
}
