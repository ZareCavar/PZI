# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Profesore,ovdje vam ostavljam .env file pa ću ga kasnije pobrisati,da nebi bilo problema
FIREBASE_API_KEY=AIzaSyBik8onTIoNxygcot5X4uY5OwNY-nLAH2Q
PORT=3001

i firebaseService.json file
{
  "type": "service_account",
  "project_id": "qr-code-app-becc3",
  "private_key_id": "42a072ede8748e83df79513c025201ccc6d56dd3",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC20dJM2mNV64rJ\nGaaT7JfHek9++LWxQwan8cdED1ivX3hSENK57AWOW46HhtQJRR6kk/9ACyHMU6Vu\n4fmafJIIL9UHqusN+MmBKpLMs7eFVu7kSKGIJr6ZrxTg4BTHmHSokeQitse03CR4\nCtI/e/CLgNhoCc7TrW+8nEq2P1bif/aPcdN5bdsZb7HCnu2uEz/KK3hs4mkvD3Y2\nzgygqd+u6+jC4pyXDl9JDDvzSmZkzjpaA00HKqWfK+v95pogFe8xusls1Ma7nozv\n1AhQVGuomJfClDlXynt0DUwA0ARp9Pv8mICsxorrbR74Nao/pj2/gc42jLH/rWHF\nIMn58tHDAgMBAAECggEAQBZhwGs2M2J0rnZ9fJGNy3HG+F27Y755UNpi3ir7Dc9L\n4IjhNifU8siJuFy9a9p9GXiAHDVKzdPsxGgXFd7hWllaNmvmJmm2Sb9g4r2Fcgq9\nh+0mIxJh8oH7sbEb17RMAOPTs4+bhn09k49HkNWjx2ONeTsm8/FyoA2x6x1dGdzk\nn/vyqxd8QgsV8rp1feiTgTsfZWCh151l7NTTSMHIfQlyg2TKRGu0pMwnoid34UZh\nkxeGgtz9xFFz/x9QE3fdd8c0Ghs0cTNDRs0xWSmCTvv3SDAtC0S9wJmIYBm81KK6\nBFLj1jW54IKbhV92neUq59ubh7isLY10ZEk8OHldwQKBgQD5SUSuTEZhBeEo+poB\nLZIrqspzkfPlVH+a8aPwQjLe1kSSCbIWJVFWBBM86n+FBYk9Mg5tRpQp/kdMzlC4\nNGiz4MaFu9QLSA1X/3cBfeYhzgupycJFu2pYYn0urKUfuZux4Grf+ysFrUcggCeD\nl6FZdgRoUkJDJqhbvKSOUanCkwKBgQC7vkq2KG2Heb7lKLx4KiUcTb/RH6levqVe\nIaHUi7GUWT618T8rv7ID2SqC1KczMsLlSygAr8/czayoc1INey1jb2OyMYMTyfOH\nD/W08GVhRVeeTC0QyhvivHAq8xxJGw80DrUUosrJysSgOK9eVYS86x/7ThSXS1+d\n9cqbg1FCEQKBgQCDN8b4PFwbfB3OFUN1dUhoxej1NpF8WKMmqyVRNXdThtPnT0U3\nlQMgVNrPiNwA6C4aUTv411rsU9WyHzOsEqI+dQXqpTjzi0TC2k0JMv0tNCk9gV9K\nl2FeDtG3/NaaQXgsBGYdajd2MIStHeguw2UCEzY0t3/7muCqET1JUMEcEwKBgQCv\nweideWF4Z6AvViCCein9wkellfdwTBfx9JhUq2ZWU+oiWDPkV/RmJ+LlUgEpLAdK\nsz5CzlRRCHbvx+3z0vHd2cTCaBmm5/PE6EsE1dyC4HCzL+ssgZjzfaegfbFoOx3T\nhUU+iVxA50OGHysFrBe06IUrNaCPNq/P5++CAMCMkQKBgQCkZSlIagdtdBzia/uO\n4/ChYt0FCMF06akEtU8c+pwRbAWPrVHJBXR9gK9iCkmx7cvXr13x55wvYZ52CreH\nus2ugb6I7FLIm3PnSe2YiMgDHTAGs9MVUfXl3l3ZtSb+BfoHFvdclSOIZ0OASs+f\nuMi1fFRGdUsuBKR7VPPKNujm6Q==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@qr-code-app-becc3.iam.gserviceaccount.com",
  "client_id": "106639896476133550167",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40qr-code-app-becc3.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


