# Gotanda.rb 2026.10 トーク構成案

- 枠: 10 分
- タイトル: 人間のための cop が AI のハーネスになるまで
- テーマ: AI にコードを書かせる時代の RuboCop プラグイン ― AI のハーネスとして lint を作る

## メッセージ

AI に規約を守らせたいなら、プロンプトに書くより cop にするほうが確実。
人間のために作った cop は AI にも効くし、最初から AI のために cop を作るのもアリ。

## 構成

| # | 時間 | パート | 内容 |
|---|---|---|---|
| 1 | 0:00–0:30 | 自己紹介 | |
| 2 | 0:30–1:00 | 導入 | AI 前夜から現在まで、いくつも RuboCop プラグインを作ってきた |
| 3 | 1:00–1:30 | 作ったもの一覧 | 1 スライドで 7 本の名前を箇条書きで見せる |
| 4 | 1:30–4:30 | 代表的な指摘 | 1 gem 1 スライド × 6 枚（各 30 秒）。ひとこと説明 + bad/good。rubocop-herb は省く |
| 5 | 4:30–9:00 | 作って受けた影響 | トークの本体。冒頭で目的・効果を 3 つにまとめる |
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

#### 目的・効果

- AI は新しい記法を知らない、使わない（`_1`、`it`、型）
- コーディングルールを自己検証可能に（instance_variable_access、rspec-structure）
- リファクタリング時のゴミを検知

#### 考察

- 当初は人間と AI のどちらもコードを書くことを想定していた
  - 均質なコードを作る、うっかりミスを減らす
- 実装が AI 任せになったが、良いコードを出力させようとしていた
- 最近は AI のサポートをしやすい cop を作ってみている
  - リファクタリング時のゴミを検出する
  - レビューしやすくするために、context 構造を整える

#### 今後の課題

- AI に丸投げする未来が近づいている
  - Kaigi on Rails 2026 の ANDPAD ブース「鉛筆を置かない場所 調査」で、全工程「丸投げ」に貼られたアイコン
  - スクリーンショット: `images/kaigionrails2026-andpad-pencil-board.png`（出典: https://x.com/nysalor/status/2111091190103966017 ）
- コード品質はどれくらい重要になるのか
  - モダンで、統一された書き方には意味がある?
  - ゴミが少ないコードに意味はある?
  - context 構造の整理に意味はある?
- 不明ではあるが、整理された状態を整え続けている

