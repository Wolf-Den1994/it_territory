import { useState } from 'react';
import { postApi } from '../../services/todoApi';
import style from './Header.module.scss';

interface IHeaderProps {
  onValueInput: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({ onValueInput }: IHeaderProps) => {
  const [value, setValue] = useState('');

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const addTodoHandle = async () => {
    if (value) {
      await postApi(value);
      onValueInput(value);
      setValue('');
    }
  };

  const handleOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') addTodoHandle();
  };

  return (
    <div className={style.header}>
      <div className={style.wrapper}>
        <h1>ToDo list</h1>
        <div className={style.add}>
          <input
            className={style.inputAdd}
            value={value}
            onChange={inputHandle}
            onKeyPress={handleOnEnter}
          />
          <button className={style.buttonAdd} onClick={addTodoHandle}>
            Add ToDo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
