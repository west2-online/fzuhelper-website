import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import FriendInvite from '@/pages/FriendInvite';
import { Toaster } from 'sonner';
import BeianLogo from '@/assets/images/beian.png';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/friend/invite" element={<FriendInvite />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster theme="system" richColors position="top-center" />
      </BrowserRouter>
      <footer className="bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground text-sm mb-2">版权所有 © {new Date().getFullYear()} west2-online.</p>
          <div className="text-muted-foreground text-sm flex justify-center">
            <a
              href="https://beian.miit.gov.cn/#/Integrated/index"
              target="_blank"
              className="text-primary hover:underline"
            >
              闽ICP备19020557号-3
            </a>
            <img src={BeianLogo} className="inline-block w-4 h-4 ml-2 mr-1" />
            <div>闽公网安备35018302000171号</div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
