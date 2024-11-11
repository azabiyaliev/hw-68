import { useDispatch, useSelector } from 'react-redux';
import { addTask, fetchTask } from './todoSlice.ts';
import { AppDispatch, RootState } from '../../app/store.ts';
import React, { useEffect } from 'react';


const ToDo = () => {

  const dispatch: AppDispatch = useDispatch();
  let taskValue = useSelector((state: RootState) => state.task.value);
  const stateValue = useSelector((state: RootState) => state.task);
  console.log(stateValue);

  const change = (e:React.ChangeEvent<HTMLInputElement>) => {
    taskValue = e.target.value;
    dispatch(addTask(taskValue));
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchTask());
  };

  useEffect(() => {

  }, []);

  return (
    <>
      <form onSubmit={submit} className="border border-gray-300 rounded-lg w-50 form-control ms-auto me-auto">
          <label>Enter a new task</label>
          <input onChange={change} type="text" name="name" value={taskValue} placeholder="Task" className="form-control" />
        <button type="submit" className="btn btn-outline-primary mt-3">Submit</button>
      </form>
    </>
  );
};

export default ToDo;