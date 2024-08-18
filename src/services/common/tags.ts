import Api from 'services/api';

// Types
import type { AxiosRequestConfig } from 'axios';
import type { Tag } from 'types/tag.types';

class TagApi extends Api {
  constructor() {
    super('tag');
  }

  public createTag = async (name: string): Promise<{ message: string }> => {
    const accessToken: string | null = this.getAccessToken();
    const body = {
      name,
    };
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await this.post('', body, config);
    return data;
  };

  public getTag = async (id: number): Promise<Tag> => {
    const { data } = await this.get(`/${id}`);
    return data;
  };

  public getTags = async (ids: number[]): Promise<Tag[]> => {
    const { data } = await this.get(`/bulk/${ids.join(',')}`);
    return data;
  };

  public getAllTags = async (): Promise<Tag[]> => {
    const { data } = await this.get('');
    return data;
  };

  public getTagsPaginated = async (
    page: number,
    limit: number,
    orderBy: 'id' | 'name',
    order: 'ASC' | 'DESC',
    searchQuery?: { [key: string]: string }
  ): Promise<{ items: Tag[]; total: number; totalPages: number }> => {
    const endpoint: string = '/paginated';
    let queryString: string = `?page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}`;
    if (searchQuery) queryString += `&searchQuery=${JSON.stringify(searchQuery)}`;

    const { data } = await this.get(`${endpoint}${queryString}`);
    return data;
  };

  public updateTag = async (id: number, name: string): Promise<{ message: string }> => {
    const accessToken: string | null = this.getAccessToken();
    const body = {
      name,
    };
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await this.put(`/${id}`, body, config);
    return data;
  };

  public deleteTag = async (id: number): Promise<{ message: string }> => {
    const accessToken: string | null = this.getAccessToken();
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await this.delete(`/${id}`, config);
    return data;
  };
}

export const { createTag, getTag, getTags, getAllTags, getTagsPaginated, updateTag, deleteTag } =
  new TagApi();