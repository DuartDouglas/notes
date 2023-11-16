// Saudação 
const greeting = document.getElementById('greeting');

const viewGreeting = () => {
   let newDate = new Date();
   let currentTime = newDate.getHours();

   if (currentTime >= 6 && currentTime < 12) {
      greeting.textContent = "Bom dia!";
   } else if (currentTime >= 12 && currentTime < 18) {
      greeting.textContent = "Boa tarde!";
   } else {
      greeting.textContent = "Boa noite!";
   }
}
viewGreeting();

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

// Abre modal de instruções 
const btnInstructions = document.getElementById('btnInstructions');
const modalInstructions = document.getElementById('modalInstructions');
const closeInstructions = document.getElementById('closeInstructions');
btnInstructions.addEventListener('click', () => {
   modalInstructions.classList.add('show');
});

closeInstructions.addEventListener('click', () => {
   modalInstructions.classList.remove('show');
});

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

   // Cria o botão de exclusão
   const deleteButton = document.createElement('button');
   const deleteSvgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
   const deleteUseElement = document.createElementNS("http://www.w3.org/2000/svg", "use");
   deleteUseElement.setAttributeNS("http://www.w3.org/1999/xlink", "href", "assets/images/icons.svg#btnDelete");

   li.appendChild(deleteButton);
   deleteButton.appendChild(deleteSvgElement);
   deleteSvgElement.appendChild(deleteUseElement);

   deleteButton.classList = "btnDelete";

   deleteButton.addEventListener('click', () => {
      const confirmDeleteModal = document.getElementById('confirmDeleteModal');
      confirmDeleteModal.classList.add('show');

      const confirmYes = document.getElementById('confirmYes');
      const confirmNo = document.getElementById('confirmNo');

      
      confirmYes.addEventListener('click', () => {
         // Verifica se o elemento ainda é um filho antes de tentar removê-lo
         if (li.parentNode) {
            listNotes.removeChild(li);
         }
         
         itemsArray = itemsArray.filter(item => item !== text);
         localStorage.setItem('items', JSON.stringify(itemsArray));
         
         confirmDeleteModal.classList.remove('show');
      });

      
      confirmNo.addEventListener('click', () => {
         confirmDeleteModal.classList.remove('show');
      });
   });

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


