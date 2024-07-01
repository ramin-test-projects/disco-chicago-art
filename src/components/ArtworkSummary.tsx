import { useNavigate } from "react-router-dom";
import { IArtworkSummary } from "../api/collections-apis.types";

export const ArtworkSummary = ({ item }: { item: IArtworkSummary }) => {
  const navigate = useNavigate();

  return (
    <div
      className={
        "p-2 rounded-md bg-white border-solid border-[1px] " +
        "border-b-slate-300 cursor-pointer hover:bg-slate-50 flex flex-row gap-4"
      }
      onClick={() => navigate(`/details/${item.id}`)}
    >
      <div className="flex-shrink-0 flex-grow-0 w-12 min-h-12">
        {!!item.thumbnail?.lqip && (
          <img
            src={item.thumbnail.lqip}
            alt={item.thumbnail.alt_text}
            className="w-12 h-12 rounded-lg"
          />
        )}
      </div>
      <div className="flex-auto">
        <h2 className="font-medium inline-flex">{item.title}</h2>
        <div className="inline-flex text-xs bg-slate-500 text-white py-1 px-2 rounded-md mx-2">
          {`Score: ${item.score}`}
        </div>
      </div>
    </div>
  );
};
