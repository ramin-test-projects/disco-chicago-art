import { IArtwork, IArtworksResponse } from "./collections-apis.types";

const baseUrl = "https://api.artic.edu/api/v1";

const getUrl = (url: string) =>
  `https://corsproxy.io/?${encodeURIComponent(url)}`;

export const searchArtWorks = ({
  query,
  page,
  limit,
}: {
  query?: string;
  page?: number;
  limit?: number;
}): Promise<IArtworksResponse> =>
  fetch(
    getUrl(
      `${baseUrl}/artworks/search?q=${query ?? ""}&limit=${limit ?? ""}&page=${
        page ?? ""
      }`
    ),
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return {
        total: data.pagination.total,
        items: data.data.map((d: any) => ({ ...d, score: d._score })),
      } as IArtworksResponse;
    });

export const getArtWork = ({ id }: { id: number }): Promise<IArtwork> =>
  fetch(getUrl(`${baseUrl}/artworks/${id}`), {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      return data.data as IArtwork;
    });
