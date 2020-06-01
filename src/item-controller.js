const StorageCtrl = require('./storage-controller')
const UICtrl = require('./ui-controller')

module.exports = (function(name, calories) {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id
    this.name = name
    this.calories = calories
  }

  // Data Structure / State
  const data = {
    items: StorageCtrl.getItems(),
    currentItem: null,
    totalCalories: 0
  }

  return {
    logData: function() {
      return data;
    },
    getItems: function() {
      return data.items;
    },
    putItems: function(items) {
      data.items = items
    },
    addItem: function(name, calories) {
      // Create ID
      let id = data.items.length ? data.items[data.items.length - 1].id + 1 : 0
      // Parse to integer
      calories = parseInt(calories)
      // Create new item
      const newItem = new Item(id, name, calories)
      data.items.push(newItem)
      // Show list
      UICtrl.hideList(false)
      
      return newItem
    },
    updateItem: function(name, calories) {
      let found = null
      data.items.forEach(item => {
        if (item.id === data.currentItem.id) {
          item.name = name
          item.calories = Number(calories)
          found = item
        }
      })
      return found
    },
    getTotalCalories: function() {
      let totalCalories = 0
      data.items.forEach(item => totalCalories += item.calories)
      data.totalCalories = totalCalories
      return totalCalories
    },
    getItemById: function(id) {
      return data.items.filter(item => item.id === id)[0]
    },
    setCurrentItem: function(item) {      
      console.log(222);
      
      data.currentItem = item
    },
    getCurrentItem: function() {
      return data.currentItem
    },
    deleteItem: function(id) {
      data.items = data.items.filter(item => item.id !== id )
    },
    clearData: function() {
      data.items = []
    }
  }
})()