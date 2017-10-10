const formData = new FormData(document.querySelector('.form'))

$submit = document.querySelector('#submit')
$submit.addEventListener('click', event => {
  event.preventDefault()
  const $searchTerm = document.querySelector('#search-term')
  formData.set('searchTerm', $searchTerm.value)

  const data = { searchTerm: formData.get('searchTerm') }
  fetch('http://localhost:3000/terms', {
    method: 'POST',
    body: data
  })
  .then(res => {
    return res.json()
  })
  .catch(err => {
    console.error(err)
  })
})
