import app from './src/app'
const PORT = 3000

app.listen(PORT, () => {
  console.info(`Express server listening on http://localhost:${PORT}`)
})
