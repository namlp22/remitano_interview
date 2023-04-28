import {
  isUserLoggedIn,
  logOut,
  getUserEmail,
  setUserEmail,
  getYouTubeVideoKey,
  getToken,
  setToken,
  localStorageKey,
} from "./index";

describe("localStorage utilities", () => {
  beforeEach(() => {
    // reset local storage before each test
    localStorage.clear();
  });

  describe("isUserLoggedIn", () => {
    it("returns false if user email is not set", () => {
      expect(isUserLoggedIn()).toBe(false);
    });

    it("returns true if user email is set", () => {
      setUserEmail("test@example.com");
      expect(isUserLoggedIn()).toBe(true);
    });
  });

  describe("getUserEmail", () => {
    it("returns an empty string if user email is not set", () => {
      expect(getUserEmail()).toBe("");
    });

    it("returns the user email if set", () => {
      setUserEmail("test@example.com");
      expect(getUserEmail()).toBe("test@example.com");
    });
  });

  describe("setUserEmail", () => {
    it("sets the user email in local storage", () => {
      setUserEmail("test@example.com");
      expect(localStorage.getItem(localStorageKey.USER_EMAIL)).toBe(
        "test@example.com"
      );
    });
  });

  describe("getToken", () => {
    it("returns null if token is not set", () => {
      expect(getToken()).toBe(null);
    });

    it("returns the token if set", () => {
      setToken("mytoken");
      expect(getToken()).toBe("mytoken");
    });
  });

  describe("setToken", () => {
    it("sets the token in local storage", () => {
      setToken("mytoken");
      expect(localStorage.getItem(localStorageKey.TOKEN)).toBe("mytoken");
    });
  });

  describe("logOut", () => {
    it("removes user email and token from local storage", () => {
      setUserEmail("test@example.com");
      setToken("mytoken");
      logOut();
      expect(localStorage.getItem(localStorageKey.USER_EMAIL)).toBe(null);
      expect(localStorage.getItem(localStorageKey.TOKEN)).toBe(null);
    });
  });

  describe("getYouTubeVideoKey", () => {
    it("returns null for invalid YouTube URLs", () => {
      expect(getYouTubeVideoKey("https://example.com")).toBe(null);
    });

    it("returns the video key for valid YouTube URLs", () => {
      expect(getYouTubeVideoKey("https://www.youtube.com/watch?v=12345")).toBe(
        "12345"
      );
    });
  });
});
