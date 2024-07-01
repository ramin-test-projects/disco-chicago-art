import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <div className="flex flex-row gap-2 border-solid border-b-[1px] border-b-slate-300 py-2 px-4 items-center">
      <div className="flex-auto">
        <Link to="/" className="text-xl">
          DISCO
        </Link>
      </div>
    </div>
  );
};
