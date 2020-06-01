const StorageCtrl = require('./storage-controller')
const ItemCtrl = require('./item-controller')
const UICtrl = require('./ui-controller')

// App Controller
const App = (function(ItemCtrl, UICtrl, StorageCtrl) {
  // Get UI selectors
  const UISelectors = UICtrl.getSelectors()

  // Load event listeners
  const loadEventListeners = function() {
    // Add item add event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)
    // Add item edit event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick)
    // Add item update event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit)
    // Add item delete event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit)
    // Add clear all event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick)
    // Add back click event
    document.querySelector(UISelectors.backBtn).addEventListener('click', backClick)
    // Disable submit on enter
    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault()
        return false
      }
    })
  }

  // Item add submit
  const itemAddSubmit = function(e) {
    e.preventDefault()

    const input = UICtrl.getItemInput()
    if (input.name && input.calories) {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories)
      UICtrl.addListItem(newItem)
      StorageCtrl.storeItem(newItem)
      const totalCalories = ItemCtrl.getTotalCalories()
      UICtrl.showTotalCalories(totalCalories)
      UICtrl.clearFields()
    }
  }

  // Item edit click
  const itemEditClick = function(e) {
    e.preventDefault()

    if (e.target.classList.contains('edit-item')) {
      // Get an id
      const itemId = parseInt(e.target.parentNode.parentNode.id.split('-')[1])
      console.log(1, itemId);
      
      // Get item
      const itemToEdit = ItemCtrl.getItemById(itemId)
      console.log(2, itemToEdit);
      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit)
      // Add item to edit
      UICtrl.addItemToForm()
    }
  }

  // Item update submit
  const itemUpdateSubmit = function(e) {
    e.preventDefault()

    const input = UICtrl.getItemInput()
    if (input.name && input.calories) {
      const updatedItem = ItemCtrl.updateItem(input.name, input.calories)
      // Update item in storage
      StorageCtrl.updateItem(updatedItem)
      // Update UI
      UICtrl.updateListItem(updatedItem)
      // Update total calories
      const totalCalories = ItemCtrl.getTotalCalories()
      UICtrl.showTotalCalories(totalCalories)
      // Clear edit state
      UICtrl.clearEditState()
    }
  }

  // Back click
  const backClick = function(e) {
    e.preventDefault()

    UICtrl.clearEditState()
  }

  // Delete item
  const itemDeleteSubmit = function(e) {
    e.preventDefault()

    // Get current item
    const currentItem = ItemCtrl.getCurrentItem()
    ItemCtrl.deleteItem(currentItem.id)
    StorageCtrl.deleteItem(currentItem.id)
    UICtrl.deleteListItem(currentItem.id)
    // Update total calories
    const totalCalories = ItemCtrl.getTotalCalories()
    UICtrl.showTotalCalories(totalCalories)
    // Clear edit state
    UICtrl.clearEditState()
  }

  // Clear all items
  const clearAllItemsClick = function(e) {
    e.preventDefault()

    // Get current item
    ItemCtrl.clearData()
    StorageCtrl.removeItems()
    UICtrl.removeItems()
    // Update total calories
    const totalCalories = ItemCtrl.getTotalCalories()
    UICtrl.showTotalCalories(totalCalories)
    // Clear edit state
    UICtrl.clearEditState()
    // Hide list
    UICtrl.hideList(true)
  }

  return {
    init: function() {
      // Clear edit state
      UICtrl.clearEditState()

      // Fetch Items from data structure
      const items = ItemCtrl.getItems()

      // Check if any items
      if (items.length) {
        // Populate items with list
        UICtrl.populateItemList(items)
        // Count calories
        const totalCalories = ItemCtrl.getTotalCalories()
        UICtrl.showTotalCalories(totalCalories)
      } else {
        UICtrl.hideList(true)
      }

      // Load event listeners
      loadEventListeners()

    }
  }
})(ItemCtrl, UICtrl, StorageCtrl)

App.init()