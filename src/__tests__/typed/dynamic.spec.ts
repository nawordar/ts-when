import { typedWhen } from "../../typed/typedWhen";

describe("dynamic typedWhen with a simple return type", () => {
    const getDrinkPrice = (drink: "Pepsi" | "Coke" | "Orangina") =>
        typedWhen<number>(drink)
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

describe("dynamic typedWhen with a union return type", () => {
    const getDrinkPrice = (drink: "Pepsi" | "Coke" | "Orangina") =>
        typedWhen<number | boolean | string>(drink)
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
