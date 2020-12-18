import React, { useState, useEffect, useRef, useCallback, forwardRef, ForwardedRef } from 'react';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useRouter } from 'next/router';
import { MessageCard } from '..';
import { IMessage } from '../../utils/interfaces';

interface IProps {
  realtor: string;
}

const MessagesList: React.FC<IProps> = ({ realtor }) => {
  const [data, setData] = useState<(null | IMessage)[]>([]);
  const [EOC, setEOC] = useState(false);
  const [page, setPage] = useState(1);

  const infiniteLoaderRef = useRef<InfiniteLoader>(null);
  const hasMountedRef = useRef(false);
  const listRef = useRef<FixedSizeList>(null);

  // repopulate data after reset
  const populate = useCallback(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/realtors/${realtor}/messages/?page=1&page_size=20&sort=date:desc`
    );
    const msg = await res.json();
    setData([...msg, ...Array.from({ length: 20 }).map((_) => null)]);
  }, [realtor]);

  // Reset Data on realtor change
  useEffect(() => {
    if (hasMountedRef.current) {
      if (infiniteLoaderRef.current) {
        infiniteLoaderRef.current.resetloadMoreItemsCache();
        setData([]);
        setPage(1);
        setEOC(false);
        populate();
        listRef.current?.scrollTo(0);
      }
    }
    hasMountedRef.current = true;
  }, [realtor, populate]);

  // Populate with placeholders before fetch
  if (data.length === 0) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setData(Array.from({ length: 60 }).map((_) => null));
  }

  const isItemLoaded = (index: number) => index < data.length && data[index] != null;

  const loadMoreItems = () =>
    fetch(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/realtors/${realtor}/messages/?page=${page}&page_size=${20}&sort=date:desc`
    )
      .then((response) => response.json())
      .then((result) => {
        // If EOC, trim placeholders and stop fetching
        if (result.length === 0) {
          setEOC(true);
          const newData = [...data];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const cleanedData = (newData as any[]).filter((elt) => elt != null);
          setData(cleanedData);
          return;
        }

        const start = page - 1;
        const newData = [...data];

        // Store fetched data to state
        for (let i = start * 20; i < (start + 1) * 20; i += 1) {
          newData[i] = result[i - start * 20];
        }

        // Set to next page if not EOC
        if (!EOC) setPage(page + 1);
        setData(newData);

        // Add placeholders if there is still data to fetch
        if ((start + 1) * 20 === newData.length && !EOC) {
          const postData = [...newData, ...Array.from({ length: 20 }).map((_) => null)];
          setData(postData);
        }
      });

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={data.length}
          loadMoreItems={loadMoreItems}
          ref={infiniteLoaderRef}
        >
          {({ onItemsRendered, ref }) => (
            <FixedSizeList
              className="list"
              height={height}
              width={width}
              itemCount={data.length}
              itemSize={180}
              itemData={data}
              onItemsRendered={onItemsRendered}
              ref={(list) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                listRef.current = list;
                return list;
              }}
            >
              {MessageCard}
            </FixedSizeList>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};

export default MessagesList;
