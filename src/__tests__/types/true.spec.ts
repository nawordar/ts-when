import { inspectWhen } from "./utils";

describe("`when.true` with all branches of the same return type", () => {

    it("correctly infers type based on branches' return type", () => {

        const [getDrinkPrice] = inspectWhen`
            const ${0} = (drink: "Pepsi" | "Coke" | "Orangina") =>
                when
                    .true(() => drink === "Coke", 1.5)
                    .true(() => drink === "Pepsi", 1.8)
                    .else(2.0);
        `;

        expect(getDrinkPrice).toEqual("number");
    });

});

describe("`when.true` with all branches of multiple return types", () => {

    it("correctly infers union type based on branches' return type", () => {

        const [getDrinkPrice] = inspectWhen`
            const ${0} = (drink: "Pepsi" | "Coke" | "Orangina") =>
                when
                    .true(drink === "Coke", 1.5)
                    .true(drink === "Pepsi", true)
                    .else("Free");
        `;

        expect(getDrinkPrice).toEqual('number | boolean | "Free"');
    });

});

describe("`when.true` with function as return value", () => {

    it("correctly infers union type based on branches' return type", () => {

        const [apply] = inspectWhen`
            interface Action { type: string; }

            const ${0} = (action: Action) =>
                when
                    .true(action.type === "INCREMENT", () => 2)
                    .true(action.type === "DECREMENT", () => true)
                    .else(() => null);
        `;

        expect(apply).toEqual("number | boolean | null");
    });

});

describe("`when.true` with assertion wrapped in thunk", () => {

    const [isBufferType] = inspectWhen`
        const ${0} = (obj: { isBuffer: () => boolean }) =>
            when
                .true(obj.isBuffer, 1)
                .else(2);
    `;

    expect(isBufferType).toEqual("number");
});
