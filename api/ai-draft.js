import { createClient } from '@supabase/supabase-js'

const CATEGORIES = ['안전', '시설물', '환경/미화', '도로', '소음', '주차', '기타']
const GEMINI_MODEL = 'gemini-3.5-flash-lite'

async function getUserFromRequest(req) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return null

  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)
  const { data, error } = await supabase.auth.getUser(token)
  if (error) return null
  return data.user
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: '허용되지 않은 요청입니다.' })
    return
  }

  const user = await getUserFromRequest(req)
  if (!user) {
    res.status(401).json({ error: '로그인이 필요합니다.' })
    return
  }

  const draft = typeof req.body?.draft === 'string' ? req.body.draft.trim() : ''
  if (!draft) {
    res.status(400).json({ error: '내용을 입력해주세요.' })
    return
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('GEMINI_API_KEY가 설정되어 있지 않습니다.')
    res.status(500).json({ error: '서버 설정 오류로 AI 작성을 이용할 수 없어요.' })
    return
  }

  const prompt = `당신은 "우리 동네 목소리함"이라는 동네 불편 제보 서비스의 민원 작성 도우미입니다.
사용자가 짧게 남긴 메모를 바탕으로, 담당 부서가 바로 접수해서 처리할 수 있는 정식 민원 글로 다듬어주세요.

사용자 메모:
"""
${draft.slice(0, 2000)}
"""

다음 형식의 JSON으로만 답하세요:
- title: 무엇이 문제인지 한눈에 알 수 있는 제목 (25자 이내)
- content: 위치, 상황, 불편한 점, 바라는 조치를 담은 정중한 민원 본문 (3~6문장)
- category: 아래 목록 중 가장 알맞은 값 하나 — ${CATEGORIES.join(', ')}

사용자 메모에 없는 사실을 지어내지 말고, 메모에 있는 내용만 정리해서 다듬으세요.`

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: 'OBJECT',
              properties: {
                title: { type: 'STRING' },
                content: { type: 'STRING' },
                category: { type: 'STRING', enum: CATEGORIES },
              },
              required: ['title', 'content', 'category'],
            },
          },
        }),
      }
    )

    if (!geminiRes.ok) {
      const errText = await geminiRes.text()
      console.error('Gemini API 오류', geminiRes.status, errText)
      res.status(502).json({ error: 'AI 초안 생성에 실패했어요.' })
      return
    }

    const data = await geminiRes.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) {
      console.error('Gemini 응답에 텍스트가 없습니다.', JSON.stringify(data))
      res.status(502).json({ error: 'AI 응답을 읽지 못했어요.' })
      return
    }

    const result = JSON.parse(text)
    if (!CATEGORIES.includes(result.category)) {
      result.category = '기타'
    }

    res.status(200).json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'AI 초안 생성 중 오류가 발생했어요.' })
  }
}
