import Api from 'services/api';

// Types
import type { AxiosRequestConfig } from 'axios';
import type { Pricing } from 'types/pricing.types';

class OfferApi extends Api {
  constructor() {
    super('game/offer');
  }

  public createOffer = async (
    gameId: number,
    discountPrice: number,
    offerType: 'SPECIAL PROMOTION' | 'WEEKEND DEAL',
    discountStartDate: Date,
    discountEndDate: Date
  ): Promise<{ message: string }> => {
    const accessToken: string | null = this.getAccessToken();
    const body = {
      gameId,
      discountPrice,
      offerType,
      discountStartDate,
      discountEndDate,
    };
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await this.post('', body, config);
    return data;
  };

  public getOffersPaginated = async (
    page: number,
    limit: number,
    orderBy: 'id' | 'username' | 'email' | 'country' | 'isVerified' | 'isAdmin' | 'createdAt',
    order: 'ASC' | 'DESC',
    searchQuery?: { [key: string]: string }
  ): Promise<{ items: Pricing[]; total: number; totalPages: number }> => {
    const endpoint: string = '/paginated';
    let queryString: string = `?page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}`;
    if (searchQuery) {
      const encodedSearchQuery = encodeURIComponent(JSON.stringify(searchQuery));
      queryString += `&searchQuery=${encodedSearchQuery}`;
    }

    const { data } = await this.get(`${endpoint}${queryString}`);
    return data;
  };

  public updateOffer = async (
    id: number,
    discount: boolean,
    discountPrice: number,
    offerType: 'SPECIAL PROMOTION' | 'WEEKEND DEAL',
    discountStartDate: Date,
    discountEndDate: Date
  ): Promise<{ message: string }> => {
    const accessToken: string | null = this.getAccessToken();
    const endpoint: string = `/offer/${id}`;
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const body = {
      discount,
      discountPrice,
      offerType,
      discountStartDate,
      discountEndDate,
    };

    const { data } = await this.put(endpoint, body, config);
    return data;
  };

  public deleteOffer = async (id: number): Promise<{ message: string }> => {
    const accessToken: string | null = this.getAccessToken();
    const endpoint: string = `/offer/${id}`;
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await this.delete(endpoint, config);
    return data;
  };
}

export const { createOffer, getOffersPaginated, updateOffer, deleteOffer } = new OfferApi();
