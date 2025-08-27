const { createHmac } = require("node:crypto");
const data = require("../src/data");
const { is_timestamp_within_limit, is_valid_signature } = require("../src/utils");


test("is_valid_signature returns true for correct signature", () => {
    const correct_secret_key = "test_secret";
    const data_for_seal = Object.values(data).join('');
    const signature = createHmac("sha256", correct_secret_key).update(data_for_seal).digest("hex");

    expect(is_valid_signature(data, correct_secret_key, signature)).toBe(true);
});


test("is_valid_signature returns false for incorrect signature", () => {
    const correct_secret_key = "test_secret";
    const incorrect_secret_key = "incorrect_secret";
    const data_for_seal = Object.values(data).join('');
    const signature = createHmac("sha256", incorrect_secret_key).update(data_for_seal).digest("hex");

    expect(is_valid_signature(data, correct_secret_key, signature)).toBe(false);
});


test("is_timestamp_within_limit returns true for recent timestamp", () => {
    const now = Date.now();
    expect(is_timestamp_within_limit(now)).toBe(true);
});


test("is_timestamp_within_limit returns false for old timestamp", () => {
    const old_tiem = Date.now() - (10 * 60 * 1000); // 10 minutes ago
    expect(is_timestamp_within_limit(old_tiem)).toBe(false);
});
