import { useState } from 'react';
import Content from '../Content/Content';
import Header from '../Header/Header';
import style from './App.module.scss';

const App = () => {
  const [valueInput, setValueInput] = useState('');

  return (
    <div className={style.content}>
      <Header onValueInput={setValueInput} />
      <Content valueInput={valueInput} />
    </div>
  );
};

export default App;
