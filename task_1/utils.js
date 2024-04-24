export function decode(encoded, translations, exclude, default_translation_key) {
    const translation_val = translations[default_translation_key.toString()];

    if (typeof translation_val !== 'string')
        throw new Error(`Translation with key=${default_translation_key} not found.`);

    for (let [key, trans_key] of Object.entries(encoded)) {
        if (exclude.includes(key) || trans_key === null) continue;

        if (typeof trans_key !== 'number') trans_key = parseInt(trans_key);

        let translation = translations[trans_key];

        if (typeof translation !== 'string') translation = translation_val;

        encoded[key] = translation;
    }

    return encoded;
}

export function getUnique(array, object_key = 'groupId') {
    const counter = {};

    array.forEach((obj) => {
        let counter_key = `${obj[object_key]}`;

        if (counter_key === 'undefined') throw new Error(`Key ${object_key} not exists.`);

        let counter_val = counter[counter_key];

        counter[counter_key] = counter_val ? (counter_val += 1) : 1;
    });

    return Object.keys(counter);
}
