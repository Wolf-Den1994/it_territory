import { useEffect, useState } from 'react';
import { delApi, getAllApi, postAllApi, putApi } from '../../services/todoApi';
import { IDataApi } from '../../utils/types';
import style from './Content.module.scss';

interface IContentProps {
  valueInput: string;
}

const Content = ({ valueInput }: IContentProps) => {
  const [dataTodo, setDataTodo] = useState<IDataApi[] | null>(null);
  const [fault, setFault] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState<IDataApi | null>(null);
  const [currentTodo, setCurrentTodo] = useState<IDataApi | null>(null);

  useEffect(() => {
    getAllApi()
      .then((data) => {
        setDataTodo(data);
        setFault(false);
      })
      .catch(() => {
        setFault(true);
      });
  }, [valueInput]);

  const completeHandle = (
    todo: IDataApi,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    putApi(todo.id, e.target.checked, todo.todo).then((data) => {
      setDataTodo(data);
    });
  };

  const deleteHandle = (id: number) => {
    delApi(id).then((data) => {
      setDataTodo(data);
    });
  };

  const editHandle = (todo: IDataApi) => {
    setIsEdit(true);
    setInputValue(todo);
  };

  const editInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputValue) {
      setInputValue({
        todo: e.target.value,
        isComplite: inputValue?.isComplite,
        id: inputValue?.id,
      });
    }
  };

  const handleOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (inputValue) {
        putApi(inputValue.id, inputValue.isComplite, inputValue.todo).then(
          (data) => {
            setDataTodo(data);
          }
        );
        setIsEdit(false);
      }
    }
  };

  const dragStartHandle = (
    e: React.DragEvent<HTMLDivElement>,
    todo: IDataApi
  ) => {
    setCurrentTodo(todo);
  };

  const dragEndHandle = (e: React.DragEvent<HTMLDivElement>) => {};

  const dragOverHandle = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandle = (e: React.DragEvent<HTMLDivElement>, todo: IDataApi) => {
    if (dataTodo) {
      e.preventDefault();
      if (currentTodo) {
        const newTodos = dataTodo.map((item) => {
          if (item.id === todo.id) {
            return { ...item, id: currentTodo.id };
          }
          if (item.id === currentTodo.id) {
            return { ...item, id: todo.id };
          }
          return item;
        });
        postAllApi(newTodos).then((data) => {
          setDataTodo(data);
        });
      }
    }
  };

  const sortTodos = (a: IDataApi, b: IDataApi) => {
    if (a.id > b.id) {
      return 1;
    } else {
      return -1;
    }
  };

  return fault ? (
    <h2>Something went wrong :(</h2>
  ) : (
    <>
      <div className={style.content}>
        {isEdit ? (
          <div className={style.wrapper}>
            <div className={style.editWrapper}>
              <span className={style.title}>Edit:</span>
              <input
                value={inputValue?.todo}
                onChange={editInputHandle}
                className={style.input}
                onKeyPress={handleOnEnter}
              />
            </div>
            <p>Press key "Enter" to confirm</p>
          </div>
        ) : (
          <></>
        )}
        {dataTodo &&
          dataTodo.sort(sortTodos).map((todo) => (
            <div
              draggable
              onDragStart={(e) => dragStartHandle(e, todo)}
              onDragLeave={(e) => dragEndHandle(e)}
              onDragEnd={(e) => dragEndHandle(e)}
              onDragOver={(e) => dragOverHandle(e)}
              onDrop={(e) => dropHandle(e, todo)}
              key={todo.id + todo.todo}
              className={`${style.todo} ${
                todo.isComplite ? style.complete : ''
              }`}
            >
              <div
                className={`${style.name} ${
                  todo.isComplite ? style.complete : ''
                }`}
              >
                {todo.todo}
              </div>
              <div className={style.controls}>
                <input
                  type="checkbox"
                  defaultChecked={todo.isComplite}
                  onChange={(e) => {
                    completeHandle(todo, e);
                  }}
                  className={style.chackbox}
                />
                <button
                  className={style.del}
                  onClick={() => deleteHandle(todo.id)}
                ></button>
                <button
                  className={style.edit}
                  onClick={() => editHandle(todo)}
                ></button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Content;
