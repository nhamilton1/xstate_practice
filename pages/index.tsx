import { useMachine } from "@xstate/react"
import { myMachine } from "../machine/myFirstMachine"
import { todosMachine } from "../machine/todoAppMachine"

export default function Home() {
  const [state, send] = useMachine(todosMachine)
  return (
    <div>
      {
        JSON.stringify(state.value)
      }
      <button onClick={() => send('Todos loaded')}>Todos loaded</button>
      <button onClick={() => send('Loading Todos Failed')}>Todos Failed</button>
    </div>
    )
}
