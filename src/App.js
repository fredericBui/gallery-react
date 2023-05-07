import React from 'react'
import './App.css'

function App() {
  // Récupération de l'élément input de type "file"

  React.useEffect(() => {
    const input = document.querySelector('input[type="file"]')
    let gallery = document.getElementById('gallery')
    const modal = document.createElement('div')

    // Écoute de l'événement "change" sur l'élément input
    input.addEventListener('change', (e) => {
      const file = input.files[0] // récupération du premier fichier sélectionné
      const reader = new FileReader()
      console.dir(e.target.files[0].name)

      reader.addEventListener('load', () => {
        const imageData = reader.result // récupération de l'image sous forme de Data URL
        localStorage.setItem('monImage', imageData) // stockage de l'image dans le localStorage
        console.log('Image stockée avec succès')

        const image = localStorage.getItem('monImage') // récupération de l'image stockée
        const div = document.createElement('div')
        const imgElement = document.createElement('img')
        const button = document.createElement('button')
        button.setAttribute('id', 'button')
        button.innerHTML = 'X'
        imgElement.src = image // affichage de l'image dans une balise <img>
        gallery.appendChild(div)
        div.appendChild(imgElement)
        div.appendChild(button)
      })

      reader.readAsDataURL(file) // lecture du fichier en tant que Data URL
    })

    gallery.addEventListener('click', (e) => {
      console.log(e)
      if (e.target.nodeName === 'BUTTON') {
        e.target.parentNode.remove()
      } else if (e.target.nodeName === 'IMG') {
        const img = document.createElement('img')
        img.src = e.target.currentSrc
        modal.setAttribute('id', 'modal')
        document.body.appendChild(modal)
        modal.appendChild(img)
      }
    })

    modal.addEventListener('click', () => {
      modal.removeChild(modal.lastElementChild)
      modal.remove()
    })
  }, [])

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <form>
        <label for="upload-photo">
          <i className="fa-regular fa-image"> Ajouter une image</i>
        </label>
        <input type="file" name="image" id="upload-photo" />
      </form>
      <div id="gallery"></div>
    </div>
  )
}

export default App
