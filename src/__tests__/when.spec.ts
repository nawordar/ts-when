import when from "../when";
import { IsType, StaticCheck } from "./helpers";

describe("`when()` syntax with a simple return-type", () => {
  const getDrinkPrice = (drink: "Pepsi" | "Coke" | "Orangina"): number =>
    when(drink)
      .is("Coke", 1.5)
      .is("Pepsi", 1.8)
      .else(2.0);

  it("should return value if matches an expression", () => {
    expect(getDrinkPrice("Coke")).toEqual(1.5);
    expect(getDrinkPrice("Pepsi")).toEqual(1.8);
  });

  it("should return default value if no match", () => {
    expect(getDrinkPrice("Orangina")).toEqual(2.0);
  });
});

describe("`when()` syntax with a union return-type", () => {
  const getDrinkPrice = (drink: "Pepsi" | "Coke" | "Orangina") =>
    when(drink)
      .is("Coke", 1.5)
      .is("Pepsi", true)
      .else("Free");

  it("should return value if matches an expression", () => {
    expect(getDrinkPrice("Coke")).toEqual(1.5);
    expect(getDrinkPrice("Pepsi")).toEqual(true);
  });

  it("should return default value if no match", () => {
    expect(getDrinkPrice("Orangina")).toEqual("Free");
  });
});

describe("`when()` syntax with a function as `is` return value", () => {
  interface Action { type: string; }

  const apply = (action: Action) =>
    when(action.type)
      .is("INCREMENT", () => 2)
      .is("DECREMENT", () => true)
      .else(() => null);

  it("should return value if matches an expression", () => {
    expect(apply({ type: "INCREMENT" })).toEqual(2);
    expect(apply({ type: "DECREMENT" })).toEqual(true);
  });

  it("should return default value if no match", () => {
    expect(apply({ type: "Hello" })).toBeNull();
    expect(apply({ type: "World" })).toBeNull();
  });
});

describe("`when()` match method", () => {

  it("should return first match", () => {
    const getCaseStyle = (text: string) =>
      when(text)
        .match(/^([A-Z][a-z]*)+$/, "UpperCamelCase")
        .match(/^([a-z]+[A-Z][a-z]*)+$/, "LowerCamelCase")
        .match(/^([a-z]+_[a-z]+)+$/, "SnakeCase")
        .else("Unknown");

    StaticCheck<IsType<string, ReturnType<typeof getCaseStyle>>>();

    expect(getCaseStyle("Hello")).toEqual("UpperCamelCase");
    expect(getCaseStyle("HelloWorld")).toEqual("UpperCamelCase");
    expect(getCaseStyle("helloWorld")).toEqual("LowerCamelCase");
    expect(getCaseStyle("hello_world")).toEqual("SnakeCase");
    expect(getCaseStyle("hello")).toEqual("Unknown");
    expect(getCaseStyle("Hello_World")).toEqual("Unknown");
  });

  it("should permit pattern matching using custom matcher", () => {
    interface SpaceObject { x: number; y: number; z: number; }
    type Cube = SpaceObject & { width: number };
    type Sphere = SpaceObject & { radius: number };

    const SpaceObjectSchema = {
      test: (_: any): _ is SpaceObject =>
        typeof _.x === "number" &&
        typeof _.y === "number" &&
        typeof _.z === "number",
    };

    const CubeSchema = {
      test: (_: any): _ is Cube =>
        typeof _.width === "number" && SpaceObjectSchema.test(_),
    };

    const SphereSchema = {
      test: (_: any): _ is Sphere =>
        typeof _.radius === "number" && SpaceObjectSchema.test(_),
    };

    const getObjectVolume = (object: SpaceObject) =>
      when(object)
        // tslint:disable-next-line: no-shadowed-variable : I don't understand what this is shadowing
        .match(CubeSchema, (cube) => {
          StaticCheck<IsType<Cube, typeof cube>>();
          return cube.width ** 3;
        })
        // tslint:disable-next-line: no-shadowed-variable
        .match(SphereSchema, (sphere) => {
          StaticCheck<IsType<Sphere, typeof sphere>>();
          return Math.PI * 3 / 4 * sphere.radius ** 3;
        })
        .else((_) => {
          StaticCheck<IsType<SpaceObject, typeof _>>();
          return null;
        });

    const cube: Cube = { x: 0, y: 0, z: 0, width: 4 };
    expect(getObjectVolume(cube)).toBe(64);

    const sphere: Sphere = { x: 0, y: 0, z: 0, radius: 4 };
    expect(getObjectVolume(sphere)).toBe(Math.PI * 48);

    const spaceObject: SpaceObject = { x: 0, y: 0, z: 0 };
    expect(getObjectVolume(spaceObject)).toBeNull();
  });
});
