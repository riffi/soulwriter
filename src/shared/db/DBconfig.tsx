export const DBConfig = {
    name: "writer",
    version: 5,
    objectStoresMeta: [
        {
            store: "characterGroups",
            storeConfig: { keyPath: "id", autoIncrement: true },
            storeSchema: [
                { name: "title", keypath: "title", options: { unique: false } },
            ],
        },
        {
            store: "characters",
            storeConfig: { keyPath: "id", autoIncrement: true },
            storeSchema: [
                { name: "groupId", keypath: "groupId", options: { unique: false } },
                { name: "name", keypath: "name", options: { unique: false } },
                { name: "description", keypath: "description", options: { unique: false } },
                { name: "sex", keypath: "sex", options: { unique: false } },
            ],
        },
        {
            store: "characterAttributeDict",
            storeConfig: { keyPath: "id", autoIncrement: true },
            storeSchema: [
                { name: "title", keypath: "title", options: { unique: false } },
            ],
        },
    ],
};
