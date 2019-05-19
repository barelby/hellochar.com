const PARAMS_DEFAULT = {
    isRealtime: true,
    cellEnergyMax: 5000,
    tissueInventoryCapacity: 20,
    rootTurnsPerTransfer: 20,
    leafReactionRate: 0.015,
    floorCo2: 0.5,
    leafSugarPerReaction: 1,
    cellDiffusionWater: 0.0,
    cellDiffusionSugar: 0.001,
    soilDiffusionType: "continuous",
    soilDiffusionWater: 0.001,
    waterGravityPerTurn: 0.002,
    soilMaxWater: 20,
    droop: 0.03,
    fountainTurnsPerWater: 11,
    fountainAppearanceRate: 3,
    transportTurnsPerMove: 5,
    sunlightReintroduction: 0.2,
    maxResources: 100,
};

type Params = typeof PARAMS_DEFAULT;

export const params = { ...PARAMS_DEFAULT };

if (location.hash.length > 0) {
    const urlHashParams: object = JSON.parse(decodeURI(location.hash.substr(1)));
    Object.assign(params, urlHashParams);
}

export function updateParamsHash() {
    const nonDefaultParams: Partial<Params> = {};
    const keys = Object.keys(PARAMS_DEFAULT) as Array<keyof Params>;
    for (const key of keys) {
        if (params[key] !== PARAMS_DEFAULT[key]) {
            nonDefaultParams[key] = params[key];
        }
    }
    if (Object.keys(nonDefaultParams).length > 0) {
        location.hash = encodeURI(JSON.stringify(nonDefaultParams));
    }
}
updateParamsHash();
