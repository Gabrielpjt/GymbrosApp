import { createContext, useReducer } from 'react';

export const UsersContext = createContext({
  user: [],
  addUser: ({ title, price, stock, image, composition, description }) => {},
  setUsers: (flowers) => {},
  deleteUser: (id) => {},
  updateUser: (id, { title, price, stock, image, composition, description }) => {},
});

function usersReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload;
      return inverted;
    case 'UPDATE':
      const updatableUserIndex = state.findIndex(
        (user) => user.id === action.payload.id
      );
      const updatableUser = state[updatableUserIndex];
      const updatedItem = { ...updatableUser, ...action.payload.data };
      const updatedUsers = [...state];
      updatedUsers[updatableUserIndex] = updatedItem;
      return updatedUsers;
    case 'DELETE':
      return state.filter((packing) => user.id !== action.payload);
    default:
      return state;
  }
}

function UsersContextProvider({ children }) {
  const [usersState, dispatch] = useReducer(usersReducer, []);

  function addUser(userData) {
    dispatch({ type: 'ADD', payload: userData });
  }

  function setUsers(users) {
    dispatch({ type: 'SET', payload: users });
  }

  function deleteUser(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateUser(id, userData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: userData } });
  }

  const value = {
    users: usersState,
    setUsers: setUsers,
    addUser: addUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
  };

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
}

export default UsersContextProvider;
