// The Japanese moras YomiScript's instructions allow, as katakana, for checking and reviewing readings.
const MORAS: Record<string, string> = {
  a: "ア",
  i: "イ",
  ɯ: "ウ",
  e: "エ",
  o: "オ",
  ka: "カ",
  ki: "キ",
  kɯ: "ク",
  ke: "ケ",
  ko: "コ",
  kʲa: "キャ",
  kʲɯ: "キュ",
  kʲo: "キョ",
  ɡa: "ガ",
  ɡi: "ギ",
  ɡɯ: "グ",
  ɡe: "ゲ",
  ɡo: "ゴ",
  ɡʲa: "ギャ",
  ɡʲɯ: "ギュ",
  ɡʲo: "ギョ",
  sa: "サ",
  ɕi: "シ",
  sɯ: "ス",
  se: "セ",
  so: "ソ",
  ɕa: "シャ",
  ɕɯ: "シュ",
  ɕo: "ショ",
  ɕe: "シェ",
  dza: "ザ",
  dʑi: "ジ",
  dzɯ: "ズ",
  dze: "ゼ",
  dzo: "ゾ",
  dʑa: "ジャ",
  dʑɯ: "ジュ",
  dʑo: "ジョ",
  dʑe: "ジェ",
  ta: "タ",
  tɕi: "チ",
  tsɯ: "ツ",
  te: "テ",
  to: "ト",
  tɕa: "チャ",
  tɕɯ: "チュ",
  tɕo: "チョ",
  tɕe: "チェ",
  ti: "ティ",
  tɯ: "トゥ",
  tsa: "ツァ",
  da: "ダ",
  di: "ディ",
  de: "デ",
  do: "ド",
  dʲɯ: "デュ",
  na: "ナ",
  ɲi: "ニ",
  nɯ: "ヌ",
  ne: "ネ",
  no: "ノ",
  ɲa: "ニャ",
  ɲɯ: "ニュ",
  ɲo: "ニョ",
  ha: "ハ",
  çi: "ヒ",
  ɸɯ: "フ",
  he: "ヘ",
  ho: "ホ",
  ça: "ヒャ",
  çɯ: "ヒュ",
  ço: "ヒョ",
  ɸa: "ファ",
  ɸi: "フィ",
  ɸe: "フェ",
  ɸo: "フォ",
  ba: "バ",
  bi: "ビ",
  bɯ: "ブ",
  be: "ベ",
  bo: "ボ",
  bʲa: "ビャ",
  bʲɯ: "ビュ",
  bʲo: "ビョ",
  pa: "パ",
  pi: "ピ",
  pɯ: "プ",
  pe: "ペ",
  po: "ポ",
  pʲa: "ピャ",
  pʲɯ: "ピュ",
  pʲo: "ピョ",
  ma: "マ",
  mi: "ミ",
  mɯ: "ム",
  me: "メ",
  mo: "モ",
  mʲa: "ミャ",
  mʲɯ: "ミュ",
  mʲo: "ミョ",
  ja: "ヤ",
  jɯ: "ユ",
  jo: "ヨ",
  wa: "ワ",
  wi: "ウィ",
  we: "ウェ",
  wo: "ウォ",
  va: "ヴァ",
  vi: "ヴィ",
  vɯ: "ヴ",
  ve: "ヴェ",
  vo: "ヴォ",
  ɾa: "ラ",
  ɾi: "リ",
  ɾɯ: "ル",
  ɾe: "レ",
  ɾo: "ロ",
  ɾʲa: "リャ",
  ɾʲɯ: "リュ",
  ɾʲo: "リョ",
  ː: "ー",
  ʔ: "ッ",
  m: "ン",
  n: "ン",
  ɲ: "ン",
  ŋ: "ン",
  ɴ: "ン",
};
const MORA_KEYS = Object.keys(MORAS).sort((a, b) => b.length - a.length);
const SPACING = /[\s‖]/gu;
// Before a vowel the moraic nasal is written ɴ, so `ni` is a misspelled ɲi rather than ン + イ.
const NASAL_BEFORE_VOWEL = /^[mnɲŋ][aiɯeojw]/u;

// The moraic nasal takes the place of the next consonant (YomiScript's instructions); ɴ elsewhere.
export const moraicNasalBefore = (next: string): string => {
  if (/^[pbm]/u.test(next)) return "m";
  if (/^(dz|[tdnɾ](?![ɕʑ]))/u.test(next)) return "n";
  if (/^(tɕ|dʑ|ɲ)/u.test(next)) return "ɲ";
  if (/^[kɡ]/u.test(next)) return "ŋ";
  return "ɴ";
};

export type KanaReading = { kana: string; unknown: string[] };

const moraAt = (ipa: string, index: number): string | undefined => MORA_KEYS.find((key) => ipa.startsWith(key, index));

// A doubled consonant is the geminate ッ: `kitte`, and `t` before tɕ / ts (`mattɕi`).
const isGeminate = (ipa: string, index: number): boolean => {
  const next = moraAt(ipa, index + 1);
  const consonant = ipa[index] ?? "";
  return next !== undefined && (next.startsWith(consonant) || (consonant === "t" && /^t[ɕs]/u.test(next)));
};

export const kanaOf = (ipa: string): KanaReading => {
  const sounds = ipa.replace(SPACING, "");
  const kana: string[] = [];
  const unknown: string[] = [];
  let index = 0;
  while (index < sounds.length) {
    const mora = moraAt(sounds, index);
    const length = mora?.length ?? 1;
    const isMoraicNasal = mora !== undefined && MORAS[mora] === "ン";
    const expectedNasal = moraicNasalBefore(sounds.slice(index + 1));
    if (NASAL_BEFORE_VOWEL.test(sounds.slice(index)) && mora?.length === 1)
      unknown.push(sounds.slice(index, index + 2));
    else if (isMoraicNasal && mora !== expectedNasal) unknown.push(`${mora}→${expectedNasal}`);
    else if (mora !== undefined) kana.push(MORAS[mora] ?? "");
    else if (isGeminate(sounds, index)) kana.push("ッ");
    else unknown.push(sounds[index] ?? "");
    index += length;
  }
  return { kana: kana.join(""), unknown };
};
