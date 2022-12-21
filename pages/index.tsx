import { useMachine } from "@xstate/react"
import { myMachine } from "../machine/myFirstMachine"

export default function Home() {
  const [state, send] = useMachine(myMachine)
  return (
    <div>
      {
        JSON.stringify(state.value)
      }
      <button onClick={() => send('MOUSEOVER')}>Mouse over</button>
      <button onClick={() => send('MOUSEOUT')}>mouse out</button>
    </div>
    )
}
