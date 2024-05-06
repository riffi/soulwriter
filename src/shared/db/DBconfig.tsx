export const DBConfig = {
    name: "writer",
    version: 2,
    objectStoresMeta: [
        {
            store: "characters",
            storeConfig: { keyPath: "id", autoIncrement: true },
            storeSchema: [
                { name: "name", keypath: "name", options: { unique: false } },
                { name: "description", keypath: "description", options: { unique: false } },
                { name: "sex", keypath: "sex", options: { unique: false } },
            ],
        },
        {
            store: "characterAttributes",
            storeConfig: { keyPath: "id", autoIncrement: true },
            storeSchema: [
                { name: "title", keypath: "title", options: { unique: false } },
                { name: "value", keypath: "value", options: { unique: false } },
            ],
        },
    ],
};
