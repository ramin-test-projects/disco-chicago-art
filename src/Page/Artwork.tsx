import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { artworksActions, useArtworks } from "../store/artworksReducer";
import { useEffect } from "react";
import { UnknownAction } from "redux";
import { Loading } from "../components/loading/Loading";

export const ArtworkPage = () => {
  const params = useParams();
  const id: number | undefined = !params.id ? undefined : +params.id;

  const { get } = artworksActions;
  const { artwork, loading, error } = useArtworks();

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(
        get({
          id,
        }) as unknown as UnknownAction
      );
    }
  }, [dispatch, get, id]);

  return (
    <div className="p-4 flex flex-col items-center">
      {!!loading && <Loading />}
      {!!error && (
        <div className="p-8 text-xl font-medium text-slate-900 text-center">
          {"Sorry! The book doesn't exist :("}
        </div>
      )}
      {!!artwork?.id && (
        <div
          className={
            "flex flex-col gap-2 p-4 w-full max-w-[44rem] bg-white " +
            "rounded-lg border-solid border-[1px] border-b-slate-300"
          }
        >
          <Field label="Title" text={artwork.title ?? ""} />
          <Field label="Summary" text={artwork.short_description ?? ""} />
          <Field label="Gallery title" text={artwork.gallery_title ?? ""} />
          <Field label="Dimensions" text={artwork.dimensions ?? ""} />
          <Field label="Description" text={artwork.description ?? ""} isHtml />
        </div>
      )}
    </div>
  );
};

const Field = ({
  label,
  text,
  className,
  isHtml,
}: {
  label: string;
  text: string;
  className?: string;
  isHtml?: boolean;
}) => {
  return !text ? (
    <></>
  ) : (
    <div className="flex flex-row gap-4">
      <div
        className={`flex-grow-0 flex-shrink-0 flex flex-col w-32 text-slate-500 ${
          className ?? ""
        }`}
      >{`${label}:`}</div>
      {isHtml && (
        <div
          className="flex-auto"
          dangerouslySetInnerHTML={isHtml ? { __html: text } : undefined}
        ></div>
      )}
      {!isHtml && <div className="flex-auto">{text}</div>}
    </div>
  );
};
