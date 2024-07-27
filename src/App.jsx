import { useDispatch, useSelector } from "react-redux"
import Nav from "./components/Nav"
import { useEffect } from "react";
import { getAll } from '../src/features/state/stateSlice'

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.state.theme);

  useEffect(() => {
    dispatch(getAll())
  }, [dispatch]);

  return (
    <div className={`${theme ? "bg-lightbg" : "bg-darkbg"} min-h-screen min-w-screen`}>
      <Nav />
    </div>
  )
}

export default App
