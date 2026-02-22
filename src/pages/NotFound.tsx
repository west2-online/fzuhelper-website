import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { WarningCircleIcon, HouseIcon, ArrowLeftIcon } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 flex items-center justify-center px-4">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <Card className="max-w-2xl w-full border-border/50 bg-card/80 backdrop-blur-sm shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
              <WarningCircleIcon size={48} className="text-destructive" weight="duotone" />
            </div>
          </div>
          <CardTitle className="text-4xl md:text-5xl font-bold text-foreground mb-2">404</CardTitle>
          <CardDescription className="text-xl text-muted-foreground">页面未找到</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-muted-foreground leading-relaxed">抱歉，您访问的页面不存在或已被移除。</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              onClick={() => navigate('/')}
            >
              <HouseIcon size={20} className="mr-2" />
              返回首页
            </Button>
            <Button size="lg" variant="outline" className="font-medium" onClick={() => navigate(-1)}>
              <ArrowLeftIcon size={20} className="mr-2" />
              返回上一页
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
