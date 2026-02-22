import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import FriendInvite from '@/pages/FriendInvite';
import { Toaster } from 'sonner';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/friend/invite" element={<FriendInvite />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster theme="system" richColors position="top-center" />
    </BrowserRouter>
  );
}

export default App;
