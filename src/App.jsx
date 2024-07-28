import { useDispatch, useSelector } from "react-redux";
import Nav from "./components/Nav";
import { useEffect } from "react";
import { getAll } from '../src/features/state/stateSlice';
import CustomSelect from "./components/CustomSelect";
import Search from "./components/Search";
import { Link } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.state.theme);
  const data = useSelector((state) => state.state.data);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const calcNr = (nr) => {
    return Number(nr).toLocaleString();
  };

  if(!data || data.length < 2) {
    return <p>Loading...</p>;
  };

  return (
    <div className={`${theme ? "bg-lightbg" : "bg-darkbg"} min-h-screen min-w-screen`}>
      <Nav />
      <div className="md:flex justify-between items-center md:mx-8">
        <div className="flex items-center justify-start ml-4 mt-6 mb-10 md:mt-12 md:mb-12">
          <Search />
        </div>
        <div className="mr-4">
          <CustomSelect />
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(16.5rem,1fr))] gap-x-[4.625rem] gap-y-10 justify-center mx-[3.438rem] my-8">
        {data ? data.map((item, index) => (
          <Link
            to={"/" + item.name.common}
            key={index}
            className={`flex flex-col min-w-[16.5rem] min-h-[21rem] ${theme ? "bg-white text-black" : "bg-lightergrey text-white"} rounded-[0.313rem] drop-shadow-sm`}
          >
            <img
              className="rounded-t-[0.313rem] min-h-[10rem] smd:max-h-[10rem]"
              src={item.flags.png}
              alt={item.name.common}
            />
            <div className="p-6">
              <h1 className="text-lg font-extrabold leading-[26px] mb-4">{item.name.common}</h1>
              <p className="flex text-sm font-semibold leading-4 gap-1 mb-2">
                Population: <span className="font-light">{calcNr(item.population)}</span>
              </p>
              <p className="flex text-sm font-semibold leading-4 gap-1 mb-2">
                Region: <span className="font-light">{item.region}</span>
              </p>
              <p className="flex text-sm font-semibold leading-4 gap-1 mb-2">
                Capital: <span className="font-light">{item.capital}</span>
              </p>
            </div>
          </Link>
        )) : null}
      </div>
    </div>
  );
}

export default App;