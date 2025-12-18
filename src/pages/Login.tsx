import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types';
import { Brain, Shield, Users, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (role: UserRole) => {
    login(role);
    navigate('/workspace');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-enterprise-navy via-enterprise-navy-light to-primary flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Case-Aware Knowledge Copilot</h1>
            <p className="text-sm text-white/60">Enterprise Edition</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-white/70">
              Select your role to access the knowledge copilot
            </p>
          </div>

          <div className="space-y-4">
            {/* Agent Login */}
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary/20"
              onClick={() => handleLogin('agent')}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">Case Agent</CardTitle>
                    <CardDescription>
                      Access case workspace and knowledge copilot
                    </CardDescription>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            {/* Manager Login */}
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary/20"
              onClick={() => handleLogin('manager')}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-accent" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">Operations Manager</CardTitle>
                    <CardDescription>
                      Full access including analytics dashboard
                    </CardDescription>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-white/50">
              Demo Mode • No credentials required
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-sm text-white/40">
          Powered by AI • Retrieval-Augmented Generation • Explainable AI
        </p>
      </footer>
    </div>
  );
};

export default Login;
