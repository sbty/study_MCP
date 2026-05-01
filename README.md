# Model Context Protocol (MCP) ハンズオン学習計画

このリポジトリは、Anthropicが提唱する **Model Context Protocol (MCP)** の仕組みを理解し、実際にサーバーを構築・連携できるようになるためのハンズオン学習用リポジトリです。

以下の計画表に沿って学習を進め、完了した項目にはチェック (`[x]`) を入れてGitHubで進捗を管理します。

---

## 📅 学習計画表 (Roadmap)

### フェーズ 1: MCPの基礎理解と環境構築
MCPの全体像を把握し、ローカル開発環境を整備します。

- [x] **1.1 MCPの概念とアーキテクチャの理解**
  - [x] MCPの公式ドキュメント（[modelcontextprotocol.io](https://modelcontextprotocol.io/)）を一読する
  - [x] アーキテクチャの基本要素（Host, Client, Server, Protocol, Transport）を理解する
- [x] **1.2 開発環境のセットアップ**
  - [x] Node.js (または Python) の環境構築
  - [x] TypeScriptの設定 (`tsconfig.json` などの準備)
  - [x] 公式のMCP SDK (`@modelcontextprotocol/sdk`) のインストール
- [x] **1.3 最小限のMCPサーバーの作成**
  - [x] エントリポイント (`index.ts` 等) の作成
  - [x] stdioトランスポートを使用したサーバー起動処理の実装
  - [x] MCP Inspector を使った動作確認 (`npx @modelcontextprotocol/inspector`)

### フェーズ 2: 3つの主要機能（Primitives）の実装
MCPのコアとなる3つの機能（リソース、プロンプト、ツール）を順番に実装します。

- [ ] **2.1 Resources (リソース) の実装**
  - [ ] 静的なデータやファイル内容をクライアントに提供する機能の実装
  - [ ] `resources/list` と `resources/read` ハンドラーの実装
  - [ ] Inspectorでのリソース読み込みテスト
- [ ] **2.2 Prompts (プロンプト) の実装**
  - [ ] LLMのコンテキストとして再利用可能なプロンプトテンプレートの実装
  - [ ] `prompts/list` と `prompts/get` ハンドラーの実装
  - [ ] 引数（Arguments）を受け取る動的プロンプトの作成
- [ ] **2.3 Tools (ツール) の実装**
  - [ ] LLMがアクションを実行するためのツールの定義と実装（例: 外部APIからのデータ取得や計算処理）
  - [ ] `tools/list` と `tools/call` ハンドラーの実装
  - [ ] JSON Schemaを用いたツールの入力引数定義

### フェーズ 3: MCPクライアント（Claude Desktop）との連携
作成したサーバーを実際のLLMクライアントに接続してテストします。

- [ ] **3.1 Claude Desktopの設定**
  - [ ] Claude Desktopアプリのインストール
  - [ ] `claude_desktop_config.json` に自作したMCPサーバーを登録
- [ ] **3.2 統合テスト**
  - [ ] Claude Desktopのチャット画面から、実装したツールやリソースを呼び出せるか確認する
  - [ ] エラー時のログ確認方法の習得

### フェーズ 4: 実践的なオリジナルサーバーの開発
学んだ知識を活かして、自分の用途に合わせたMCPサーバーを構築します。

- [ ] **4.1 アイデアの選定と設計**
  - [ ] 連携したい外部APIやデータソースを決める（例: GitHub API連携、SQLiteデータベース連携など）
- [ ] **4.2 オリジナルサーバーの実装**
  - [ ] 選定したアイデアをもとに、必要なResources, Prompts, Toolsを実装する
- [ ] **4.3 デバッグとリファクタリング**
  - [ ] 実用的なエラーハンドリングの追加
  - [ ] コードのモジュール化・リファクタリング

---

## 🛠️ 進捗の管理方法について
1. この `README.md` に記載されているタスクが1つ完了するごとに、対象の `[ ]` を `[x]` に書き換えます。
2. 作業内容をコミット（`git commit`）し、GitHubリポジトリへプッシュ（`git push`）します。
3. GitHubリポジトリのページ上で、チェックボックスの進捗割合（タスクリスト）を確認しながら次のステップへ進みます。
