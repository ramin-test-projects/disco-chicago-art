import { TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ReactVisibilitySensor from "react-visibility-sensor";
import { Subject, debounceTime, filter, tap } from "rxjs";
import { Loading } from "./loading/Loading";
import { artworksActions, useArtworks } from "../store/artworksReducer";
import { useDispatch } from "react-redux";
import { UnknownAction } from "redux";
import { ArtworkSummary } from "./ArtworkSummary";

const debounceTimeout = 1000;
const pageSize = 20;

type Abortable = { abort: () => void };

export const SearchItems = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { search, clear } = artworksActions;
  const { list, loading } = useArtworks();

  const [scrollEndLocked, setScrollEndLocked] = useState<boolean>(false);

  const subjectRef = useRef(new Subject<{ term?: string; more: boolean }>());
  const scrollSubjectRef = useRef(new Subject<void>());

  const pageRef = useRef<number>(1);
  const endResultRef = useRef<boolean>(false);
  const searchActionRef = useRef<Abortable | undefined>();

  useEffect(() => {
    endResultRef.current = (list?.items.length ?? 0) % pageSize !== 0;
    pageRef.current = Math.floor((list?.items.length ?? 0) / pageSize) + 1;
    scrollSubjectRef.current.next();
  }, [list?.items.length]);

  useEffect(() => {
    const subscription = subjectRef.current
      .pipe(
        filter(() => !endResultRef.current),
        tap((value) => {
          setIsLoading(true);
          if (!value.more) dispatch(clear());
        }),
        debounceTime(debounceTimeout),
        tap((value) => {
          setIsLoading(false);
          searchActionRef.current?.abort();

          const action = dispatch(
            search({
              query: value.term,
              limit: pageSize,
              page: pageRef.current,
            }) as unknown as UnknownAction
          );

          searchActionRef.current = action as unknown as Abortable;

          scrollSubjectRef.current.next();
        })
      )
      .subscribe(() => {});

    const scrollEndSubscription = scrollSubjectRef.current
      .pipe(
        tap(() => setScrollEndLocked(true)),
        debounceTime(debounceTimeout)
      )
      .subscribe(() => setScrollEndLocked(false));

    return () => {
      subscription.unsubscribe();
      scrollEndSubscription.unsubscribe();
    };
  }, [clear, dispatch, search]);

  useEffect(() => {
    endResultRef.current = false;
    subjectRef.current.next({ term: searchTerm, more: false });
  }, [searchTerm]);

  const lastIndex = (list?.items?.length ?? 0) - 1;

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex-grow-0 flex-shrink-0 flex flex-row">
        <div className="flex-auto">
          <TextField
            className="w-[22rem]"
            variant="standard"
            placeholder="Search artworks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {!!list?.total && (
          <div className="flex-grow-0 flex-shrink-0 flex items-center">{`${list?.total.toLocaleString(
            "en-US"
          )} items`}</div>
        )}
      </div>
      <div className="flex-auto flex flex-col gap-2">
        {(list?.items ?? []).map((item, index) =>
          index === lastIndex ? (
            <ReactVisibilitySensor
              key={item.id}
              onChange={() => {
                if (!scrollEndLocked && !endResultRef.current) {
                  scrollSubjectRef.current.next();
                  subjectRef.current.next({ term: searchTerm, more: true });
                }
              }}
            >
              <ArtworkSummary item={item} />
            </ReactVisibilitySensor>
          ) : (
            <ArtworkSummary key={item.id} item={item} />
          )
        )}
        {(isLoading || loading) && <Loading />}
        {!(isLoading || loading) && !list?.items.length && !!searchTerm && (
          <div
            className="text-center font-medium p-4"
            style={{ color: "rgb(100, 100, 100)" }}
          >
            {`Sorry! We couldn't find any artworks for '${searchTerm}'.`}
          </div>
        )}
      </div>
    </div>
  );
};
