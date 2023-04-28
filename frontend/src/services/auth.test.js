import { makeRequest } from './index';
import { loginOrRegister } from './auth';

jest.mock('./index', () => ({
  makeRequest: jest.fn(),
}));

describe('loginOrRegister', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call makeRequest with correct arguments', async () => {
    const data = { email: 'test@example.com', password: 'password' };
    const expectedArgs = { url: 'auth/login-register', method: 'POST', data };
    await loginOrRegister(data);
    expect(makeRequest).toHaveBeenCalledWith(expectedArgs);
  });

  it('should return response data if request is successful', async () => {
    const data = { email: 'test@example.com', password: 'password' };
    const responseData = { token: 'token123' };
    makeRequest.mockResolvedValueOnce({ data: responseData });
    const result = await loginOrRegister(data);
    expect(result).toEqual(responseData);
  });

  it('should throw error if request fails', async () => {
    const data = { email: 'test@example.com', password: 'password' };
    const error = new Error('Request failed');
    makeRequest.mockRejectedValueOnce(error);
    await expect(loginOrRegister(data)).rejects.toThrow(error);
  });
});
