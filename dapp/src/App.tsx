import { useConnection } from 'wagmi';
import Login from "./login";
import Vote from "./vote";


export default function App() {

  const connection = useConnection();

  return (
    <>
    {
      connection.status === 'connected' 
      ? <Vote />
      : <Login />
    }
    </>
  )


}
