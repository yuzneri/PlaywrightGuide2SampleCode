## Playwrightのあるきかた 続編(仮)サンプルコード
このリポジトリは「[Playwrightのあるきかた 続編(仮)](https://neln.net/b/nt02/)」の動作確認用です

### インストール
- Dockerが動作する環境で `setup.sh` を実行
- Playwrightをネイティブ環境で実行する場合は追加で以下を実行してください
  - node 18以上をインストール
  - `npx playwright install --with-deps` を実行

### URL
- アプリ
  - http://localhost
- メール
  - http://localhost:8025

### 動作方法
#### ネイティブ
- `APP_ENV=native npx playwright test`

#### Docker
- `docker compose run -e APP_ENV=docker playwright npx playwright test`
