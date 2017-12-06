function flashMessageHandler(req, res, next) {
  res.flash = function(text) {
    res.cookie('nosy_flash_message', text, { httpOnly: true })
  }
  if (req.cookies.nosy_flash_message) {
    res.locals.flashMessage = req.cookies.nosy_flash_message
    res.clearCookie('nosy_flash_message')
  }
  next()
}


module.exports = {
  flashMessageHandler : flashMessageHandler
}