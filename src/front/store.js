export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    cart: [] // carrito global
  };
};

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };

    case 'add_task':
      const { id,  color } = action.payload
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'add_to_cart': {
      const product = action.payload;
      const existing = store.cart.find(item => item.id === product.id);
      if (existing) {
        // Incrementar cantidad
        return {
          ...store,
          cart: store.cart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      } else {
        // Agregar nuevo producto con cantidad 1
        return {
          ...store,
          cart: [...store.cart, { ...product, quantity: 1 }]
        };
      }
    }

    case 'update_quantity': {
      const { id, quantity } = action.payload;
      if (quantity < 1) return store;
      return {
        ...store,
        cart: store.cart.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      };
    }

    case 'remove_from_cart': {
      const id = action.payload;
      return {
        ...store,
        cart: store.cart.filter(item => item.id !== id)
      };
    }

    default:
      throw Error('Unknown action.');
  }
}
