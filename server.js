const express = require("express");
const { is_valid_signature, is_timestamp_within_limit } = require("./src/utils");

const port = 3000;
const app = express();
const secret_key = "test_key";

app.use(express.json());


app.post("/yaya/webhook", (req, res) => {
    const payload = req.body;
    const signature = req.headers["yaya-signature"];

    if(!is_valid_signature(payload, secret_key, signature)) {
        return res.status(401).send("Invalid signature");
    }

    if(!is_timestamp_within_limit(payload.timestamp)) {
        return res.status(400).send("Timestamp expired");
    }

    console.log("valid webhook");
    res.sendStatus(200);

    // we'll do database writes here after sending success status
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
