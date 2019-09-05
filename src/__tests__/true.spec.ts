import when from "../when";

describe("'when.true' syntax with a simple return type", () => {
  const getDrinkPrice = (drink: "Pepsi" | "Coke" | "Orangina"): number =>
    when
      .true(() => drink === "Coke", 1.5)
      .true(() => drink === "Pepsi", 1.8)
      .else(2.0);

  it("returns value if assertion is true", () => {
    expect(getDrinkPrice("Coke")).toEqual(1.5);
    expect(getDrinkPrice("Pepsi")).toEqual(1.8);
  });

  it("returns default value if any of assertions is true", () => {
    expect(getDrinkPrice("Orangina")).toEqual(2.0);
  });
});

describe("'when.true' syntax with a union return-type", () => {
  const getDrinkPrice = (drink: "Pepsi" | "Coke" | "Orangina"): number | string | boolean =>
    when
      .true(drink === "Coke", 1.5)
      .true(drink === "Pepsi", true)
      .else("Free");

  it("returns value if matches an expression", () => {
    expect(getDrinkPrice("Coke")).toEqual(1.5);
    expect(getDrinkPrice("Pepsi")).toEqual(true);
  });

  it("returns default value if no match", () => {
    expect(getDrinkPrice("Orangina")).toEqual("Free");
  });
});

describe("'when.true' syntax with a function as `is` return value", () => {
  interface Action { type: string; }

  const apply = (action: Action) =>
    when
      .true(action.type === "INCREMENT", () => 2)
      .true(action.type === "DECREMENT", () => true)
      .else(() => null);

  it("returns value if matches an expression", () => {
    expect(apply({ type: "INCREMENT" })).toEqual(2);
    expect(apply({ type: "DECREMENT" })).toEqual(true);
  });

  it("returns default value if no match", () => {
    expect(apply({ type: "Hello" })).toBeNull();
    expect(apply({ type: "World" })).toBeNull();
  });
});

describe("'when.true' syntax with assertion wrapped in thunk", () => {
  const isBuffer = (obj: { isBuffer: () => boolean }) =>
    when
      .true(obj.isBuffer, 1)
      .else(2);

  it("unwraps the thunk", () => {
    expect(isBuffer({ isBuffer: () => true })).toBe(1);
    expect(isBuffer({ isBuffer: () => false })).toBe(2);
  });
});

describe("'when.true' mixed with when(subject) syntax", () => {

  it("should allow to call method is() after method true()", () => {
    const whenTrue = (subject: any, bool: boolean) =>
      when(subject)
        .true(bool, true);

    expect(whenTrue({}, true)).toHaveProperty("is");
  });

  it("should allow to call method true() after method true()", () => {
    const whenTrue = (subject: any, bool: boolean) =>
      when(subject)
        .true(bool, true);

    expect(whenTrue({}, true)).toHaveProperty("true");
  });

  it("should allow to call method true() after method is()", () => {
    const whenIs = (subject: string) =>
      when(subject)
        .is("funny", 420);

    expect(whenIs("whatever")).toHaveProperty("true");
  });

  it("should allow to call method is() after method is()", () => {
    const whenIs = (subject: string) =>
      when(subject)
        .is("funny", 420);

    expect(whenIs("whatever")).toHaveProperty("is");
  });
});
