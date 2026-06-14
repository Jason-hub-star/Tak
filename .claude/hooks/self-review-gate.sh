#!/bin/bash

# Self-review gate: 파일 쓰기/편집 후 간단한 검증
# 목적: 문법 오류, 대명사 혼동, 불완전한 마크다운 감지

FILE="${CLAUDE_EDITED_FILE:-}"
if [ -z "$FILE" ]; then
  exit 0
fi

# 마크다운 파일만 체크
if [[ ! "$FILE" =~ \.(md|yaml)$ ]]; then
  exit 0
fi

# 체크리스트: 기본 마크다운 형식
if grep -q '^\[' "$FILE" 2>/dev/null; then
  # 체크리스트 문법 확인 (간단 버전)
  if ! grep -q '^\- \[' "$FILE"; then
    echo "⚠️  체크리스트 형식 확인: - [ ] 사용"
  fi
fi

# 코드 블록 닫히는지 확인 (간단 버전)
open_backticks=$(grep -o '```' "$FILE" 2>/dev/null | wc -l)
if [ $((open_backticks % 2)) -ne 0 ]; then
  echo "⚠️  코드 블록 미닫힘: \`\`\` 짝 확인"
fi

exit 0
