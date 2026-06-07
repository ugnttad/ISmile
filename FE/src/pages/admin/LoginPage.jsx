import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Loader2, Lock, Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/authStore';
import { IMAGES } from '../../constants/images';

export default function LoginPage() {
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (authLoading) return null;
  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#035c9c_0%,#0678c9_48%,#eaf7ff_48%,#ffffff_100%)] p-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-[0_32px_90px_rgba(3,92,156,0.26)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative hidden bg-primary-dark p-8 text-white lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(8,184,204,0.38),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0))]" />
          <div className="relative flex h-full flex-col justify-between">
            <div>
              <img src={IMAGES.logoWhite} alt="iSmile" className="h-11" />
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-primary-light">Admin Portal</p>
              <h1 className="mt-3 text-4xl font-black leading-tight">
                Quản lý lịch hẹn rõ ràng, gọn và đẹp.
              </h1>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="text-sm leading-6 text-white/80">
                Theo dõi lịch hẹn, trạng thái và doanh thu trong một không gian làm việc đồng bộ với brand iSmile.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mb-8 text-center lg:text-left">
            <img src={IMAGES.logo} alt="iSmile" className="mx-auto h-12 lg:mx-0" />
            <h2 className="mt-5 text-2xl font-black text-ink">Đăng nhập Admin</h2>
            <p className="mt-1 text-sm text-slate-500">Quản lý lịch hẹn và thống kê phòng khám</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                  placeholder="admin@nhakhoaismile.vn"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 font-black text-white shadow-xl shadow-primary/20 transition-colors hover:bg-primary-dark disabled:opacity-60"
            >
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              Đăng nhập
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400 lg:text-left">
            Demo: admin@nhakhoaismile.vn / Admin@123
          </p>
        </div>
      </div>
    </div>
  );
}
