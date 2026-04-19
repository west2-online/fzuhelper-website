import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersIcon, CopyIcon, ArrowSquareOutIcon, HouseIcon, WarningCircleIcon } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { parseInviteCodeFromSearch, buildFriendInviteDeepLink, isQQ, getSystem, isWechat } from '@/lib/friend-invite';
import { useCallback, useRef } from 'react';

function copyToClipboard(text: string): boolean {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
  navigator.clipboard.writeText(text).catch(() => {});
  return true;
}

export default function FriendInvite() {
  const [searchParams] = useSearchParams();
  const code = parseInviteCodeFromSearch(searchParams.toString());
  const deeplink = code ? buildFriendInviteDeepLink(code) : '';
  const timerRef = useRef<number | null>(null);

  const handleOpenApp = useCallback(() => {
    if (!code || !deeplink) {
      toast.error('邀请码无效');
      return;
    }
    const openInBrowser = () => {
      toast.info('请点击右上角「…」用浏览器打开', { duration: 4000 });
    };

    // 目前方案：
    // QQ：安卓微下载配置applink，iOS提示在浏览器打开
    // 微信：提示在浏览器打开
    // 浏览器：直接调用DeepLink+超时跳转下载

    const tryJump = () => {
      const system = getSystem();

      if (isQQ()) {
        if (system === 'Android') {
          // https://wikinew.open.qq.com/index.html#/iwiki/4007776125:~:text=%E7%9A%84%E6%8E%A8%E5%B9%BF%E6%95%88%E6%9E%9C%EF%BC%9A-,2.%C2%A0Applink%E8%83%BD%E5%8A%9B,-1%EF%BC%89%E5%BE%AE%E4%B8%8B%E8%BD%BD
          window.location.href = `http://a.app.qq.com/o/simple.jsp?pkgname=com.helper.west2ol.fzuhelper&android_schema=${encodeURIComponent(deeplink)}`;
          return;
        }
        openInBrowser();
        return;
      }
      if (isWechat()) {
        openInBrowser();
        return;
      }
      window.location.href = deeplink;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        // 跳转下载页
        window.location.href = 'https://m.malink.cn/s/iUZr6f';
      }, 2500);

      // 如果跳转成功就不再跳转下载页
      document.addEventListener('visibilitychange', () => {
        clearTimeout(timerRef.current!);
      });
    };

    tryJump();
  }, [code, deeplink]);

  const handleCopyCode = useCallback(() => {
    if (!code) return;
    copyToClipboard(code);
    toast.success('邀请码已复制');
  }, [code]);

  const handleCopyLink = useCallback(() => {
    copyToClipboard(window.location.href);
    toast.success('邀请链接已复制');
  }, []);

  if (!code) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background via-secondary/20 to-accent/10">
        <div className="relative container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh]">
          <Card className="max-w-md w-full border-border/50 bg-card/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <WarningCircleIcon size={32} className="text-muted-foreground" weight="duotone" />
                </div>
              </div>
              <CardTitle className="text-xl md:text-2xl font-bold text-foreground">邀请链接无效</CardTitle>
              <CardDescription className="text-muted-foreground">
                请使用好友分享的完整邀请链接，或确认链接中包含正确的邀请码。
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                <Link to="/">
                  <HouseIcon size={20} className="mr-2" />
                  返回首页
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-br from-background via-secondary/20 to-accent/10">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-accent/5" />
        <div className="relative container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-lg mx-auto">
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-lg overflow-hidden">
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <UsersIcon size={32} className="text-primary md:size-10" weight="duotone" />
                  </div>
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">好友邀请</CardTitle>
                <CardDescription className="text-muted-foreground text-sm md:text-base mt-1">
                  使用邀请码成为福uu好友，共享课表
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-4 pb-8 md:px-6">
                <div className="rounded-xl bg-muted/60 border border-border/50 p-4 text-center">
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">邀请码</p>
                  <p
                    className="text-2xl md:text-3xl font-mono font-bold text-foreground tracking-[0.3em] select-all"
                    style={{ letterSpacing: '0.25em', marginRight: '-0.25em' }}
                  >
                    {code}
                  </p>
                  <Button variant="outline" size="sm" className="mt-3 border-border/50" onClick={handleCopyCode}>
                    <CopyIcon size={16} className="mr-1.5" />
                    复制邀请码
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  请将 App 升级至 7.2.1 及以上版本后使用好友功能
                </p>

                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 text-base"
                  onClick={handleOpenApp}
                >
                  <ArrowSquareOutIcon size={22} className="mr-2" />
                  打开福uu添加好友
                </Button>

                <div className="pt-2 flex flex-wrap gap-2 justify-center">
                  <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={handleCopyLink}>
                    <CopyIcon size={14} className="mr-1" />
                    复制邀请链接
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
                    <Link to="/">
                      <HouseIcon size={14} className="mr-1" />
                      返回首页
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
