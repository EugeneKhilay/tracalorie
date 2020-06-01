module.exports = (function() {
  return {
    getItems: function() {
      let items = localStorage.getItem('items')
      return items ? JSON.parse(items) : []
    },
    storeItem: function(item) {
      const items = this.getItems()
      let dataToStore
      if (items) {
        items.push(item)
        dataToStore = items
      } else {
        dataToStore = [item]
      }
      localStorage.setItem('items', JSON.stringify(dataToStore))
    },
    updateItem: function(item) {
      const items = this.getItems()
      items.forEach((element, index) => {
        if (element.id === item.id) {
          items.splice(index, i, item)
        }
      })
      localStorage.setItem('items', JSON.stringify(items))
    },
    deleteItem: function(id) {
      let items = this.getItems()
      items = items.filter(item => item.id !== id)
      localStorage.setItem('items', JSON.stringify(items))
    },
    removeItems: function() {
      localStorage.removeItem('items')
    }
  }
})()