///////////////////////////////// Menu /////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    const contextMenu = document.getElementById('add-menu');

    // Show the add menu
    document.addEventListener('addmenu', (event) => {
        event.preventDefault(); // Prevent the default add menu
        contextMenu.style.top = `${event.clientY}px`;
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.style.display = 'block';
    });

    // Hide the context menu when clicking elsewhere
    document.addEventListener('click', () => {
        contextMenu.style.display = 'none';
    });
});

///////////////////////////////// Create Text Box ///////////////////////////////// 
let createText = document.getElementById('createText');
let list = document.getElementById('list');

createText.onclick = () => {
    let newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.innerHTML = `
    <span class="close">x</span>
    <textarea
    placeholder="Write post..."
    rows="10" cols="30"></textarea>`;
    list.appendChild(newNote)
}
document.addEventListener('click', (event) => {
    if(event.target.classList.contains('close')){
        event.target.parentNode.remove();
    }
})

let cursor = {
    x: null,
    y: null
}
let note = {
    dom: null,
    x: null,
    y: null
}
document.addEventListener('mousedown', (event) => {
    if(event.target.classList.contains('note')){
        cursor = {
            x: event.clientX,
            y: event.clientY
        }
        note = {
            dom: event.target,
            x: event.target.getBoundingClientRect().left,
            y: event.target.getBoundingClientRect().top
        }
    }
})

document.addEventListener('mousemove', (event) => {
    if(note.dom == null) return;
    let currentCursor = {
        x: event.clientX,
        y: event.clientY
    }
    let distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y
    }
    note.dom.style.left = (note.x + distance.x) + 'px';
    note.dom.style.top = (note.y + distance.y) + 'px';
    note.dom.style.cursor = 'grab';
})
document.addEventListener('mouseup', () => {
    if( note.dom == null) return;
    note.dom.style.cursor = 'auto';
    note.dom = null;  
})

///////////////////////////////// Drag and Drop Image ///////////////////////////////// 

const dragger = document.getElementById('dragger');
const dragger_text = document.getElementById('dragger_text');
const browserFileBtn = document.getElementById('browseFileBtn');
const fileSelectorInput = document.getElementById('fileSelectorInput');
const filename = document.getElementById('filename');

const browseFileHandler = () => {
    fileSelectorInput.value = "";
    fileSelectorInput.click();
}

fileSelectorInput.addEventListener('change', function (e) {
    file = this.files[0]
});

dragger.addEventListener('dragover', (e) => {
    e.preventDefault();
    dragger_text.textContent = "Release to upload image"
});

dragger.addEventListener('dragleave', () => {
    dragger_text.textContent = "Drag and drop file"
});

dragger.addEventListener('drop', (e) => {
    e.preventDefault();
    file = e.dataTransfer.files[0];
    uploadFileHandler(file);
});

const deletehandler = () => {
    const initial = `
    <div class="icon"><i class="fa-solid fa-images-user"></i></div>
    <h2 id="dragger_text">drag and drop file</h2>
    <h3>OR</h3>
    <button class="browseFileBtn" onclick="browseFileHandler()">Browse File</button>
    <input type="file" hidden id="fileSelectorInput"/>
    `;

    dragger.innerHTML = initial;
    dragger.classList.remove('active');
    filename.innerHTML = "";

}

const uploadFileHandler = (file) => {
    const validFileExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

    if(validFileExtensions.includes(file.type)) {
        const fileReader = new FileReader();

        fileReader.onload = () => {
            const fileURL = fileReader.result;
            const imageTag = `<img src="${fileURL}" alt=""/>`
           
            dragger.innerHTML = imageTag;
            const imageDetails = `<p>${file.name.split('.')[0]}</p><i class="fa-solid fa-trash-can" onclick="deleteHandler()"></i>`;
            filename.innerHTML = imageDetails;
        }

        fileReader.readAsDataURL(file);
        dragger.classList.add('active');
    }
}
