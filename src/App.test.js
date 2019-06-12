import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider, Subscribe } from 'unstated'
import TodosContainer from './store'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('should get todos',()=>{
  <Provider>
        <Subscribe to={[TodosContainer]}>
          {todos => {
            const todo = TodosContainer.getTodos(); 
            throw new Error("erroor");
          }
          }
        </Subscribe>
  </Provider>
})
