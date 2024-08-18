/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
import Api from 'services/api';

// Types
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

class Management extends Api {
  constructor() {
    super('user/management');
  }

  public checkEmailExists = async (email: string): Promise<boolean> => {
    const endpoint: string = `/email/${email}`;

    const response: AxiosResponse = await this.get(endpoint);

    return response.data.exists;
  };

  public checkUsernameExists = async (username: string): Promise<boolean> => {
    const endpoint: string = `/username/${username}`;

    const response: AxiosResponse = await this.get(endpoint);

    return response.data.exists;
  };

  public changeUserName = async (
    newUsername: string,
    password: string
  ): Promise<{ message: string }> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/username`;
    const data = { newUsername, password };
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.patch(endpoint, data, config);

    if (response.data.success) {
      toast.success(response.data.message);
    }

    return response.data;
  };

  public changeEmail = async (
    currentEmail: string,
    password: string,
    newEmail: string,
    onClose: () => void,
    setErrorMessage: (message: string) => void
  ): Promise<{ message: string } | undefined> => {
    try {
      const accessToken = this.getAccessToken();

      const endpoint: string = `/change-email`;
      const data = { currentEmail, password, newEmail };
      const config: AxiosRequestConfig = {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      };

      const response: AxiosResponse = await this.patch(endpoint, data, config);

      if (response.data.success) {
        toast.success(response.data.message);
        onClose();
      }

      return response.data;
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      onClose();
    }
  };

  public changeCountry = async (newCountry: string): Promise<{ message: string }> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/country`;
    const data = { newCountry };
    const config: AxiosRequestConfig = {
      headers: { authorization: `Bearer ${accessToken}` },
    };

    const response: AxiosResponse = await this.patch(endpoint, data, config);

    if (response.data.success) {
      toast.success(response.data.message);
    }

    return response.data;
  };

  public uploadAvatar = async (
    avatarFile: File
  ): Promise<{ data: { message: string }; status: number }> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/avatar`;

    const formData = new FormData();
    formData.append('avatar', avatarFile);

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse = await this.patch(endpoint, formData, config);

    if (response.status === 200) {
      toast.success(response.data.message);
    }

    return response;
  };

  public deleteAvatar = async (): Promise<{ message: string }> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/avatar`;
    const config: AxiosRequestConfig = {
      headers: { authorization: `Bearer ${accessToken}` },
    };

    const response: AxiosResponse = await this.delete(endpoint, config);

    if (response.status === 200) {
      toast.success(response.data.message);
    }

    return response.data;
  };

  public changePassword = async (
    oldPassword: string,
    newPassword: string,
    onClose: () => void,
    setErrorMessage: (message: string) => void
  ): Promise<{ message: string } | undefined> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/password/change`;
    const data = {
      oldPassword,
      newPassword,
    };
    const config: AxiosRequestConfig = {
      headers: { authorization: `Bearer ${accessToken}` },
    };

    try {
      const response: AxiosResponse = await this.post(endpoint, data, config);
      toast.success(response.data.message);
      onClose();
      return response.data;
    } catch (error: any) {
      if (error && error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  public forgotPassword = async (email: string): Promise<number> => {
    const endpoint: string = `/password/forgot`;
    const data = { email };

    const response: AxiosResponse = await this.post(endpoint, data);

    toast.success(response.data.message);

    return response.data.status;
  };

  public resetPassword = async (
    token: string,
    newPassword: string
  ): Promise<{ message: string }> => {
    const endpoint: string = `/password/reset`;
    const data = { token, newPassword };

    const response: AxiosResponse = await this.post(endpoint, data);
    toast.success(response.data.message, {
      autoClose: 1500,
    });

    if (response.status === 200) {
      setTimeout(() => {
        this.navigate('/login');
      }, 2000);
    }
    return response.data;
  };

  public deleteAccount = async (
    password: string,
    setErrorMessage: (message: string) => void
  ): Promise<{ data: { message: string }; status: number } | undefined> => {
    const accessToken = this.getAccessToken();

    const endpoint: string = `/account`;
    const config: AxiosRequestConfig = {
      headers: { authorization: `Bearer ${accessToken}` },
      data: { password },
    };

    try {
      const response: AxiosResponse = await this.delete(endpoint, config);

      if (response.data.success) {
        toast.success(response.data.message);
        this.removeAccessToken();
        this.removeRefreshToken();
      }

      return response;
    } catch (error: any) {
      if (error && error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      }
    }
  };
}

export const {
  checkEmailExists,
  checkUsernameExists,
  changeUserName,
  changeEmail,
  changeCountry,
  uploadAvatar,
  deleteAvatar,
  changePassword,
  forgotPassword,
  resetPassword,
  deleteAccount,
} = new Management();
