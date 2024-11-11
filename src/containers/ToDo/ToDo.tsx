import { useDispatch, useSelector } from 'react-redux';
import { addTask, fetchFromFireBase, fetchTask } from './todoSlice.ts';
import { AppDispatch, RootState } from '../../app/store.ts';
import React, { useEffect } from 'react';
import { ITask, ITasks } from '../../types';


const ToDo = () => {

  const dispatch: AppDispatch = useDispatch();
  const taskValue = useSelector((state: RootState) => state.task.title);
  const arrValue = useSelector((state:RootState) => state.task);

  const change = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(addTask(value));
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchTask(arrValue));
  };
  console.log(taskValue);

  const tasksFromApi= Object.keys(taskValue).map((taskKey) => {
    return {
      ...taskValue[taskKey],
      id: taskKey
    };
  });


  useEffect(() => {
    dispatch(fetchFromFireBase());
  }, [dispatch]);

  return (
    <>
      <form onSubmit={submit} className="border border-gray-300 rounded-lg w-50 form-control ms-auto me-auto">
          <label>Enter a new task</label>
          <input onChange={change} type="text" name="name" placeholder="Task" className="form-control" />
        <button type="submit" className="btn btn-outline-primary mt-3">Submit</button>
      </form>
      <div>
        {tasksFromApi.map((task) => (
          <div className="border border-gray-300 rounded-lg w-50 mx-auto mt-2" key={task.id}>
            Task title: "{task.title}"
          </div>
          )
        )}
      </div>

    </>
  );
};

export default ToDo;