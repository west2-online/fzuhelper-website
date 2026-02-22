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
export function isWechatBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /MicroMessenger/i.test(navigator.userAgent);
}

/** 是否在 QQ 内置浏览器 */
export function isQQBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /QQ\//i.test(navigator.userAgent) || /MQQBrowser/i.test(navigator.userAgent);
}

/** 是否在可能拦截 DeepLink 的国内应用内（微信、QQ 等） */
export function isInAppBrowserBlockingDeepLink(): boolean {
  return isWechatBrowser() || isQQBrowser();
}
