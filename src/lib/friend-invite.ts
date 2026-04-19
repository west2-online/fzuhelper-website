/** 好友邀请 DeepLink 协议 */
export const FRIEND_INVITE_SCHEME = 'fzuhelper';
export const FRIEND_INVITE_HOST = 'friend_invite';

/** 邀请码长度（与 app 一致） */
export const FRIEND_INVITATION_CODE_LEN = 6;

/** 从当前 URL 或给定字符串中解析邀请码（支持 ?code=、纯邀请码、分享文案、DeepLink） */
export function parseInviteCodeFromSearch(search: string): string | null {
  const params = new URLSearchParams(search);
  const fromQuery = params.get('code');
  if (fromQuery) {
    const cleaned = fromQuery
      .replace(/[^a-zA-Z0-9]/g, '')
      .toUpperCase()
      .slice(0, FRIEND_INVITATION_CODE_LEN);
    if (cleaned.length === FRIEND_INVITATION_CODE_LEN) return cleaned;
  }
  return null;
}

/** 从任意文本中尝试提取邀请码（6 位字母数字） */
export function parseInviteCodeFromText(text: string): string | null {
  const match = text.match(/[a-zA-Z0-9]{6}/);
  if (match) {
    const cleaned = match[0].toUpperCase();
    if (cleaned.length === FRIEND_INVITATION_CODE_LEN) return cleaned;
  }
  return null;
}

/** 生成 DeepLink：fzuhelper://friend_invite?code=XXXXXX */
export function buildFriendInviteDeepLink(code: string): string {
  const clean = code
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .slice(0, FRIEND_INVITATION_CODE_LEN);
  return `${FRIEND_INVITE_SCHEME}://${FRIEND_INVITE_HOST}?code=${encodeURIComponent(clean)}`;
}

/** 是否在微信内置浏览器 */
export function isWechat(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /micromessenger\//i.test(navigator.userAgent.toLowerCase());
}

/** 是否在 QQ 内置浏览器 */
export function isQQ(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /qq\//i.test(navigator.userAgent.toLowerCase()) || /mqqbrowser\//i.test(navigator.userAgent.toLowerCase());
}

export function getSystem(): 'Android' | 'iOS' | 'Harmony' | 'PC' {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  const isIOS = /iphone|ipad|ipod/i.test(u.toLowerCase());
  const isHarmony = u.indexOf('Harmony') > -1 || u.indexOf('ArkWeb') > -1;
  if (isAndroid) {
    return 'Android';
  } else if (isIOS) {
    return 'iOS';
  } else if (isHarmony) {
    return 'Harmony';
  } else {
    return 'PC';
  }
}
