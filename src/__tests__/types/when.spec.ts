import { inspectWhen } from "./utils";
import { inspectWithPreamble } from "intspector";

describe("`when.is` with a simple return-type", () => {

    const [getDrinkPrice] = inspectWhen`
        const ${0} = (drink: "Pepsi" | "Coke" | "Orangina") =>
            when(drink)
                .is("Coke", 1.5)
                .is("Pepsi", 1.8)
                .else(2.0);
    `;

    it("infers correct type", () => {
        expect(getDrinkPrice).toEqual("number");
    });
});

describe("`when.is` with a union return-type", () => {

    const [getDrinkPrice] = inspectWhen`
        const ${0} = (drink: "Pepsi" | "Coke" | "Orangina") =>
            when(drink)
                .is("Coke", 1.5)
                .is("Pepsi", true)
                .else("Free");
    `;

    it("infers the correct type", () => {
        expect(getDrinkPrice).toEqual('number | boolean | "Free"');
    });
});

describe("`when.is` with a function as `is` return value", () => {

    const [apply] = inspectWhen`
        interface Action { type: string; }

        const ${0} = (action: Action) =>
            when(action.type)
                .is("INCREMENT", () => 2)
                .is("DECREMENT", () => true)
                .else(() => null);
    `;

    it("infers the correct type", () => {
        expect(apply).toEqual("number | boolean | null");
    });
});

describe("`when.match` method", () => {

    it("infers the correct type, when using RegExp", () => {

        const [getCaseStyle] = inspectWhen`
            const ${0} = (text: string) =>
                when(text)
                    .match(/^([A-Z][a-z]*)+$/, "UpperCamelCase")
                    .match(/^([a-z]+[A-Z][a-z]*)+$/, "LowerCamelCase")
                    .match(/^([a-z]+_[a-z]+)+$/, "SnakeCase")
                    .else("Unknown");
        `;

        expect(getCaseStyle).toEqual("string");
    });

    it("infers the correct type, when using custom matcher", () => {

        const { getObjectVolume } = inspectWithPreamble(`
            import when from "./src/when";

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

            let cubeType, sphereType, defaultType;

            const getObjectVolume = (object: SpaceObject) =>
                when(object)
                    .match(CubeSchema, (cube) => {
                        cubeType = cube;
                        return cube.width ** 3;
                    })
                    .match(SphereSchema, (sphere) => {
                        sphereType = sphere;
                        return Math.PI * 3 / 4 * sphere.radius ** 3;
                    })
                    .else((_) => {
                        defaultType = _;
                        return null;
                    });
        `)({
            getObjectVolume: "ReturnType<typeof getObjectVolume>",
            cubeType: "typeof cubeType",
        });

        expect(getObjectVolume).toEqual("number | null");

        // TODO: Find a way to get local variable type using intspector
        // expect(cubeType).toEqual("CubeSchema");
        // expect(sphereType).toEqual("SphereSchema");
        // expect(defaultType).toEqual("SpaceObject");
    });
});
