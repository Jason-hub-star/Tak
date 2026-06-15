import fs from "fs";
import path from "path";

const TEMPLATES_DIR = path.join(process.cwd(), "public/templates");
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);

/**
 * slug(= 폴더명) 기준으로 상세 이미지 경로를 순서대로 반환.
 * 파일명 01,02,... 알파벳 정렬 = 노출 순서. (포트폴리오 detailImages와 동일 규약)
 */
export function getTemplateImages(slug: string): string[] {
  const dir = path.join(TEMPLATES_DIR, slug);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter(
      (f) =>
        IMAGE_EXTS.has(path.extname(f).toLowerCase()) &&
        // thumbnail.* 는 카드 썸네일 전용 — 상세 스택에서 제외
        !f.toLowerCase().startsWith("thumbnail")
    )
    .sort()
    .map((f) => `/templates/${slug}/${f}`);
}
