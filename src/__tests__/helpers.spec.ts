import { isNotNull } from "../helpers";

describe("isNotNull", () => {

  it("should return false if variable is null", () => {
    expect(isNotNull(null)).toBe(false);
  });

  it("should return false if variable is undefined", () => {
    expect(isNotNull(undefined)).toBe(false);
  });

  it("should return true if variable is not null", () => {
    expect(isNotNull("not null")).toBe(true);
  });

  it("should return false if function returns null", () => {
    expect(isNotNull(() => null)).toBe(false);
  });

  it("should return false if function returns undefined", () => {
    expect(isNotNull(() => undefined)).toBe(false);
  });

  it("should return true if function returns not null", () => {
    expect(isNotNull(() => "not null")).toBe(true);
  });
});
