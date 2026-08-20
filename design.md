# 우리 동네 목소리함 Design System – Complete Documentation

**단체명:** 지구인상점
**서비스명:** 우리 동네 목소리함

## Configuration

### Color Palette

| Category | Hex Value |
|----------|-----------|
| Background | #FAF7EF |
| On Background | #4A4130 |
| Surface | #FFFCF5 |
| Surface Container | #F1ECDD |
| Surface Container High | #EAE2CC |
| Outline | #DDD3BC |
| Outline Variant | #EDE6D5 |
| On Surface | #4A4130 |
| On Surface Variant | #6E6249 |
| Primary | #8FA377 |
| On Primary | #FFFFFF |
| Primary Container | #E4EADA |
| On Primary Container | #34432A |
| Primary Hover/Dark | #71875B |
| Secondary | #C99368 |
| On Secondary | #4A4130 |
| Secondary Container | #F3E4D2 |
| On Secondary Container | #5C4324 |
| Error | #C6473D |
| On Error | #FFFFFF |
| Error Container | #FBE2DE |
| On Error Container | #7A241C |

> On Surface Variant는 최초 확정 값(#7A7057)에서 #6E6249로 한 차례 보정했다. 원래 값은 Surface Container/Surface Container High 배경 위에서 WCAG AA(4.5:1) 기준에 못 미쳐(각각 4.15:1, 3.79:1) 접수 배지·분야 필터 칩의 작은 텍스트가 흐리게 보이는 문제가 있었다. 보정 값은 Surface·Surface Container·Surface Container High 세 배경 모두에서 4.5:1 이상을 만족한다.

### Typography System (font-family: 'Pretendard', -apple-system, 'Malgun Gothic', sans-serif)

| Style | Size | Weight | Line Height | Letter Spacing | 용도 |
|-------|------|--------|-------------|-----------------|------|
| Title | 28px | 700 | 38px | -0.01em | 페이지 제목 |
| Title MD | 20px | 700 | 28px | — | 섹션/카드 제목 |
| Body | 16px | 400 | 26px | — | 본문 |
| Body SM | 14px | 400 | 22px | — | 보조 본문 |
| Meta | 13px | 500 | 18px | 0.01em | 캡션·타임스탬프·라벨 |
| Button | 15px | 600 | 20px | 0.01em | 버튼 텍스트 |

### Rounded Corner Scale

| Size | Value | 용도 |
|------|-------|------|
| sm | 8px | input, chip, 작은 버튼 |
| DEFAULT | 12px | 버튼, 리스트 아이템, 탭 인디케이터 |
| lg | 14px | 게시글 카드 |
| xl | 24px | 모달, 인증 게이트 카드 |
| full | 9999px | 뱃지, 칩, 세그먼트 버튼 |
| icon | 22% | 앱 아이콘 전용 (icons/icon-192.png 기준) |

### Spacing Scale (base: 8px)

| Size | Value |
|------|-------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |

### Shadow Scale

| Token | Value | 용도 |
|-------|-------|------|
| shadow-sm | 0 1px 3px rgba(74,65,48,0.08) | 게시글 카드, 리스트 아이템, 인풋 포커스 |
| shadow-md | 0 6px 16px rgba(143,163,119,0.16) | 인증 게이트 카드 |
| shadow-lg | 0 16px 40px rgba(143,163,119,0.20) | 모달 |

---

## 페이지 골격 (헤더 · 히어로 · 푸터)

헤더·히어로·푸터는 확정 시안(4안: 히어로 = 안1, 본문 = 안3)에 그려진 그대로다. 마이페이지·관리자·로그인 화면에도 같은 헤더·푸터를 재사용하기로 했는데, 이 확장은 아직 화면으로 직접 확인한 결정은 아니고 일관성을 위한 제안이다 — 실제로 만들면서 어색하면 바꿔도 된다. 히어로는 홈 화면에만 나온다.

**헤더**
- Background: Surface
- Border: 하단 1px Outline Variant
- Padding: 12px 20px, 요소 간 gap 10px
- 구성: 아이콘(28×28px, radius 22%) + 단체명(14px/700, On Surface) + "운영" 라벨(11px, On Surface Variant)

**히어로 (홈 화면 전용)**
- Background: linear-gradient(135deg, Primary → Primary Hover)
- Text Color: #FFFFFF (라운드 없음, 화면 전체 폭 색 블록)
- Padding: 40px 20px 44px, 중앙 정렬, 내부 최대 너비 720px
- 제목(H1): clamp(24px,5vw,34px) / 800 / line-height 1.35 / letter-spacing -0.01em
- 부제(P): 14px, rgba(255,255,255,0.88), margin-bottom 22px
- CTA 버튼: 흰 배경 + Primary Hover(#71875B) 색 텍스트, padding 13px 28px, 15px/700, hover 시 opacity 0.92 (Primary Hover를 배경이 아닌 텍스트색으로 그대로 재사용한 것으로, "On Primary Hover"라는 별도 토큰은 없다)
- 화면당 "의견 남기기" 버튼 1개만 배치한다.

**푸터**
- Background: Surface Container
- Border: 상단 1px Outline Variant
- Padding: 24px 20px
- 구성(위→아래): 단체명(13px/700) → 서비스 설명 한 줄(12px) → 링크 목록(12px, gap 14px) → 저작권 표기(12px, margin-top 8px)

---

## Component Specifications

기능별로 묶어서 정리한다. 색은 모두 위 Color Palette를 그대로 참조하며, 새 색은 추가하지 않는다.

### 공통 — 탭 (2탭)

마이페이지([내가 쓴 글]/[내 정보])와 관리자 화면([의견 관리]/[분야 관리])이 공유하는 탭이다.

- Background: Surface
- Border: 하단 1px Outline
- Tab Item: padding 14px 4px, item 간 gap 24px(lg), 15px/600, On Surface Variant
- Tab Item(active): On Surface, 700, 하단 2px Primary 밑줄
- 탭 콘텐츠 상단 여백: 24px(lg)

### 기능 1 — 글 저장하기 (제목 · 내용 · 작성자 · 작성시간)

**입력 필드 (제목)**
- Background: Surface Container
- Border: 1px 투명 → focus 시 1px Primary
- Rounded: sm (8px)
- Padding: 10px 12px
- Typography: Body (16px)
- Label: 13px/600, On Surface Variant, margin-bottom 6px

**입력 필드 (내용, Textarea)**
- 위 입력 필드와 동일 + min-height 160px, line-height 1.6, padding 12px, resize: vertical

**작성자 / 작성시간**
- 별도 입력칸을 두지 않는다. 작성자는 로그인 계정 정보에서 자동으로 채워 읽기 전용으로 보여주고(Meta, 13px), 작성시간은 저장 시점에 시스템이 자동 기록한다(직접 입력 불가).
- 목록 카드에는 날짜만 표시(예: 2026.08.19, Meta 13px)하고, 시:분까지 포함한 전체 작성시간은 저장은 되지만 카드에는 노출하지 않는다.

**폼 액션 버튼 영역**
- 배치: flex, justify-content: flex-end, gap 8px, margin-top 24px(lg)
- 취소: Outline 버튼 / 저장: Primary 버튼

### 기능 2 — 사진 올리기

**사진 업로드 필드**
- Background: Surface Container
- Border: 1px dashed Outline
- Rounded: lg (14px)
- Padding: 24px, 아이콘 + 안내 문구("사진을 선택하거나 끌어다 놓으세요") 중앙 정렬
- 업로드 후: 80×80px 썸네일(Rounded sm 8px) + 우측 상단 원형 × 삭제 버튼
- 이번 화면 기준 게시글당 사진 1장을 전제로 한다.

**게시글 카드 안 사진 자리** (확정 시안 기준)
- 크기: 96×96px, Rounded 10px
- Background: #DDD8CB(placeholder), 아이콘 색 #A79E88
- 사진이 없는 글은 자리표시자를 그대로 유지한다(빈칸으로 두지 않음).

### 기능 3 — 로그인 & 회원가입

**인증 게이트 카드 (/login, /signup)**
- Background: Surface
- Rounded: xl (24px)
- Shadow: shadow-md
- Padding: 40px 32px
- Max-width: 360px, 화면(Background) 정중앙에 배치
- 구성(위→아래): 서비스 아이콘(40px) → 안내 제목(Title MD, 20px/700) → 보조 설명(Body SM, 14px, On Surface Variant) → Google 로그인 버튼 → 로그인/회원가입 전환 링크(Meta, 13px)

**Google 로그인 버튼**
- Google 공식 브랜드 가이드를 그대로 따른다(흰 배경, 회색 테두리, Google 로고, "Google로 계속하기" 문구).
- 우리 팔레트(세이지그린 등)로 재색상하지 않는다 — Google 브랜드 가이드라인을 지키기 위한 예외로 둔다.
- 폭: 카드 폭에 맞춰 100%, 높이 44px

**마이페이지 — [내 정보] 탭**
- List Item을 재사용: 좌측 라벨(Meta, On Surface Variant) + 우측 값(Body, On Surface), justify-content: space-between
- 각 행 하단 1px Outline Variant 구분선

**마이페이지 — [내가 쓴 글] 탭**
- "기능 4"의 게시글 카드 그리드를 그대로 재사용하되, 로그인한 본인 글만 노출한다.

### 기능 4 — 처리상태 & 관리자 화면

**게시글 카드** (확정 시안 기준)
- Background: Surface
- Rounded: lg (14px)
- Padding: 14px, 내부 요소 gap 14px
- Shadow: shadow-sm
- 구성: 사진 96×96px(좌) + 본문(우, gap 6px): 상태 배지 + 분야 칩(가로 나열, gap 6px) → 제목(1줄 말줄임) → 본문 앞부분(2줄 말줄임) → 작성자·날짜(gap 10px)
- 제목: 15.5px/700/line-height 1.4
- 본문 앞부분: 13px/line-height 1.55, On Surface Variant
- 작성자·날짜: 11.5px, On Surface Variant

**게시글 목록 그리드**
| Breakpoint | 폭 | 컬럼 | 좌우 여백 | 컬럼 간격 |
|---|---|---|---|---|
| Desktop | ≥1024px | 3열 | 20px | 18px |
| Tablet | 640–1023px | 2열 | 20px | 16px |
| Mobile | <640px | 1열 | 20px | 16px |

컨테이너 최대 너비는 1200px, 컬럼 수만 브레이크포인트마다 바뀌고 카드의 radius·shadow·padding 값은 그대로 유지한다.

**상태 배지 (읽기 전용, 카드/목록에 표시)**
- 공통: 11.5px/700, radius full, padding 3px 10px
- 접수: Surface Container High 배경, On Surface Variant 텍스트
- 처리중: Secondary Container 배경, On Secondary Container 텍스트
- 완료: Primary Container 배경, On Primary Container 텍스트

**분야 칩 (읽기 전용, 카드에 표시)**
- Background: Surface Container, Border: 1px Outline Variant, Text: On Surface Variant
- Rounded: full, Padding: 3px 10px, 11.5px/600

**상태 필터 (목록 상단, 전체 포함 4개 고정)**
- 배치: 가로 나열, 개수가 고정이므로 줄바꿈 허용(overflow 없음)
- 버튼: border 1px Outline, bg Surface, text On Surface, radius full, 13px/600, padding 8px 15px
- 활성 버튼: bg Primary, border Primary, text On Primary

**분야 필터 (목록 상단, 개수 가변)**
- 배치: 가로 스크롤 한 줄(overflow-x: auto, white-space: nowrap) — 분야가 늘어나도 세로 레이아웃이 깨지지 않는다
- 버튼: border 1px Outline, bg Surface Container, text On Surface Variant, radius full, 13px/600, padding 8px 15px
- 활성 버튼: bg Secondary Container, text On Secondary Container

**관리자 — 상태 변경 버튼 (3버튼, [의견 관리] 탭에서 글마다 노출)**
- 구성: 접수 / 처리중 / 완료 3개 세그먼트 버튼만 둔다(전체 없음)
- 비활성: bg Surface, border 1px Outline, text On Surface Variant
- 활성: 위 상태 배지와 동일한 배색을 그대로 사용해 배지 색과 버튼 색이 항상 일치하게 한다
- Radius: full, Padding: 8px 14px, 13px/700, 버튼 간 gap 6px

**관리자 — 의견 관리 리스트 행**
- Background: Surface, Hover: Surface Container High
- Rounded: DEFAULT (12px), Padding: 8px 16px
- 구성: 제목 + 작성자·날짜(좌측) — 분야 칩(표시용) — 상태 변경 버튼 3개(우측)
- 모바일에서는 상태 변경 버튼 줄을 아래로 줄바꿈한다(가로 스크롤 금지 — 관리 화면은 정확한 클릭이 중요하므로 잘리지 않게 한다)

**관리자 — 분야 관리 칩 (삭제 가능)**
- 형태는 분야 필터 칩과 동일 + 우측에 12px × 삭제 아이콘 추가
- 목록 맨 끝에 "+ 분야 추가" 칩을 둔다: border 1px dashed Outline, bg 투명, text On Surface Variant, 클릭 시 같은 높이의 인라인 텍스트 입력으로 전환

### 공통 버튼

**Primary 버튼**
- Background: Primary / Text: On Primary / Typography: Button / Rounded: DEFAULT(12px) / Padding: 12px 24px
- Hover: Primary Hover/Dark
- 용도: 의견 남기기, 글 저장하기

**Outline 버튼 (보조)**
- Background: Surface / Border: 1px Outline / Text: On Surface / Rounded: DEFAULT(12px)
- 용도: 취소, 뒤로가기

---

## Brand & Style Philosophy

우리 동네 목소리함(운영: 지구인상점)은 "따뜻한 종이 질감과 자연스러운 이끼·흙빛 톤의 아늑하고 정갈한 제로웨이스트 감성"을 지향한다. 화면은 순백이 아니라 살짝 바랜 종이 같은 크림색 배경 위에 놓이고, 색은 세이지그린(이끼)과 황토빛 브라운(흙)이라는 두 자연색으로만 구성한다. 화려한 강조 대신 "정갈함"을 우선하며, 채도 높은 원색은 쓰지 않는다.

## Color Strategy

- **Primary(세이지그린 #8FA377):** 배경 톤, 아이콘, 주요 액션 버튼, 선택 상태 등 화면 전반의 기본 행동 색.
- **Secondary(흙빛 황토 #C99368):** 원색 그대로는 글자 대비가 약해 버튼 배경 등 큰 면에 직접 쓰지 않는다. 항상 Secondary Container(옅은 톤)로 순화해 뱃지·칩·처리중 상태 등 "분류/상태 표시"에만 쓴다.
- **Neutral(종이 톤):** Background(#FAF7EF), Surface(#FFFCF5), Surface Container 등은 모두 살짝 따뜻한 크림/베이지 계열로 통일해 종이 질감을 낸다. 차가운 순백(#FFFFFF)이나 회색 배경은 쓰지 않는다.
- **On Surface(#4A4130):** 본문 텍스트 전용 흙갈색. 순수 검정 대신 이 색을 써서 팔레트 전체의 흙빛 톤과 이어지게 한다.

## Typography Foundation

본문 서체는 **Pretendard**를 사용한다. Title은 Bold(700)로 위계를 명확히 하고, Body는 26px 줄간격으로 한글 가독성을 확보한다. "정갈한" 인상을 위해 장식적 웨이트나 이탤릭은 쓰지 않고 Regular/SemiBold/Bold 세 단계만 사용한다.

## Layout & Spacing Framework

간격은 8px 배수 체계를 엄격히 따른다(xs 4 / sm 8 / md 16 / lg 24 / xl 32 / 2xl 48). 섹션 사이는 xl~2xl, 카드 내부 여백은 md 내외를 사용해 "아늑하지만 정갈한" 여백을 유지한다. 컨테이너는 최대 1200px로 중앙 정렬한다.

## Elevation & Depth System

입체감은 **테두리가 아닌 그림자**로 표현한다. 그림자는 순수 회색이 아니라 흙갈색(rgba(74,65,48,…), 작은 요소)과 이끼그린(rgba(143,163,119,…), 카드 이상)을 낮은 투명도로 섞어 "탁하지 않고 자연스러운" 느낌을 유지한다.

## Shape Language

전체적으로 **둥근(Rounded)** 형태 언어를 쓰되, 과하게 발랄하지 않은 "정갈한" 둥글기로 제한한다. 버튼·리스트아이템·탭 인디케이터는 12px, 게시글 카드는 14px, 모달/인증 게이트 카드는 24px로 값을 고정한다. 히어로는 화면 전체 폭 색 블록이라 라운드를 주지 않는다. 앱 아이콘의 라운드 사각형(약 22%, icons/icon-192.png 기준)은 브랜드 시그니처 형태이므로 앱 아이콘/파비콘 전용으로만 유지하고 일반 UI 컴포넌트에는 그대로 재사용하지 않는다.

---

## 하지 말 것 (Don'ts)

1. **순수 검정(#000000)이나 순백(#FFFFFF) 배경을 쓰지 않는다.** 텍스트는 On Surface(#4A4130), 배경/카드는 정의된 크림·베이지 톤만 쓴다 — 종이 질감을 깨지 않기 위함.
2. **보조색(#C99368)을 원색 그대로 버튼 배경이나 큰 면에 칠하지 않는다.** 글자 대비가 약하므로 항상 Secondary Container(옅은 톤)로 순화해서 쓴다.
3. **모서리 각짐(radius 0)을 쓰지 않는다.** 모든 버튼·카드·인풋은 최소 sm(8px) 이상의 라운드를 가진다.
4. **두꺼운 테두리로 입체감을 표현하지 않는다.** 구분선은 1px hairline(Outline)만 허용하고, 입체는 그림자(Shadow Scale)로만 표현한다.
5. **채도 높은 원색(비비드 레드, 비비드 블루 등)을 추가로 끌어오지 않는다.** 팔레트에 정의된 세이지그린·흙빛·에러색 외의 색은 쓰지 않는다.
6. **본문 줄간격을 1.4배 미만으로 좁히지 않는다.** (예: 16px 본문에 22px 미만 line-height 금지) — 한글 가독성 확보.
7. **PC 3열 · 태블릿 2열 · 모바일 1열 그리드를 임의로 바꾸지 않는다.** 콘텐츠가 많다고 4열 이상으로 늘리지 않는다.
8. **Google 로그인 버튼을 우리 팔레트 색으로 다시 칠하지 않는다.** Google 브랜드 가이드라인을 그대로 따른다.
9. **처리상태는 접수·처리중·완료 3단계만 쓴다.** 화면마다 '검토중', '반려' 같은 이름을 임의로 추가하지 않는다.
