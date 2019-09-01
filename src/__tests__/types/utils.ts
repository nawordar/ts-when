import { inspectWithPreamble } from "intspector";

export const importWhen = 'import when from "./src/when";\n';

export const inspectWhen = <T extends number[]>(strings: TemplateStringsArray, ...keys: T): string[] => {

    const preamble = strings.reduce((res, str, idx) =>
        res + (keys[idx] != null
            ? `${str} __${keys[idx]}`
            : str), "",
    );

    const functionNames = keys.reduce((res, key) => {
        res[`__${key}`] = `ReturnType<typeof __${key}>`;
        return res;
    }, {} as Record<string, string>);

    const typeMap = inspectWithPreamble(`${importWhen}${preamble}`)(functionNames);

    return Object.keys(typeMap).map((key) => typeMap[key]);
};
