const { createHmac } = require("node:crypto");


function is_timestamp_within_limit(time_sent) {
    const threshold = 5 * 60 * 1000; // 5 min = 300,000 millisec
    const current_time = new Date();

    return current_time - time_sent <= threshold;
}


function is_valid_signature(data, secret_key, signature_to_compare) {
    const data_for_seal = Object.values(data).join('');
    const signature = createHmac("sha256", secret_key).update(data_for_seal).digest("hex");

    return signature == signature_to_compare;
}


module.exports = {
    is_timestamp_within_limit,
    is_valid_signature
};