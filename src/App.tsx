import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  GridFour, 
  Calendar, 
  Bell, 
  FileText, 
  MapPin, 
  QrCode, 
  Users, 
  Buildings, 
  Compass,
  Download,
  ChatCircle,
  DeviceMobile,
  AndroidLogo,
  AppleLogo,
  BookBookmark
} from "@phosphor-icons/react";
import fuuLogo from "@/assets/images/fuu.png";
import fuu1 from "@/assets/images/fuu1.png";
import fuu2 from "@/assets/images/fuu2.png";
import fuu3 from "@/assets/images/fuu3.jpg";
import fuu4 from "@/assets/images/fuu4.png";
import fuu5 from "@/assets/images/fuu5.png";
import fuu6 from "@/assets/images/fuu6.png";

const features = [
  {
    icon: Calendar,
    title: "课表",
    description: "优雅的课程模块界面，支持各学期切换、课程详情、自定义课程功能。"
  },
  {
    icon: Bell,
    title: "教务",
    description: "实时推送教务通知，同步更新考场信息，可视化学分、成绩、绩点分布。"
  },
  {
    icon: FileText,
    title: "历年卷",
    description: "丰富的考试资料，助力期末考。"
  },
  {
    icon: MapPin,
    title: "空教室",
    description: "一键查询各时段教学楼空教室情况，帮助寻找自习地点。"
  },
  {
    icon: QrCode,
    title: "一码通",
    description: "福大一码通，一码通行全校！支持消费码、认证码、图书馆入馆码。"
  },
  {
    icon: Users,
    title: "嘉锡讲坛",
    description: "一键报名嘉锡讲坛，轻松了解历次讲座情况。"
  },
  {
    icon: Buildings,
    title: "学习中心",
    description: "快速预约学习中心座位，避免频繁卡顿。"
  },
  {
    icon: Compass,
    title: "校园指南",
    description: "快速上手精彩校园生活。"
  },
  {
    icon: BookBookmark,
    title: "飞跃手册",
    description: "学长学姐的转专业、保研、考研、出国经验手册。"
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      <ThemeToggle />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <Badge variant="outline" className="mb-6 text-sm font-medium bg-primary/10 border-primary/20 text-primary">原福大助手APP</Badge>
              
              {/* Logo and Title */}
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <img 
                  src={fuuLogo} 
                  alt="福uu Logo" 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-lg"
                />
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-foreground tracking-wide">福uu</h1>
              </div>
              
              <p className="text-lg md:text-xl font-semibold text-primary mb-4 md:mb-6">
                带来不一样的大学生活
              </p>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl lg:max-w-none mx-auto lg:mx-0 mb-6 md:mb-8 leading-relaxed">福州大学西二在线工作室开发，面向福州大学学生的校园生活APP，助力您的大学生活。</p>
              
              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-6 md:mb-8">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 md:px-8 py-3 text-sm md:text-base"
                  onClick={() => window.open('https://apps.apple.com/cn/app/id866768101', '_blank')}
                >
                  <AppleLogo className="mr-2" size={16} />
                  App Store 下载
                </Button>
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 md:px-8 py-3 text-sm md:text-base"
                  onClick={() => window.open('https://m.malink.cn/s/iUZr6f', '_blank')}
                >
                  <AndroidLogo className="mr-2" size={16} />
                  Android 下载
                </Button>
              </div>

              {/* QQ Group */}
              <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-lg px-4 py-2 text-sm">
                <ChatCircle size={16} className="text-primary" />
                <span className="text-muted-foreground">QQ群:</span>
                <span className="font-mono font-semibold text-foreground select-all">694437914</span>
              </div>
            </div>

            {/* Right Screenshots - Desktop Only */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                {[
                  { img: fuu1, title: "课程表" },
                  { img: fuu2, title: "成绩查询" },
                  { img: fuu3, title: "一码通" }
                ].map((screenshot, index) => (
                  <div key={index} className="group">
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/80 backdrop-blur-sm">
                      <div className="relative aspect-[9/16] overflow-hidden">
                        <img 
                          src={screenshot.img} 
                          alt={screenshot.title}
                          className="w-full h-full object-contain transition-all duration-300"
                        />
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* App Screenshots Section */}
      <div className="container mx-auto px-4 py-20 lg:hidden">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <DeviceMobile size={32} className="text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              应用截图
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            体验福uu的精美界面设计和丰富功能
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {[
            { img: fuu1, title: "课程表", desc: "清晰的课程安排" },
            { img: fuu2, title: "成绩查询", desc: "实时查看成绩" },
            { img: fuu3, title: "一码通", desc: "校园通行必备" },
            { img: fuu4, title: "学习中心", desc: "座位预约服务" },
            { img: fuu5, title: "历年卷", desc: "丰富学习资源" },
            { img: fuu6, title: "空教室", desc: "教室使用情况" }
          ].map((screenshot, index) => (
            <div key={index} className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/80 backdrop-blur-sm">
                <div className="relative aspect-[9/16] overflow-hidden">
                  <img 
                    src={screenshot.img} 
                    alt={screenshot.title}
                    className="w-full h-full object-contain transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-sm mb-1">{screenshot.title}</h3>
                    <p className="text-xs text-white/90">{screenshot.desc}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {/* Additional Screenshots for Desktop */}
      <div className="container mx-auto px-4 py-20 hidden lg:block">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <DeviceMobile size={32} className="text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              功能预览
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {[
            { img: fuu1, title: "课程表", desc: "清晰的课程安排" },
            { img: fuu2, title: "成绩查询", desc: "实时查看成绩" },
            { img: fuu3, title: "一码通", desc: "校园通行必备" },
            { img: fuu4, title: "学习中心", desc: "座位预约服务" },
            { img: fuu5, title: "历年卷", desc: "丰富学习资源" },
            { img: fuu6, title: "空教室", desc: "教室使用情况" }
          ].map((screenshot, index) => (
            <div key={index} className="group">
              <Card className="text-card-foreground flex flex-col rounded-xl border shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/80 backdrop-blur-sm">
                <div className="relative aspect-[9/16] overflow-hidden">
                  <img 
                    src={screenshot.img} 
                    alt={screenshot.title}
                    className="w-full h-full object-contain transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-sm mb-1">{screenshot.title}</h3>
                    <p className="text-xs text-white/90">{screenshot.desc}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GridFour size={32} className="text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              主要功能
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            全方位覆盖大学生活需求，让校园生活更便捷高效
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <IconComponent size={20} className="text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      {/* Footer CTA */}
      <div className="bg-card/50 backdrop-blur-sm border-t border-border">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Download size={32} className="text-primary" />
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              开启智慧校园生活
            </h3>
          </div>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            立即下载福uu，让大学生活更加便捷高效
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8"
              onClick={() => window.open('https://apps.apple.com/cn/app/id866768101', '_blank')}
            >
              <AppleLogo className="mr-2" size={20} />
              立即下载 iOS 版
            </Button>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8"
              onClick={() => window.open('https://m.malink.cn/s/iUZr6f', '_blank')}
            >
              <AndroidLogo className="mr-2" size={20} />
              立即下载安卓版
            </Button>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 福州西二在线网络有限公司 · 福uu助力您的大学生活
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;