# MultiRoulette

[githubPage](https://azm86t.github.io/MultiRoulette/)で稼働してます。
複数の選択肢から複数の要素をランダムに抽選するアプリです。
ヘッダー部をクリック・タップすることで設定を変更できます。

メインブランチにプッシュされた内容が自動的にアップロードされます。

## 開発者向け環境の構築
このアプリは Node + Vite + Vue.js で作られています。
Vue JS を用いてこのプロジェクトのメンテナンスを可能にするため以下の作業を実行します。

1. gitのインストール
2. Voltaのインストール
3. プロジェクトのクローン
4. プロジェクトに必要なパッケージのインストール

### 1.gitのインストール・初期設定

Gitが既にインストール済であればスキップしてください。
Gitはプロジェクトのソースコードを管理するツールです。
変更の履歴を管理し過去バージョンの取得やある変更がいつ行われたのか等を管理します。また複数人でソースコードや設定ファイルを変更した際の衝突によるプロジェクトの破損等を防ぎます。

[Git公式Webのダウンロードページ](https://git-scm.com/downloads)に記載された手順でインストールします。

○インストール
- Windows
    - [ダウンロードページ](https://git-scm.com/downloads/win)からインストーラを入手し実行します。表示される手順に従ってインストールを完了させます。
- macOS
    - homebrewを用いてインストールします。
        - `brew install git`
- linux/Unix
    - 各ディストリビューションで使用されるパッケージ管理システムでGitをインストールします。以下にいくつか例を示します。
    - Ubuntu: `apt-get install git`
    - Fedora: `dnf install git`

○初期設定
ユーザ名、メールアドレスを設定します。
変更履歴の変更者の名前として表示されるものです。
以下のコマンドを実行します。
ユーザー名、メールアドレスはそれぞれ自身のものに置き換えてください。
~~~
$ git config --global user.name "あなたのユーザー名"
$ git config --global user.email "mailaddress@example.com"
~~~

### 2.Voltaのインストール

Voltaが既にインストール済であればスキップしてください。
VoltaはjavaScriptのバージョンの管理ツールの１つです。
このプロジェクトはVoltaによってNode.jsやNpmのバージョンを管理し、各開発者の環境差異によるトラブルを防止します。
各開発者はVoltaを用いることで必要なツールを自動的に入手できます。

[Volta公式Webのガイド](https://docs.volta.sh/guide/getting-started)に記載された手順でインストールする。

- Windows
    - [Voltaのリポジトリ](https://github.com/volta-cli/volta/releases)よりインストーラ(.msi)を入手し実行します。表示される手順に従ってインストールを完了させます。

- Mac,Linux/Unix
    - 次のコマンドを実行しインストールします。`curl https://get.volta.sh | bash`

### 3.プロジェクトのクローン

このプロジェクトをローカルPCにダウンロードし編集可能な状態にするため、このプロジェクト一式を配置したい場所で以下のコマンドを実行します。
~~~sh
cd 任意の場所
git clone https://github.com/azm86t/MultiRoulette.git
~~~

### 4.プロジェクトに必要なパッケージのインストール

このプロジェクトに必要なJavaScriptパッケージを入手するため、クローンしたプロジェクトのに移動し必要なパッケージをインストールします。
~~~sh
cd Cloneした場所/MultiRoulette
npm install
~~~

## 開発モードでのアプリ実行
プロジェクトファイルの場所で以下のコマンドを実行し、
コードの変更が即座に反映される状態でアプリを実行します。
~~~sh
cd Cloneした場所/MultiRoulette
npm run dev
~~~

## 本番用のアセンブリをビルド
型チェックと最適化を施してビルドします。
```sh
npm run build
```

## 

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).
