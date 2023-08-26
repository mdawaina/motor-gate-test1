import { OfferParams } from "@/components/models/offer";

export function getOfferAxiosParams(motorParams: OfferParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", motorParams.pageNumber.toString());
  params.append("pageSize", motorParams.pageSize.toString());
  if (motorParams.searchTerm)
    params.append("searchTerm", motorParams.searchTerm);
  if (motorParams.source) params.append("source", motorParams.source);
  return params;
}
