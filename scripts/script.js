// Modo Claro e modo escuro
const mode = document.getElementById('mode');
//Aplica modo escuro
document.getElementById('btnDarkMode').addEventListener('click', () => {
   mode.classList.add('dark');
   mode.classList.remove('light');
   btnDarkMode.classList.remove('show');
   btnLightMode.classList.add('show');
})

//Aplica modo claro
document.getElementById('btnLightMode').addEventListener('click', () => {
   mode.classList.add('light');
   mode.classList.remove('dark');
   btnDarkMode.classList.add('show');
   btnLightMode.classList.remove('show');
})

const btnNewNote = document.getElementById('btnNewNote');
const modalNewNote = document.getElementById('modalNewNote');
const listNotes = document.getElementById('listNotes');
const form = document.querySelector('form');
const item = document.getElementById('inputNote');


btnNewNote.addEventListener('click', () => {
   modalNewNote.classList.add('show');
})

let items;

let itemsArray = localStorage.getItem('items')
   ? JSON.parse(localStorage.getItem('items'))
   : [];

const data = JSON.parse(localStorage.getItem('items'));

const liMaker = (text) => {
   const li = document.createElement('li');
   const checkbox = document.createElement('input');
   checkbox.type = "checkbox";
   const span = document.createElement('span');
   const button = document.createElement('button');
   const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
   const useElement = document.createElementNS("http://www.w3.org/2000/svg", "use");
   useElement.setAttributeNS("http://www.w3.org/1999/xlink", "href", "assets/images/icons.svg#menuEdit");

   listNotes.appendChild(li);
   li.appendChild(checkbox);
   li.appendChild(span);
   li.appendChild(button);
   button.appendChild(svgElement);
   svgElement.appendChild(useElement);

   button.classList = "btnEdit";
   span.textContent = text;



   // clique no botão de edição - prompt 
   /* button.addEventListener('click', () => {
      const newText = prompt('Edit o texto: ', text);
      if (newText !== null) {
         text = newText;
         span.textContent = text;
         console.log("Passou 1 vez");
         
         updateText();
      }
   });  */

   button.addEventListener('click', () => {
      const modalEditNote = document.getElementById('modalEditNote');

      const closeModal = document.getElementsByClassName('close')[0];
      const noteEdit = document.getElementById('noteEdit');
      
      const formModalEdit = document.getElementById('formModalEdit');

      modalEditNote.classList.add('show');

      const newText = text;
      noteEdit.value = newText;

      closeModal.addEventListener('click', () => {
         modalEditNote.classList.remove('show');
      })
      
      formModalEdit.addEventListener('submit', () => {
         text = noteEdit.value;
         span.textContent = text;
         modalEditNote.classList.remove('show');
         updateText();
      }) 
   });
      
   checkbox.addEventListener('change', () => {
      let spanCheck = checkbox.nextElementSibling;
      if (checkbox.checked) {
         spanCheck.classList.add('completed');
      } else {
         spanCheck.classList.remove('completed');
      }
   })
}

const updateText = () => {
   const spans = document.querySelectorAll('li > span');
   itemsArray = []; 
   spans.forEach((span) => {
      itemsArray.push(span.textContent);
   });
   
   localStorage.setItem('items', JSON.stringify(itemsArray));
}

form.addEventListener('submit', function (e) {
   e.preventDefault();
   // pega o que foi inserido no formulario e coloca no array
   itemsArray.push(item.value);
   localStorage.setItem('items', JSON.stringify(itemsArray));
   
   liMaker(item.value);
   item.value = '';
   modalNewNote.classList.remove('show');
});


data.forEach((item) => {
   liMaker(item);
});


