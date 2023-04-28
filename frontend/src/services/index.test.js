import axios from "axios";
import { getToken } from "../utils";
import { makeRequest } from "./index";

jest.mock("axios");

describe("makeRequest", () => {
  const config = {
    url: "https://example.com",
    method: "get",
    headers: {},
    data: {},
  };
  
  beforeEach(() => {
    jest.resetAllMocks();
  });
  
  it("should make a request with the correct token", async () => {
    getToken.mockReturnValue("abc123");
    axios.request.mockResolvedValueOnce({ data: {} });
    
    await makeRequest(config);
    
    expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
      headers: expect.objectContaining({
        Authorization: "Bearer abc123",
      }),
    }));
  });

  it("should return the response data on success", async () => {
    const responseData = { message: "Success!" };
    axios.request.mockResolvedValueOnce({ data: responseData });

    const result = await makeRequest(config);

    expect(result).toEqual(responseData);
  });

  it("should return the error object on failure", async () => {
    const error = new Error("Network Error");
    axios.request.mockRejectedValueOnce(error);

    const result = await makeRequest(config);

    expect(result).toEqual(error);
  });

  it("should return the Axios error object on failure", async () => {
    const error = { response: { data: { message: "Failed!" } } };
    axios.request.mockRejectedValueOnce(error);

    const result = await makeRequest(config);

    expect(result).toEqual(error);
  });
});
