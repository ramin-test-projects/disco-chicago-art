import { useDispatch } from "react-redux";
import { counterActions, useCounter } from "../store/slice/testreducer";
import { useEffect } from "react";
import { getArtWork, searchArtWorks } from "../api/collections-apis";

export const Home = () => {
  const dispatch = useDispatch();
  const { value } = useCounter();
  const { increment } = counterActions;

  useEffect(() => {
    (async () => {
      //const x = await searchArtWorks({ query: "cats", limit: 20 });
      const x = await getArtWork({ id: 656 });
      console.log(x, "ramin");
    })();
  }, []);

  return (
    <>
      <div className="bg-slate-400">{`home page: ${value}`}</div>
      <button onClick={() => dispatch(increment())}>increment</button>
    </>
  );
};
