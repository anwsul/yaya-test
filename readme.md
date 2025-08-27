# YaYa Wallet Webhook Example

[YaYa Wallet](https://yayawallet.com/) uses webhooks to notify partner systems whenever a transaction is made to their account. This example demonstrates how to implement a webhook endpoint that **receives incoming messages and verifies their authenticity and validity**.

---

## Overview

Based on the [YaYa Wallet webhook guide](https://docs.yayawallet.com/hc/main/articles/1701265610-webhooks), this implementation:

1. Creates a POST endpoint (`/yaya/webhook`) using **Express.js** to receive incoming webhook notifications.  
2. Checks the **authenticity** of the incoming message.  
3. Verifies the **validity** of the message.

---

## Security Checks

### 1. Authenticity

To ensure the webhook is coming from YaYa Wallet and not another source, the `YAYA-SIGNATURE` header is compared with a signature created by:

1. Concatenating the values of the payload in the order they appear.  
2. Signing the concatenated string with a **secret key** shared only with YaYa Wallet.  
3. Converting the resulting HMAC SHA256 signature to a hex string.  

---

### 2. Replay Protection

To prevent replay attacks:

- A **time window of 5 minutes** is used.  
- Any payload that is **older than 5 minutes** or whose timestamp is modified will fail verification because the signature will no longer match the `YAYA-SIGNATURE` header.  
- This ensures intercepted messages cannot be resent successfully.

---

## Testing

### 1. Utility Functions

- The helper functions used to verify signatures and timestamps are tested with **Jest**.  
- Tests are found at: [/test/utils.test.js](./test/utils.test.js) 


### 2. Webhook Endpoint

- The `/yaya/webhook` endpoint was tested using **Postman**.  
- Sample payload is found in: [/src/data.js](./src/data.js)

- **Note:** The timestamp in the sample payload may be expired when tested. Adjust it to a current value to avoid timestamp errors.  
- Set the `YAYA-SIGNATURE` header by signing the concatenated payload properties with the secret key `"test_key"` and converting the result to a hex string, as described in the YaYa Wallet guide.

---
