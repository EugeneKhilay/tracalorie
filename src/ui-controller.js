const ItemCtrl = require('./item-controller')

module.exports = (function() {
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    clearBtn: '.clear-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  }
  return {
    populateItemList: function(items) {
      // Create items
      let html = ''
      items.forEach(item => {
        html += `
          <li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          </li>
        `
      })
      // Inser items
      document.querySelector(UISelectors.itemList).innerHTML = html
    },
    getSelectors: function() {
      return UISelectors
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function(item) {
      const newItem = document.createElement('li')
      newItem.className = 'collection-item'
      newItem.id = `item-${item.id}`
      newItem.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      `
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', newItem)
    },
    hideList: function(hide) {
      document.querySelector(UISelectors.itemList).style.display = hide ? 'none' : 'block'
    },
    showTotalCalories: function(calories) {
      document.querySelector(UISelectors.totalCalories).textContent = calories
    },
    clearFields: function() {
      document.querySelector(UISelectors.itemNameInput).value = ''
      document.querySelector(UISelectors.itemCaloriesInput).value = ''
    },
    clearEditState: function() {
      this.clearFields()
      document.querySelector(UISelectors.updateBtn).style.display = 'none'
      document.querySelector(UISelectors.deleteBtn).style.display = 'none'
      document.querySelector(UISelectors.backBtn).style.display = 'none'
      document.querySelector(UISelectors.addBtn).style.display = 'inline'
    },
    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline'
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline'
      document.querySelector(UISelectors.backBtn).style.display = 'inline'
      document.querySelector(UISelectors.addBtn).style.display = 'none'
    },
    addItemToForm: function() {
      this.showEditState()
      const currentItem = ItemCtrl.getCurrentItem()
      console.log(currentItem);
      
      document.querySelector(UISelectors.itemNameInput).value = currentItem.name
      document.querySelector(UISelectors.itemCaloriesInput).value = currentItem.calories
    },
    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems)
      listItems = Array.from(listItems)
      listItems.forEach(listItem => {
        const itemId = listItem.id;
        if (itemId === `item-${item.id}`) {
          document.querySelector(`#${itemId}`).innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          `
        }
      })
    },
    deleteListItem: function(id) {
      const itemId = `item-${id}`
      document.getElementById(itemId).remove()
    },
    removeItems: function() {
      document.querySelector(UISelectors.itemList).innerHTML = ''
    }
  }
})() 