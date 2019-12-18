const form = document.getElementById('itemForm');
const name = document.getElementById('itemInput');
const list = document.querySelector('.item-list');
const feedback = document.querySelector('.feedback');
const clear = document.getElementById('clear-list');
let todoItems = [];

const handleItem = itemName => {
    const items = document.querySelectorAll('.item');    
    items.forEach(item => {
        if(item.querySelector('.item-name').textContent === itemName){
            item.querySelector('.complete-item').addEventListener('click', () => {
                item.querySelector('.item-name').classList.toggle('completed');
                item.querySelector('.complete-item').classList.toggle('visibility');
            });

            item.querySelector('.edit-item').addEventListener('click', () => {
                name.value = itemName;
                list.removeChild(item);

                todoItems.filter(item => {
                    return item !== itemName;
                });
            });

            item.querySelector('.delete-item').addEventListener('click', () => {
                list.removeChild(item);
                todoItems.filter(item => {
                    return item !== itemName;
                });
            });
        }
    });
}

const removeItem = item => {
    const removeIndex = todoItems.indexOf(item);
    todoItems.splice(removeIndex, 1);
}

const getList = todoItems => {
    list.innerHTML = '';
    todoItems.forEach(item => {
        list.insertAdjacentHTML('beforeend',
        `<div class="item my-3">
        <h5 class="item-name text-capitalize">${item}</h5>
        <div class="item-icons">
        <a href="#" class="complete-item mx-2 item-icon">
        <i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon">
        <i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon">
        <i class="far fa-times-circle"></i></a></div></div>`);
        handleItem(item);
    });
}

const getLocalStorage = () => {
    const todoStorage = localStorage.getItem('todoItems');
    if(todoStorage === 'undefined' || todoStorage === null){
        todoItems = [];
    }else{
        todoItems = JSON.parse(todoStorage)
        getList(todoItems);
    }
}

const setLocalStorage = todoItems => {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

getLocalStorage();

form.addEventListener('submit', e => {
    e.preventDefault();
    const itemName = name.value;
    if(itemName.length === 0){
        feedback.innerHTML = 'Enter a valid value';
        feedback.classlist.add('showItem', 'alert-danger');
        setTimeout(() => {
            feedback.classlist.remove('showItem');
        }, 3000)
    }else{
        todoItems.push(itemName);
        setLocalStorage(todoItems);
        getList(todoItems);
    }

    name.value = '';
});

clear.addEventListener('click', () => {
    todoItems = [];
    localStorage.clear();
    getList(todoItems);
});