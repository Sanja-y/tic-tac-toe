import { useState } from 'react'
import Board from './components/Board'
import Select from './components/Select';

function App() {

  const [role, setRole] = useState("");
  const [otherRole, setOtherRole] = useState("");
  const [rows, setRows] = useState(["1a", "1b", "1c",
    "2a", "2b", "2c",
    "3a", "3b", "3c"])

  const [currentRole, setCurrentRole] = useState("");
  const [gameProgress, setGameProgress] = useState("start")
  console.log("game progress" , gameProgress)

  return (
    <main className='min-h-screen w-[100%] bg-gradient-to-r from-slate-800 to-slate-900 flex flex-col justify-center items-center 
    text-cyan-500'>
      <Board rows={rows} setRows={setRows} role={role} otherRole={otherRole}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        gameProgress={gameProgress}
        setGameProgress={setGameProgress}
      />
      <Select setRole={setRole} role={role} setOtherRole={setOtherRole} otherRole={otherRole}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        gameProgress={gameProgress}
        setGameProgress={setGameProgress}
      />
    </main>
  )
}

export default App
