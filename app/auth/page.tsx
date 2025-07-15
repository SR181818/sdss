'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Award, Wallet, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useApp, UserRole } from '@/contexts/AppContext';

export default function AuthPage() {
  const [did, setDid] = useState('');
  const [role, setRole] = useState<UserRole>('client');
  const [isConnecting, setIsConnecting] = useState(false);
  const { login, isLoading } = useApp();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(did, role);
      router.push(`/dashboard/${role}`);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleWalletConnect = async () => {
    setIsConnecting(true);
    try {
      // Simulate Firefly wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock DID based on role
      const mockDIDs = {
        client: 'did:iota:client1',
        analyst: 'did:iota:analyst1',
        certifier: 'did:iota:certifier1'
      };
      
      setDid(mockDIDs[role]);
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const roleInfo = {
    client: {
      icon: Shield,
      title: 'Client',
      description: 'Submit security incidents and manage tickets',
      features: ['Create incident tickets', 'Stake funds in escrow', 'Track resolution progress']
    },
    analyst: {
      icon: Users,
      title: 'Security Analyst',
      description: 'Claim and resolve security incidents',
      features: ['Browse available tickets', 'Submit evidence and solutions', 'Earn CLT rewards']
    },
    certifier: {
      icon: Award,
      title: 'Certifier',
      description: 'Validate analyst work and approve payouts',
      features: ['Review analyst submissions', 'Validate evidence', 'Approve/reject resolutions']
    }
  };

  const currentRoleInfo = roleInfo[role];
  const RoleIcon = currentRoleInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Access dSOC Platform</h1>
            <p className="text-muted-foreground">
              Connect your IOTA wallet and select your role to access the platform
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet Connection
              </CardTitle>
              <CardDescription>
                Connect your IOTA Firefly wallet to authenticate with your DID
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="role">Select Your Role</Label>
                  <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="analyst">Security Analyst</SelectItem>
                      <SelectItem value="certifier">Certifier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleWalletConnect}
                  disabled={isConnecting}
                  className="w-full"
                  size="lg"
                >
                  {isConnecting ? 'Connecting...' : 'Connect Firefly Wallet'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RoleIcon className="h-5 w-5" />
                {currentRoleInfo.title}
              </CardTitle>
              <CardDescription>
                {currentRoleInfo.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentRoleInfo.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Badge variant="outline" className="w-2 h-2 p-0 rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manual DID Entry</CardTitle>
              <CardDescription>
                Enter your DID manually if wallet connection is not available
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="did">Decentralized Identifier (DID)</Label>
                  <Input
                    id="did"
                    type="text"
                    placeholder="did:iota:..."
                    value={did}
                    onChange={(e) => setDid(e.target.value)}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading || !did}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? 'Authenticating...' : 'Enter Platform'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}