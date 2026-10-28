# Gotanda.rb 2026.10 トーク構成案

- 枠: 10 分
- タイトル: 人間のための RuboCop プラグインが AI のハーネスになるまで
- テーマ: AI にコードを書かせる時代の RuboCop プラグイン ― AI のハーネスとして lint を作る

## メッセージ

人間のために作った cop は AI にも効き、AI と伴走する今は AI のハーネスになった。
AI に任せる未来でコード品質がどれくらい重要かは分からないが、いまは整え続けている。

## 構成

| # | 時間 | パート | 内容 |
|---|---|---|---|
| 1 | 0:00–0:30 | 自己紹介 | |
| 2 | 0:30–1:00 | 導入 | AI 前夜から現在まで、いくつも RuboCop プラグインを作ってきた |
| 3 | 1:00–1:30 | 作ったもの一覧 | 1 スライドで 7 本の名前を箇条書きで見せる |
| 4 | 1:30–4:30 | 代表的な指摘 | 1 gem 1 スライド × 6 枚（各 30 秒）。ひとこと説明 + bad/good。rubocop-herb は省く |
| 5 | 4:30–9:00 | 作って受けた影響 | トークの本体。人間向けの 3 つの役割が、AI の進化とともにどう変わったかを 3 段階で話す |
| 6 | 9:00–9:30 | 宣伝 | rubocop-herb と仙台 Ruby 会議のトーク |
| 7 | 9:30–10:00 | まとめ | |

### 2. 導入

- AI 前夜から現在まで、いくつも RuboCop プラグインを作ってきた
  - 2024-09: rubocop-rbs_inline（AI 前夜）
  - 2026: 残りの 6 本

### 3. 作ったもの一覧

- rubocop-rbs_inline
- rubocop-rspec-unused-let
- rubocop-numbered-params
- rubocop-prefer_it_parameter
- rubocop-rspec-structure
- rubocop-instance_variable_access
- rubocop-herb（詳細は 6. 宣伝で）

### 4. 代表的な指摘（1 gem 1 スライド）

#### rubocop-rbs_inline

rbs-inline の型注釈の書き方を揃える（例: 同じ型を二重に書いたら指摘）

```ruby
# bad
# @rbs name: String
#: (String) -> String
def greet(name)
end

# good
# @rbs name: String
# @rbs return: String
def greet(name)
end
```

#### rubocop-rspec-unused-let

使われていない let を見つける

```ruby
RSpec.describe Foo do
  let(:used)   { 1 }
  let(:unused) { 2 } # 誰も参照していない

  it { expect(used).to eq(1) }
end
```

#### rubocop-numbered-params

1 行ブロックは numbered parameter で

```ruby
# bad
users.map { |user| user.name }

# good
users.map { _1.name }
```

#### rubocop-prefer_it_parameter

1 行ブロックは `it` で

```ruby
# bad
users.map { |user| user.name.upcase }

# good
users.map { it.name.upcase }
```

#### rubocop-rspec-structure

context と example を分離する（Jev の試作）

```ruby
# bad
it "when the user is an admin, allows deletion" do
end

# good
context "when the user is an admin" do
  it "allows deletion" do
  end
end
```

#### rubocop-instance_variable_access

インスタンス変数は reader 経由で読む

```ruby
# bad
def full_name
  "#{@first_name} #{@last_name}"
end

# good
attr_reader :first_name, :last_name

def full_name
  "#{first_name} #{last_name}"
end
```

### 5. 作って受けた影響

#### もともとは人間向けだった

- 記法: 新しい記法を広める（`_1`、`it`、型注釈）
- ミス: うっかりミスを見つける（未使用の let 変数）
- 規約: ルールを実行可能にする（context 構造、reader 経由のアクセス）

#### AI の進化とともに役割が変わってきた

| 時代 | AI | RuboCop プラグイン |
|---|---|---|
| AI が未熟な頃 | ミスが多い | 人間向けと同じ役割 |
| AI と伴走する時代 | 精度が上がった | 規約を守らせるハーネスに |
| AI に任せる未来 | 丸投げ | ？ |

#### AI が未熟な頃

- 人間向けの cop と変わらない（指摘先が人間から AI に変わっただけ）
- 記法: 新しい記法を知らない AI に教える
- ミス: 多いミスを機械的に正す
- 規約: ルールを機械的にチェックする

#### AI と伴走する時代

- AI の出力の精度が上がってきた
- 記法: 古い書き方を新しい記法に寄せる
- ミス: リファクタリング時のゴミを拾う
- 規約: コードを均質化する
  - 自己検証できる規約（= ハーネス）
  - プロンプト < RuboCop プラグイン

#### AI に任せる未来（Pencils Down）

- DHH の「It's pencils down, people.」（出典: https://x.com/dhh/status/2102936073642869121 ）
- Kaigi on Rails 2026 の ANDPAD ブース「鉛筆を置かない場所 調査」で、全工程「丸投げ」に貼られたアイコン
  - スクリーンショット: `images/kaigionrails2026-andpad-pencil-board.png`（出典: https://x.com/nysalor/status/2111091190103966017 ）
- 問い
  - コードを読まない時代になるのか？
  - それでも整え続ける意味はあるのか？

#### いまの答え

- 答えは不明だが、整え続けている
  - しばらくは人間もコードを読み続ける（はず）
  - AI も既存のコードを読んで真似る（はず）
  - 整ったコンパクトなコードには価値がある（はず）
  - 新しい記法に意味があるかは自信なし

### 7. まとめ

- 人間のための RuboCop プラグインは AI にも効く
- AI と伴走する今は AI のハーネスになった
- AI に任せる未来でも、いまは整え続ける
