import { useState } from 'react'
import './App.css'
import TaskList from './components/Tasks';

function App() {
  return (
    <>
      <h1>Task Management - CURD</h1>
      <TaskList/>
    </>
  )
}

export default App
