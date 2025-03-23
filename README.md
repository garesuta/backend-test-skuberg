# Exhange API for Skuberg test

## Backend Schema

Database schema สำหรับฐานข้อมูล(ทำเป็นรูปแบบ ER) ที่เป็นตัวกลางของการแลกเปลี่ยน Cryptocurrencies ระหว่าง User และ Backend มีรายละเอียดตามรูปด้านล่างนี้

<img src="./picture/schema.png" alt="Backend Schema" width="500">

โดยประกอบไปด้วย **six main entities** tables คือ

**User**, **Wallet**, **Cryptocurrency**, **TradePair**, **Order**, and **Transaction**.

- _User_ จัดเก็บข้อมูลของ user
- _Wallet_ จัดเก็บข้อมูลกระเป๋า มีความสัมพันธ์กับ _User_ และ _Cryptocurrency_ ที่จัดเก็บ (fk)
- _Cryptocurrency_ จัดเก็บข้อมูลทั่วไปของเหรียญ
- _TradePair_ จัดเก็บคู่ trade ในการแลกเปลี่ยนเหรียญ
- _Order_ จัดเก็บรายการคำสั่งซื้อขาย มีความสัมพันธ์กับ _User_ และ _TradePair_ ที่ใช้สำหรับแลกเปลี่ยนหรือซื้อขาย โดยมีสถานะ ('BUY', 'SELL', 'EXCHANGE')
- _Transaction_ จัดเก็บประวัติการซื้อขายและการแลกเปลี่ยนเหรียญ มีความสัมพันธ์กับ _Order_ ที่เกิดขึ้น และ _User_ ทำการซื้อขายแลกเปลี่ยนระหว่างกัน

# API spec

ฟังก์ชันของ api ที่ได้จัดทำ \
Creates a new user with the given details

### Users

_POST_ /users/login > Creates a new user

### Wallet

_POST_ /users/wallet > Creates a new wallet \
_GET_ /users/wallet > Get a wallet by wallet id \
_PUT_ /users/wallet/:id > Update a wallet

### Orders

_POST_ /orders > Create a new order \
_GET_ /orders/{id} > Get a transaction
