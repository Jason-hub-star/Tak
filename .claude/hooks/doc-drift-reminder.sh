#!/bin/bash

# Doc-drift reminder: 코드/문서 동기화 리마인더
# 목적: route, schema, config 변경 후 PROJECT-STATUS, DECISION-LOG 갱신 확인

FILE="${CLAUDE_EDITED_FILE:-}"
if [ -z "$FILE" ]; then
  exit 0
fi

# 코드 파일만 체크
if [[ ! "$FILE" =~ \.(ts|tsx|js|jsx|yaml|json)$ ]]; then
  exit 0
fi

# route, schema, config 변경 시 힌트
if [[ "$FILE" =~ (app|route|src/lib/(emailjs|config)|next\.config|env\.local\.example) ]]; then
  echo "💡 Tip: 코드 변경 후 docs/status/PROJECT-STATUS.md 또는 DECISION-LOG.md 갱신 확인"
  echo "    change-class-doc-sync 하네스 참고"
fi

exit 0
