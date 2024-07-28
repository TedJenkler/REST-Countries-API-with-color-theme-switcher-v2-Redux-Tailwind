import { useDispatch, useSelector } from "react-redux"
import Nav from "./components/Nav"
import { useEffect } from "react";
import { getAll } from '../src/features/state/stateSlice'
import CustomSelect from "./components/CustomSelect";
import Search from "./components/Search";
import { Link } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.state.theme);
  const data = useSelector((state) => state.state.data);

  useEffect(() => {
    dispatch(getAll())
  }, []);

  return (
    <div className={`${theme ? "bg-lightbg" : "bg-darkbg"} min-h-screen min-w-screen`}>
      <Nav />
      <div className="flex justify-center mt-6 mb-10">
        <Search />
      </div>
      <CustomSelect />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(16.5rem,1fr))] gap-x-[4.625rem] gap-y-10 justify-center mx-[3.438rem] my-8">
        {data ? data.map((item, index) => {
          return(
          <Link to={"/" + item.name.common} key={index} className={`flex flex-col min-w-[16.5rem] max-h-[21rem] ${theme ? "bg-white text-black" : "bg-lightergrey text-white"} rounded-[0.313rem] drop-shadow-sm`}>
            <img className="rounded-t-[0.313rem] max-h-[10rem]" src={item.flags.png} alt={item.name} />
            <div className="p-6">
              <h1 className="text-lg font-extrabold leading-[26px] mb-4">{item.name.common}</h1>
              <p className="flex text-sm font-semibold leading-4 gap-1 mb-2">Population: <span className="font-light">{item.population}</span></p>
              <p className="flex text-sm font-semibold leading-4 gap-1 mb-2">Region: <span className="font-light">{item.region}</span></p>
              <p className="flex text-sm font-semibold leading-4 gap-1 mb-2">Capital: <span className="font-light">{item.capital}</span></p>
            </div>
          </Link>
          )
        }) : null}
      </div>
    </div>
  )
}

export default App
